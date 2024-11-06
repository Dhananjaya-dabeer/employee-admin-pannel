import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateNew = () => {
    const fileRef = useRef()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
        image: '',
    })
    const allFields = [
        {title: "Name", inputType: "text", id: "name"},
        {title: "email", inputType: "email", id: "email"},
        {title: "Mobile No", inputType: "number", id:"mobile"},
        {title: "Designation", inputType: "Select", values: ['HR', 'Manager', 'Sales'], id:"designation" },
        {title: "Gender", inputType: "radio", values: ['Male', 'Female'], id:"gender" },
        {title: "Course", inputType: "checkbox", values: ['MCA', 'BCA', 'BSC'], id: "course" },
        {title: "Upload your image", inputType: "file", id:"image"},
    ]


    const handleInputChange = (e) =>{
        const {id, value, type, checked} = e.target

       if(type === "text" || type === "email" || type === "number"){
        setFormData({
            ...formData,
            [id]: value
        })
       }
       else if(type === 'file'){

       }
       else if(type === 'radio' || type === 'checkbox'){
        console.log(checked)
        if(checked){
            setFormData({
                ...formData,
                [id]: value
            })
        }
       }
       else if(type === "select-one"){
        setFormData({
            ...formData,
            [id]: value
        })
       }
    }

   const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("api/employee/createNew", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                credentials: "include"
            })
            const result = await response.json()
            if(result.success == false){
                toast.error(result.message)
                return
            }
            toast.success(result.message)
            navigate("/list")
        } catch (error) {
            toast.error(error.message || "internal  error")
        }
   }

  return (
    <div className='space-y-6 sm:w-[600px]'>
        <h1 className='font-semibold text-2xl'>Creat a new Emplyee</h1>
        <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
        {
            allFields.map((field, idx) => <div key={idx}>
                {
                (field.inputType === 'text' || field.inputType === 'number' || field.inputType === 'email') ?
                 <div className='flex flex-col'>
                    <label htmlFor={field.id}>{field.title}:</label>
                    <input type={field.inputType} onChange={handleInputChange} className='h-9 border rounded-md' value={formData[field.id]} id={field.id}/>
                 </div> : null
                 }
                 {
                    (field.inputType === "Select" ? <div className='flex flex-col'>
                        <label htmlFor={field.id}>{field.title}</label>
                        <select name={field.id} id={field.id} className='h-9 border rounded-md' value={formData[field.id]} onChange={handleInputChange}>
                            <option disabled selected value={""}>Designation</option>
                            {
                                field.values.map((job, idx) => <option value={job} key={idx}>
                                    {job}
                                </option>)
                            }
                        </select>
                    </div>: null)
                 }
                 {
                    (field.inputType === "radio" || field.inputType === 'checkbox' ? <div className='flex flex-col'>
                        <label htmlFor={field.id}>{field.title}</label>
                        <div className='flex space-x-4'>
                        {field.values.map((item,idx) => <div className='flex flex-row items-center' key={idx}>
                            <input name={item} id={field.id} type={field.inputType} className='h-9 border rounded-md' value={item} onChange={handleInputChange} checked={formData[field.id] === item} />
                            <label htmlFor={item}>{item}</label>
                        </div>)}
                        </div>
                    </div>: null)
                 }
                 {
                    (field.inputType === "file" ? <div className='flex flex-col space-y-2'>
                        <label htmlFor={field.id}>{field.title}</label>
                        <input name={field.id} id={field.id} key={idx} type={field.inputType} className='hidden' value={formData[field.id]} onChange={handleInputChange} ref={fileRef}/>
                        <button  className='h-9 border rounded-md w-80 bg-[#FFF8DE]' onClick={() => fileRef.current.click()} type='button'>Upload Image</button>
                    </div>: null)
                 }
            </div>)
        }
        <button className='bg-[#C5D3E8] p-2 rounded-md text-sm' type='submit'>Create</button>
        </form>
        {/* <form className='flex flex-col space-y-5 '>
            <div>
                <label htmlFor="Name" className='flex flex-col'>
                Name
                <input type="text" id='Name' />
                </label>
                <label htmlFor="Email">
                Email
                <input type="text" id='Email' />
                </label>
                <label htmlFor="MobileNo">
                Mobile No
                <input type="number" id='MobileNo' />
                </label>
                <label htmlFor="Designation">
                Designation
                <input type="text" id='Designation' />
                </label>
                <label htmlFor="male">
                Gender
                <input type="radio" id='male' />
                </label>
                <label htmlFor="female">
                <input type="radio" id='femail' />
                </label>
            </div>
            <div className='space-x-5'>
                <label htmlFor="MCA">
                <input type="checkbox" id='MCA' />
                MCA
                </label>
                <label htmlFor="BCA">
                <input type="checkbox" id='BCA' />
                BCA
                </label>
               <label htmlFor="BSC">
               <input type="checkbox" id='BSC' />
                BSC
               </label>
            </div>
            <input type="file" className='hidden' ref={fileRef}/>
            <button className='rounded-md bg-[#f5edd2]' type='button' onClick={() => fileRef.current.click()}>Upload your image</button>
            <button type='submit'>Create New</button>
        </form> */}
    </div>
  )
}

export default CreateNew
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SlClose } from "react-icons/sl";

const Edit = () => {
    const fileRef = useRef()
    const navigate = useNavigate()
    const {id} = useParams()
    const[svg, setSvg] = useState()
    const[svgPreview, setSvgPreview] = useState()
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

    const getIndividualData = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/employee/single/${id}`, {
                method: "GET",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                credentials: "include"
            })
            const result = await response.json()
            
            setFormData(result.data)
        } catch (error) {
            toast.error(error.message|| "Internal error")
            console.log(error)
        }
    }
    
    useEffect(() => {
        getIndividualData()
    },[])

    const handleInputChange = (e) =>{
        const {id, value, type, checked} = e.target

       if(type === "text" || type === "email" || type === "number"){
        setFormData({
            ...formData,
            [id]: value
        })
       }
       else if(type === 'file'){
        setFormData({...formData, image:""})
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setSvg(file);
          setSvgPreview(reader.result);
        };
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
        let imageUrl = formData.image; 
        console.log(imageUrl)
    if (svg && !formData.image) {
      const formDataImage = new FormData();
      formDataImage.append('image', svg);

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
          method: 'POST',
          body: formDataImage,
        });
        const result = await response.json();
        if (result.success) {
          imageUrl = result.data.url; 
        } else {
          throw new Error(result.error.message || 'Image upload failed');
        }
      } catch (error) {
        toast.error(error.message || 'Error uploading image');
        return;
      }
    }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/employee/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "Application/json"
                },
                credentials: "include",
                body: JSON.stringify({...formData, image: imageUrl})
            })
            const result = await response.json()
            if(result.success == false){
                toast.error(result.message)
                return
            }
            toast.success(result.message)
            console.log(formData)
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
                        <input name={field.id} id={field.id} key={idx} type={field.inputType} className='hidden' onChange={handleInputChange} ref={fileRef} accept="image/*" />
                        <button  className='h-9 border rounded-md w-80 bg-[#FFF8DE]' onClick={() => fileRef.current.click()} type='button'>Upload Image</button>
                        {
                        svgPreview && 
                        <div>
                            <div className='w-44 pr-1 flex justify-end'>
                            <SlClose className='text-red-500 cursor-pointer' onClick={() => setSvgPreview("")}/>
                            </div>
                            <img src={svgPreview} alt="preview" className='w-44 h-52'/>
                        </div>
                        }
                        {
                        formData.image && 
                        <div>
                            <div className='w-44 pr-1 flex justify-end'>
                            <SlClose className='text-red-500 cursor-pointer' onClick={() => setFormData({...formData, image:""})}/>
                            </div>
                            <img src={formData.image} alt="preview" className='w-44 h-52'/>
                        </div>
                        }
                    </div>: null)
                 }
            </div>)
        }
        <button className='bg-[#C5D3E8] p-2 rounded-md text-sm' type='submit'>Update</button>
        </form>
       
    </div>
  )
}

export default Edit
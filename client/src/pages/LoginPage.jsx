import React, { useEffect, useState } from 'react'
import { BiHide } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LuEye } from "react-icons/lu";

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    useEffect(() => {
        const currentUser = localStorage.getItem("username")
        if(currentUser) navigate("/")
    },[navigate])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch("/api/auth/login", {
                method: "POST", 
                headers: {
                    'Content-Type' : 'Application/json'
                  },
                body:JSON.stringify(formData),
                credentials: 'include'
            })
            const result = await response.json()

            if(result.success == false){
                toast.warn(result.message)
                return
            }

            localStorage.setItem('username', JSON.stringify(result.username))
            navigate("/")
        } catch (error) {
           toast.error(error.message || "Something went wrong")
        }finally{
            setLoading(false)
        }
    }
        
    return (
        <div className='w-screen h-screen flex justify-center items-center '>
            <form className='border-black border sm:h-96 sm:w-96 flex justify-center items-center flex-col gap-5 rounded-md shadow-md shadow-[#493628]' onSubmit={handleSubmit}>
                <h1 className='text-2xl'>Login</h1>
                <div className='flex items-center justify-center border-2 border-black rounded-sm w-[80%] h-10'>
                <input type="text" placeholder='Username' className='border-none outline-none h-full w-full' id='username' onChange={handleChange} value={formData?.username} />
                </div>
                <div className='flex items-center justify-between border-2 border-black rounded-sm w-[80%] h-10'>
                <input type={isHidden ? "password" :  "text"} placeholder='Password' className='outline-none border-none h-full w-full' onChange={handleChange} value={formData?.password} id='password'/>
                {formData?.password && 
                <div onClick={() => setIsHidden(!isHidden)}>
                    {isHidden ? <BiHide className='text-xl cursor-pointer mx-2'/> : <LuEye className='text-xl cursor-pointer mx-2'/>}
                </div>}
                </div>
                <div className="w-[80%] h-10 mt-10 hover:border-black hover:border transition-colors">
                    <button className='bg-[#C5D3E8] w-full h-full' type='submit'>Login</button>
                </div>
            </form>
        </div>
  )
}

export default LoginPage
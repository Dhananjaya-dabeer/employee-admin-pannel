import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom';
import { admin } from '../pages/HomePage';

const DashboardLayout = () => {
    const navigate = useNavigate()
    const currentRoute = useLocation()

    const handleLogout = async() =>{
        localStorage.clear()
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/logout`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const result = await response.json()
            if(result.success == false){
                toast.error(result.message)
                return
            }
            toast.success(result)
            navigate('/login')

        } catch (error) {
            toast.error(error.message || "Internal Error")
        }
    }
    const links = [
        {dashboard: "Home", href: '/'},
        {dashboard: "Employee List", href: '/list'},
        {dashboard: "Course master", href: '/coursemaster'},
    ]

  return (
    <div className='text-sm sm:font-normal'>
        <div className='sm:p-5 p-2 flex justify-between items-center bg-[#C5D3E8] border-b border  hover:shadow-md'>
            <ul className='flex space-x-5'>
                {
                    links.map((item, idx) => <li className={`hover:text-zinc-800 ${currentRoute.pathname === item.href ? 'text-zinc-900' : 'text-zinc-500'} cursor-pointer transition-colors`} key={idx}><Link to={item.href}>{item.dashboard}</Link></li> )
                }
                
            </ul>
            <div className='space-x-10'>
                <span className='sm:inline-block hidden'>Hey! {admin}</span>
            <span className='hover:text-red-300 text-red-500 cursor-pointer transition-colors' onClick={handleLogout}>Logout</span>
            </div>
        </div>
        <main className='p-2 sm:p-5 w-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default DashboardLayout
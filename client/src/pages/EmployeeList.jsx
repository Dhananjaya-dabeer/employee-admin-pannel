import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeList = () => {
  return (
    <div>
        <Link to={'/create-new'} className='bg-[#C5D3E8] p-2 rounded-md'>Create an Employee</Link>
    </div>
  )
}

export default EmployeeList
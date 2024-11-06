import React from 'react'

export const admin = JSON.parse(localStorage.getItem("username"));

const HomePage = () => {

  return (
    <div className='flex justify-center'>
         <h1>Welcome {admin}!</h1>
    </div>
  )
}

export default HomePage
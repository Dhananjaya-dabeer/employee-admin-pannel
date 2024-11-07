import React from 'react'

export const admin = JSON.parse(localStorage.getItem("username"));

const HomePage = () => {

  return (
    <div className='flex justify-center flex-col items-center w-[95%] h-screen sm:h-[500px]'>
         <h1>Welcome {admin}!</h1>
         {/* <img src="https://i.ibb.co/hWt659b/welcome-png-2.png" alt="image" /> */}
         <img src="https://i.ibb.co/0M94pQ2/welcome-png-images-16.png" alt="image" />
    </div>
  )
}

export default HomePage
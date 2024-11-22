import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditCourseMaster = () => {
    const [course, setCourse] = useState("")

    const {id} = useParams()
    const navigate = useNavigate()

    const getIndividualData = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/course/single/${id}`, {
                method: "GET",
            })
            const result = await response.json()

            console.log(result)
            setCourse(result.data.course)
        } catch (error) {
            toast.error(error.message|| "Internal error")
            console.log(error)
        }
    }
    
    useEffect(() => {
        getIndividualData()
    },[])


    const handleAdd = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/course/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json"
                },
                credentials: "include",
                body: JSON.stringify({course})
            })
            const result = await response.json()
            if(!result.success){
                return toast.error(result.message)
            }
            toast.success(result.message)
            navigate("/coursemaster")
        } catch (error) {
            toast.error(error.message || "Internal Error")
        }
    }

  return (
    <div>
         <div className="flex justify-between items-center w-[70%] mb-4">
        <input
          type="text"
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="h-9 border rounded-md w-[60%]"
          placeholder="Enter course name"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 px-10 rounded-md ml-4"
        >
          update
        </button>
      </div>
    </div>
  )
}

export default EditCourseMaster
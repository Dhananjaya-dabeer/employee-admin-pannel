import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const CourseMaster = () => {
    const[course, setCourse] = useState("")
    const [data, setData] = useState("")
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const handleAdd = async() => {
       try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/course/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({course})
        })
        const result = await response.json()
        if(!result.success){
           return toast.error(result.message)
        }
        toast.success(result.message)
        setCourse("")
        setCount(prev => prev + 1)
       } catch (error) {
            toast.error(error.message || "Internal Error")
       }
    }

    const fetchData = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/course/get`, {
                method: "GET"
            })
            const result = await response.json()
            setData(result.data)

        } catch (error) {
            toast.error(error.message || "Internal Error")
        }

    }
    useEffect(() => {
        fetchData()
    },[count])
   

    const handleDelete = async(id) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/course/delete/${id}`, {
                method: "DELETE"
            })
            const result = await response.json()
            toast.success(result.message)
            setCount(prev => prev + 1)
        } catch (error) {
            toast.error(error.message || "Internal Error")
        }
    }

  return (
    <div className=''>
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
          Add
        </button>
      </div>


      <div className="mt-4">
      {data?.length > 0 && <div className="overflow-x-auto">
            <table className="min-w-[70%] table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('name')}
                  >
                    Course Name
                  </th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((course, idx) => (
                  <tr key={idx} className="bg-gray-100 border-b">
                    <td className="px-4 py-2">{course.course}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => navigate(`/edit-course/${course._id}`)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="bg-red-500 text-white p-2 rounded-md ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
      </div>
    </div>
  )
}

export default CourseMaster
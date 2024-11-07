import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const [data, setData] = useState([]); // Holds the data from the API
  const [filteredData, setFilteredData] = useState([]); // Holds the filtered data for search
  const [emptyData, setEmptyData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchQuery, setSearchQuery] = useState(''); // Holds the search query
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch data
  const getData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/employee/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const result = await response.json();
      if (result.data) {
        setData(result.data);
        setFilteredData(result.data); // Initially, display all data
      } else {
        setEmptyData(result.message);
      }
    } catch (error) {
      toast.error(error.message || "Internal error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredData(data); // If no query, show all data
    } else {
      const filtered = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) 
          // item.email.toLowerCase().includes(query.toLowerCase()) ||
          // item.designation.toLowerCase().includes(query.toLowerCase()) ||
          // item.course.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  // Sort functionality
  const sortTable = (key) => {
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedArray = [...filteredData].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (key === 'createdAt' || key === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedArray);
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/employee/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
          toast.success('Employee deleted successfully');
          getData(); 
        } else {
          toast.error(result.message || 'Failed to delete employee');
        }
      } catch (error) {
        toast.error(error.message || 'Internal error');
      }
    }
  };

  return (
    <div>
      <div className='flex items-center space-x-20'>
        <Link to={'/create-new'} className='bg-[#C5D3E8] p-2 rounded-md'>
          Create an Employee
        </Link>
        <p className='pl-1'>Total count: {filteredData?.length}</p>
        <div className="">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded-md w-full md:w-full"
        />
      </div>
      </div>

      <div className='mt-5'>
        {!emptyData ? (
          <div className="overflow-x-auto">
            <table className='min-w-full table-auto'>
              <thead>
                <tr className="bg-gray-200">
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('name')}
                  >
                    Name
                    {sortConfig.key === 'name' && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('course')}
                  >
                    Course
                    {sortConfig.key === 'course' && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('designation')}
                  >
                    Designation
                    {sortConfig.key === 'designation' && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('email')}
                  >
                    Email
                    {sortConfig.key === 'email' && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('mobile')}
                  >
                    Mobile
                    {sortConfig.key === 'mobile' && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('createdAt')}
                  >
                    Created At
                    {sortConfig.key === 'createdAt' && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="cursor-pointer px-4 py-2 text-left"
                    onClick={() => sortTable('updatedAt')}
                  >
                    Updated At
                    {sortConfig.key === 'updatedAt' && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th className="px-4 py-2 text-center">Image</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr key={idx} className="bg-gray-100 border-b">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.course}</td>
                    <td className="px-4 py-2">{item.designation}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.mobile}</td>
                    <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-2">{formatDate(item.updatedAt)}</td>
                    {/* Image Column with fixed width */}
                    <td className="px-4 py-2 text-center w-24">
                      <a href={item.image} target="_blank">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-full cursor-pointer"
                        />
                      </a>
                    </td>
                    {/* Action Column */}
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => navigate(`/edit-employee/${item._id}`)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white p-2 rounded-md ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full sm:h-[500px] h-full flex justify-center items-center font-medium text-black">
            <p>{emptyData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;

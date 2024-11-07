import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardLayout from './components/DashboardLayout'
import PrivateRoute from './components/PrivateRoute'
import EmployeeList from './pages/EmployeeList'
import CreateNew from './pages/CreateNew'
import Edit from './pages/Edit'
function App() {

  return (
    <div>
     <BrowserRouter>
        <Routes>
         <Route element={<PrivateRoute/>}>
          <Route path='/' element={<DashboardLayout/>}>
            <Route index element= {<HomePage/>} />
            <Route path='list' element= {<EmployeeList/>} />
            <Route path='create-new' element= {<CreateNew/>} />
            <Route path='edit-employee/:id' element={<Edit/>} />
          </Route>
         </Route>
         <Route path='/login' element= {<LoginPage/>} />
        </Routes>
     </BrowserRouter>
     <ToastContainer/>
    </div>
  )
}

export default App

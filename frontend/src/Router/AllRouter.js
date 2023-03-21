import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import { DepartmentPage } from '../Component/Department'
import { EmpoyeePage } from '../Component/Employee'
import { HomePage } from '../Component/Home'
export const AllRouter =()=> {
    const router = createBrowserRouter([
        {
            path:'/',
            element:<HomePage />
        },
        {
            path:'/department',
            element:
            localStorage.getItem('token') && <DepartmentPage />
        },
        {
            path:'/employee',
            element:
            localStorage.getItem('token')&& <EmpoyeePage />
        },
      ])
      return  <RouterProvider router={router} />
      }
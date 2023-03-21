import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import { DepartmentPage } from '../Component/Department'
import { EmpoyeePage } from '../Component/Employee'
import { HomePage } from '../Component/Home'
import { ProtectedDepartmentPage } from './protectedRoute/protected'
export const AllRouter =()=>{
const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePage />
    },
    {
        path:'/department',
        element:<ProtectedDepartmentPage />
    },
    {
        path:'/employee',
        element:<EmpoyeePage />
    },
])
return <RouterProvider router={router}/>
} 
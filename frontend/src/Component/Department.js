import { useState } from "react"
import { NavBar } from "../Navigation Bar/header"
import axios from 'axios'
export const DepartmentPage = ()=>{
    const [department,setDepartment] = useState([]) 
    axios.get('http://localhost:3000/api/department/')
        .then((res)=>{
         setDepartment(res.data)
    })
    return(
        <div className="table-responsive navbarCustom">
            <NavBar />
    <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
            <tr>
                <th>DepartmentId</th>
                <th>DepartmentName</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {department.map(dep =>
                 <tr key={dep._id}>
                <td data-title="ID">{dep.DepartmentId}</td>
                <td data-title="Name">{dep.DepartmentName}</td>
                <td data-title="Action">
                    <a href="/" className="btn btn-sm shadow-lg rounded-pill text-decoration-none">
                        <span><i className="fas fa-pencil-alt" style={{fontSize:" 10px;"}}></i></span>
                    </a>
                    <a  className="btn btn-sm shadow-lg  rounded-pill ms-2 delete" >
                        <span><i className="fa-sharp fa-solid fa-trash" style={{fontSize:" 12px;"}}></i></span>
                    </a>
                </td>
            </tr>
            )}
           
        </tbody>
    </table>
</div>
    )
}
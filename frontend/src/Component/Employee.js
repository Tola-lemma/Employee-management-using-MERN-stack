import axios from "axios"
import { useReducer, useState } from "react"
import { API_URL } from "../API_URL/API_URL"
import { NavBar } from "../Navigation Bar/header"


const reducer =(state,action)=>{
switch (action.type) {
    case 'ADD_EMPLOYEE':
        return {
            ...state,
            EmployeeName: action.payload.EmployeeName,
            Department:action.payload.Department,
            Date_of_Joining:action.payload.Date_of_Joining,
            PhotoFileName:action.payload.PhotoFileName
          };
        case "MODAL_TITLE_ADD_EMPLOYEE":
          return {
            ...state,
            modalTitle: "Add Employee",
            EmployeeId:0
          };
      
        case "MODAL_TITLE_EDIT_EMPLOYEE":
          return {
            ...state,
            modalTitle: "Update Employee",
            EmployeeId:action.payload.EmployeeId,
            EmployeeName:action.payload.EmployeeName,
            Department:action.payload.Department,
            Date_of_Joining:action.payload.Date_of_Joining,
            PhotoFileName:action.payload.PhotoFileName
          };
        default :return  
      }
    };
export const EmpoyeePage = ()=>{
    const [employee,setEmployee] = useState([])
    //fetching employee information
    axios.get(API_URL.EMPLOYEE)
         .then((res)=>{
          setEmployee(res.data);
         })
const [state,dispatch] = useReducer(reducer,{
    modalTitle:'',
    EmployeeId:0,
    EmployeeName:'',
    Department:'',
    Date_of_Joining:'',
    PhotoFileName:'anonymous.png',
    photoPath:API_URL.PROFILEPHOTO
})
const addClick=()=>{
    dispatch({
        type:'MODAL_TITLE_ADD_EMPLOYEE',
        payload:{
            modalTitle:state.modalTitle,
            EmployeeId:state.EmployeeId,
            EmployeeName:"",
            Department:'',
            Date_of_Joining:'',
            PhotoFileName:'anonymous.png'
        }
    })
}
const editClick=(emp)=>{
    dispatch({
        type:'MODAL_TITLE_EDIT_EMPLOYEE',
        payload:{
            modalTitle:state.modalTitle,
            EmployeeId:emp.EmployeeId,
            EmployeeName:emp.EmployeeName,
            Department:emp.Department,
            Date_of_Joining:emp.Date_of_Joining,
            PhotoFileName:emp.PhotoFileName
        }
    })
}
const handleCreate = ()=>{
    axios.post(API_URL.EMPLOYEE,{
        EmployeeName:state.EmployeeName,
        Department:state.Department,
        Date_of_Joining:state.Date_of_Joining,
        PhotoFileName:state.PhotoFileName
    })
    .then((res)=>{
        alert('You are successfully Create Enployee!')
    },
    (err)=>alert('Error While creating Employee'))
  }
const handleUpdate = (id)=>{
 employee.map((emp) =>
     emp.EmployeeId === id &&
     axios
       .put(`${API_URL.EMPLOYEE}${emp._id}`, {
         EmployeeName: state.EmployeeName,
         Department: state.Department,
         Date_of_Joining: state.Date_of_Joining,
         PhotoFileName: state.PhotoFileName,
       })
       .then(
         (res) => {
           alert("You are Succeccfully Update Employee!");
         },
         (err) => alert("Error while Updating the Employee! ,please try again")
       )
 );
}
const handleDelete = (id)=>{
    if(window.confirm('Are you sure you want to delete Employee?')){
    axios.delete(`${API_URL.EMPLOYEE}${id}`)
      .then((res)=>{
        alert('You are Successfully Delete Employee !')
      },
      (err)=>alert('Error While Deleting Employee,try again!'))
    }
}
    return(
    <div className="table-responsive navbarCustom">
     <NavBar />
     <button 
      type="button" 
      className="btn btn-primary m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={()=>addClick()}
      >
        Add Employee
      </button>
            <table className="table table-hover table-sm text-center">
                <thead className="bg-info">
                    <th>EmployeeId</th>
                    <th>EmployeeName</th>
                    <th>Department</th>
                    <th>Date of Joining</th>
                    <th>Actions</th>
                </thead>
                <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td data-title="ID">{emp.EmployeeId}</td>
              <td data-title="Name">{emp.EmployeeName}</td>
              <td data-title="department">{emp.Department}</td>
              <td data-title="date_of_joining">{emp.Date_of_Joining}</td>
              <td data-title="photo">{emp.PhotoFileName}</td>
              <td data-title="Action">
                <button
                 data-bs-toggle="modal"
                 data-bs-target="#exampleModal"
                 onClick={()=>editClick(emp)}
                  className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
                >
                  <span>
                    <i className="fa-sharp fa-solid fa-pen-to-square"
                      style={{ fontSize: "10px" }}></i>
                  </span>
                </button>
                <button className="btn btn-sm shadow-lg  rounded-pill ms-2"
                onClick={()=>handleDelete(emp._id)}
                >
                  <span>
                    <i  className="fa-sharp fa-solid fa-trash"
                      style={{ fontSize: "12px" }}></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        
        <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true" 
         >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h4 className="modal-title">{state.modalTitle}</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
              <span className="input-group-text">EmployeeName:</span>
              <input 
              type="text" 
              className="form-control" 
              value={state.EmployeeName}
              onChange={(e)=>dispatch({
                type:'ADD_EMPLOYEE',
                payload:{
                    EmployeeName:e.target.value,
                }
              })}/>
              </div>
              <div className="input-group mb-3">
              <span className="input-group-text">Deparment:</span>
              <input 
              type="text" 
              className="form-control" 
              value={state.Department}
              onChange={(e)=>dispatch({
                type:'ADD_EMPLOYEE',
                payload:{
                    Department:e.target.value,
                }
              })}/>
              </div>
              <div className="input-group mb-3">
              <span className="input-group-text">Date of Joining:</span>
              <input 
              type="date" 
              className="form-control" 
              value={state.Date_of_Joining}
              onChange={(e)=>dispatch({
                type:'ADD_EMPLOYEE',
                payload:{
                    Date_of_Joining:e.target.value,
                }
              })}/>
              </div>
              <div className="input-group mb-3">
              <span className="input-group-text">Profile Photo:</span>
              <input 
              type="file" 
              className="form-control" 
            //   value={state.PhotoFileName}
              onChange={(e)=>dispatch({
                type:'ADD_EMPLOYEE',
                payload:{
                    PhotoFileName:e.target.value,
                }
              })}
              />
              </div>
                {/* button to update department  */}
              {state.EmployeeId!==0?
            <button type="button" className=" btn btn-primary float-start"
              onClick={()=>handleUpdate(state.EmployeeId)} 
              > Update</button>
                 :null
                }
              {/* button to create new department  */}
              {state.EmployeeId===0?
              <button type="button" className=" btn btn-primary float-start" 
              onClick={handleCreate}
              > Create</button>
                 :null
                }
            </div>
          </div>
        </div>
      </div> 
</div>
    )
}
import { useReducer, useState } from "react";
import { NavBar } from "../Navigation Bar/header";
import axios from "axios";
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DEPARTMENT":
      return {
        ...state,
        DepartmentName: action.payload.DepartmentName,
      };
    case "MODAL_TITLE_ADD_DEPARTMENT":
      return {
        ...state,
        modalTitle: "Add Department",
        DepartmentId:0
      };
  
    case "MODAL_TITLE_EDIT_DEPARTMENT":
      return {
        ...state,
        modalTitle: "Update Department",
        DepartmentId:action.payload.DepartmentId
      };
    default :return  
  }
};
export const DepartmentPage = () => {
  const [department, setDepartment] = useState([]);
  //retrieve data
  axios.get("http://localhost:3000/api/department/").then((res) => {
    setDepartment(res.data);
  });

  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    DepartmentName: "",
    DepartmentId: 0,
  });
 const addClick=()=>{
   dispatch({
    type:'MODAL_TITLE_ADD_DEPARTMENT',
    payload:{
        modalTitle:state.modalTitle,
        DepartmentId:state.DepartmentId,
        DepartmentName:""
    }
   })
  }
  const editClick=(dep)=>{
    dispatch({
     type:'MODAL_TITLE_EDIT_DEPARTMENT',
     payload:{
         modalTitle:state.modalTitle,
         DepartmentId:dep.DepartmentId,
         DepartmentName:dep.DepartmentName
     }
    })
   }
//    add department 
   const handleCreate=()=>{
    const payload = {DepartmentName:state.DepartmentName}
    axios.post('http://localhost:3000/api/department/',payload).then((res)=>{
        alert("The Department is successfully added!")
        console.log(res.data);
    },(err)=>alert("Error while Creating Deparment!"))
   }
//update department

  return (
    <div className="table-responsive navbarCustom">
      <NavBar />
      {/* button to open modal window */}
      <button 
      type="button" 
      className="btn btn-primary m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={()=>addClick()}>
        Add Department
      </button>
      <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
          <tr>
            <th>DepartmentId</th>
            <th>DepartmentName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {department.map((dep) => (
            <tr key={dep._id}>
              <td data-title="ID">{dep.DepartmentId}</td>
              <td data-title="Name">{dep.DepartmentName}</td>
              <td data-title="Action">
                <button
                 data-bs-toggle="modal"
                 data-bs-target="#exampleModal"
                 onClick={()=>editClick(dep)}
                  className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
                >
                  <span>
                    <i className="fa-sharp fa-solid fa-pen-to-square"
                      style={{ fontSize: "10px" }}></i>
                  </span>
                </button>
                <button className="btn btn-sm shadow-lg  rounded-pill ms-2 delete">
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
            <div className="modal-header">
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
              <span className="input-group-text">DepartmentName:</span>
              <input 
              type="text" 
              className="form-control" 
              value={state.DepartmentName}
              onChange={(e)=>dispatch({
                type:'ADD_DEPARTMENT',
                payload:{
                    DepartmentName:e.target.value
                }
              })}/>
              </div>
              {/* button to create new department  */}
              {state.DepartmentId===0?
              <button type="button" className=" btn btn-primary float-start" 
              onClick={handleCreate}> Create</button>
                 :null
                }
                {/* button to update department  */}
              {state.DepartmentId!==0?
              <button type="button" className=" btn btn-primary float-start"> Update</button>
                 :null
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

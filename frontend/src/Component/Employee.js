import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { API_URL } from "../API_URL/API_URL";
import { NavBar } from "../Navigation Bar/header";
 const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        EmployeeName: action.payload.EmployeeName,
        Department: action.payload.Department,
        Date_of_Joining: action.payload.Date_of_Joining,
        PhotoFileName: action.payload.PhotoFileName,
      };
    case "MODAL_TITLE_ADD_EMPLOYEE":
      return {
        ...state,
        modalTitle: "Add Employee",
        EmployeeId: 0,
      };

    case "MODAL_TITLE_EDIT_EMPLOYEE":
      return {
        ...state,
        modalTitle: "Update Employee",
        EmployeeId: action.payload.EmployeeId,
        EmployeeName: action.payload.EmployeeName,
        Department: action.payload.Department,
        Date_of_Joining: action.payload.Date_of_Joining,
        PhotoFileName: action.payload.PhotoFileName,
      };
    default:
      return;
  }
};
export const EmpoyeePage = () => {
  useEffect(() => {
    getPosts();
    getPostDep();
  }, []);
  const [employee, setEmployee] = useState([]);
  const getPosts = () => {
    //fetching employee information
    axios.get(API_URL.EMPLOYEE,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      }
      ).then((res) => {
      setEmployee(res.data);
    });
  };
  const [department, setDepartment] = useState([]);
  const getPostDep = () => {
    axios.get(API_URL.DEPARTMENT,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      }
      ).then((res) => {
      setDepartment(res.data);
    });
  };
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    EmployeeId: 0,
    EmployeeName: "",
    Department: "",
    Date_of_Joining: "",
    PhotoFileName: "",
    photoPath: API_URL.photosPath,
  });
  const addClick = () => {
    dispatch({
      type: "MODAL_TITLE_ADD_EMPLOYEE",
      payload: {
        modalTitle: state.modalTitle,
        EmployeeId: state.EmployeeId,
        EmployeeName:"",
        Department:"",
        Date_of_Joining: "",
        PhotoFileName:"",
      },
    });
  };
  const editClick = (emp) => {
    dispatch({
      type: "MODAL_TITLE_EDIT_EMPLOYEE",
      payload: {
        modalTitle: state.modalTitle,
        EmployeeId: emp.EmployeeId,
        EmployeeName: emp.EmployeeName,
        Department: emp.Department,
        Date_of_Joining: emp.Date_of_Joining,
        PhotoFileName: emp.PhotoFileName,
      },
    });
  };

  //    add employement
  const handleCreate = () => {

    const formData = new FormData();
    formData.append('EmployeeName', state.EmployeeName);
    formData.append('Department', state.Department);
    formData.append('Date_of_Joining', state.Date_of_Joining);
    formData.append('PhotoFileName', state.PhotoFileName);
    axios.post(API_URL.EMPLOYEE, 
        formData,
      {
        headers: {
        'Accept': 'application/json',
       'Content-Type': 'application/json',
       'x-auth-token': localStorage.getItem('token')
        }
      })
      .then((res) => {
        alert("The Employee is successfully added!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(`Error while Creating Employee: ${err.response.data.message}`);
        } else if (err.request) {
          alert("Error sending request. Please try again later.");
        } else {
          alert("Unknown error. Please try again later.");
        }
      });
  };
  const imageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post(API_URL.PROFILEPHOTO, formData)
      .then((res) => {
        // console.log(res);
        dispatch({
          type: "ADD_EMPLOYEE",
          payload: {
            ...state,
            PhotoFileName: res.data.fileName,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error while uploading image");
      });
  };

  const handleUpdate = (id) => {
    employee.map(
      (emp) =>
        emp.EmployeeId === id &&
        (axios.put(`${API_URL.EMPLOYEE}${emp._id}`, {
            EmployeeName: state.EmployeeName,
            Department: state.Department,
            Date_of_Joining: state.Date_of_Joining,
            PhotoFileName: state.PhotoFileName,
          },
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
          )
          .then(
            (res) => {
              alert("You are Succeccfully Update Employee!");
              window.location.reload();
            },
            (err) =>
              alert(`Error while Updating the Employee! ,please try again ${err.response.data.message}`)
          ))
    );
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete Employee?")) {
      axios.delete(`${API_URL.EMPLOYEE}${id}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      }
      ).then(
        (res) => {
          alert("You are Successfully Delete Employee !");
          window.location.reload();
        },
        (err) => alert(`Error While Deleting Employee,try again! ${err.response.data.message}`)
      );
    }
  };

  return (
    <div className="table-responsive navbarCustom">
      <NavBar />
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Employee
      </button>
      <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
          <tr>
            <th>EmployeeId</th>
            <th>EmployeeName</th>
            <th>profile photo</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td data-title="ID">{emp.EmployeeId}</td>
              <td data-title="Employee Name">{emp.EmployeeName}</td>
              <td data-title="Profile photo"><img className="rounded-circle profileImage" src={state.photoPath+emp.PhotoFileName} alt=""/></td>
              <td data-title="Department">{emp.Department}</td>
              <td data-title="DOJ">{emp.Date_of_Joining}</td>
              <td data-title="Action">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(emp)}
                  className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-pen-to-square"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </span>
                </button>
                <button
                  className="btn btn-sm shadow-lg  rounded-pill ms-2"
                  onClick={() => handleDelete(emp._id)}
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-trash"
                      style={{ fontSize: "12px" }}
                    ></i>
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
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* photo  */}
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-50 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">EmployeeName:</span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            EmployeeName: e.target.value,
                          },
                        })
                      }
                    value={state.EmployeeName}/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Deparment:</span>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            Department: e.target.value,
                          },
                        })
                      }
                      value={state.Department}
                    >
                      {department.map((dep) => (
                        <option key={dep._id}>{dep.DepartmentName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Date of Joining:</span>
                    <input
                      type="date"
                      className="form-control"
                      value={state.Date_of_Joining}
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            Date_of_Joining: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="p-2 w-50 bd-highlight">
                  <img
                    width="250px"
                    height="250px"
                    alt=""
                    src={`${state.photoPath}${state.PhotoFileName}`}
                  />
                  <input className="m-2" type="file" onChange={imageUpload}/>
                </div>
              </div>
              {/* button to update department  */}
              {state.EmployeeId !== 0 ? (
                <button
                  type="button"
                  className=" btn btn-primary float-start"
                  onClick={() => handleUpdate(state.EmployeeId)}
                >
                  {" "}
                  Update
                </button>
              ) : null}
              {/* button to create new department  */}
              {state.EmployeeId === 0 ? (
                <button
                  type="button"
                  className=" btn btn-primary float-start"
                  onClick={handleCreate}
                >
                  {" "}
                  Create
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

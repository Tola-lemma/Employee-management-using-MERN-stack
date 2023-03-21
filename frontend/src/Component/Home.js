import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../API_URL/API_URL";


const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        email:action.payload.email,
        password:action.payload.password
      };
    case "REGISTER":
      return {
        ...state,
        modalTitle: "Register",
        userID:0
      };
    case "LOGIN":
      return {
        ...state,
        modalTitle: "Login",
        userID:""
      };
    default:
      return state;
  }
};
export const HomePage = () => {
  
const navigate=useNavigate()
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    email:"",
    password: "",
    userID:0,
    token: "",
  });
  const registerClick = () => {
    dispatch({
      type: "REGISTER",
      payload: {
        ...state,
      },
    });
  };
  const loginClick = () => {
    dispatch({
      type: "LOGIN",
      payload: {
        ...state,
      },
    });
  };
  const handleLogin =()=>{
   try{
    axios.post(API_URL.LOGIN,
      {
        email:state.email,
        password:state.password
      })
      .then((result)=>{
 //  console.log(response.data.token);
     localStorage.setItem('token',result.data.token);
      })   
  navigate('/department')
   } 
   catch(err){
    alert(err.message);
   }
  }
  return (
    <div className="homepage">
      <h1 style={{color:"white"}}>Home Page</h1>
      <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h3 className="modal-title">{state.modalTitle}</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                 <span className="input-group-text">Email</span>
                  <input
                    type="email"
                    className="form-control"
                    value={state.email}
                    onChange={(e)=>dispatch({
                      type:'INPUT',
                      payload:{
                       ...state,
                       email:e.target.value
                      }
               })}
                   />
              </div>
            <div className="input-group mb-3">
               <span className="input-group-text">Password</span> 
                  <input
                    type="password"
                    className="form-control"
                    value={state.password}
                    onChange={(e)=>dispatch({
                           type:'INPUT',
                           payload:{
                            ...state,
                            password:e.target.value
                           }
                    })}
                  />
            </div>
            </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
               {state.userID===0?
               <button 
                     type="button" 
                     className="btn btn-primary" 
                    //  onClick={handleRegister}
                     >
                  {state.modalTitle}
                </button>
                :null} 
                 {state.userID!==0?
               <button 
                     type="button" 
                     className="btn btn-primary" 
                     onClick={handleLogin}
                     >
                  {state.modalTitle}
                </button>
                :null} 
              </div>
          </div>
        </div>
      </div>
    <div className="viewformargin">
      <button
        type="button"
        className="btn btn-primary m-2 float-center"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => registerClick()}
      >
        Register
      </button>
      <button
        type="button"
        className="btn btn-primary m-2 float-center"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => loginClick()}
      >
        Login
      </button>
    </div>
    </div>
  );
};

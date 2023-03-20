import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        modalTitle: "Register",
      };
    case "LOGIN":
      return {
        ...state,
        modalTitle: "Login",
      };
    default:
      return state;
  }
};
export const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
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
  return (
    <div className="homepage">
      <h1>Home Page</h1>
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
            <form>
            <div className="modal-body">
              <div className="input-group mb-3">
                 <span className="input-group-text">Email address</span>
                  <input
                    type="email"
                    className="form-control"
                   />
              </div>
            <div className="input-group mb-3">
               <span className="input-group-text">Password</span> 
                  <input
                    type="password"
                    className="form-control"
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
                <button type="submit" className="btn btn-primary">
                  {state.modalTitle}
                </button>
              </div>
            </form>
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

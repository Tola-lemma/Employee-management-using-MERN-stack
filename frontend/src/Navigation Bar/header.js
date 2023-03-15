import { Link } from "react-router-dom"
import  '.././App.css'
export const NavBar = () => {
  
return (
    <div className="navbarCustom">
        <h1 style={{textAlign:"center"}}>Employee Management System</h1>
       <nav className="navbar  navbar-expand-sm navbar-dark bg-light text-uppercase ">
        <div className="container-fluid " >
            <ul className="navbar-nav ms-5 mt-2">
              <li className="nav-item">
                <Link className="btn btn-light btn-outline-primary" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-light btn-outline-primary" to="/department">Department</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-light btn-outline-primary" to="/employee">Employee</Link>
               </li>
            </ul>
          </div>
      </nav>
    </div>
)
}
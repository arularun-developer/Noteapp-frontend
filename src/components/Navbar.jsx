import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate =useNavigate()
    const handleLinkClick = () => {
     
        localStorage.removeItem('token');
        navigate('/')
      };
    return (
       
        <nav class="navbar navbar-expand-lg   " style={{'background-color':'black'}}>
            <div class="container-fluid ">
                <Link className="navbar-brand  brandtext text-warning" to="/">Notes App</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link brandtext1  text-white p-2 " to="/view">View</Link>
                        </li>
                        <li className="nav-item">

                            <Link className="nav-link brandtext1  text-white" aria-current="page" to="/create">Create</Link>
                        </li>

                        <li className="nav-item">

                            <button className="nav-link brandtext1 text-white " aria-current="page" onClick={handleLinkClick} >logout</button>
                        </li>



                    </ul>
                </div>


            </div>
        </nav>
    )
}

export default Navbar
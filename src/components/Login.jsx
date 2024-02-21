import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate =useNavigate();
    const [data, setData] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false);



    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
      }
      const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true);

        try {
          const url = 'https://noteapp-3su3.onrender.com/login'
          const response = await axios.post(url, data) // Use a different variable name here
    
          localStorage.setItem('token', response.data.token)
          toast.success("Login Successful");
          setTimeout(() => {
            // Perform navigation
            navigate("/view");
          }, 1500);
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            toast.error("Invalid Login Credentials")
          }
        }
      }

    return (
        <div className='hero'>
            <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0 ">
                <div className="content row gx-0">

                    <div className="col-md-7 ">
                        <div className="text-center p-5 border border-3  border-gradient rounded-4 bordercolor bg-gradient">
                            <h2 className="fw-bolder p-2 text-white  text">Login Now</h2>
                            <label htmlFor='email' className='text-white float-start pt-2'>Email</label>
                            <form >
                                <input
                                    type="email"
                                    className="form-control mt-4"
                                    placeholder="Enter Email"
                                    name="email"
                                    required
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                <div className="position-relative">
                                    <label htmlFor='password' className='text-white float-start pt-2'>Password</label>

                                    <input
                                        id="password-input"
                                        type="password"
                                        className="form-control mt-4"
                                        placeholder="Enter Password"
                                        name="password"
                                        required
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                   onClick={handleSubmit}
                                    type="submit"
                                    className=" text-center mt-3 w-50 btncolor"
                                >
                                   {isLoading ? (
                                                    <span className='spinner-border text-black mx-2'></span>
                                                ) : (
                                                    "Login"
                                                )}

                                </button>
                                <ToastContainer />


                                <div className="mt-4">
                                    <Link to="/forgotPassword" className='text-decoration-none text-black px-2'>
                                        Forgot Password
                                    </Link>
                                    |
                                    <Link to="/" className='text-decoration-none text-black px-2'>
                                        Go Back
                                    </Link>
                                    |
                                    <Link
                                        data-bs-toggle='modal'
                                        data-bs-target='#exampleModal'
                                        className='text-decoration-none text-black px-2'>
                                        Demo  Credentials
                                    </Link>
                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel ">Demo Credentials</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-dark">
                                                    Email-id:arularunoffical1110@gmail.com
                                                    <br />
                                                    password:123456
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
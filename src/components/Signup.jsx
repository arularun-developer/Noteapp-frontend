import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const url = "https://noteapp-3su3.onrender.com/register";
      const { data: res } = await axios.post(url, data);

      toast.success("Registeration Successful");

      setTimeout(() => {
        // Perform navigation
        navigate("/login");
      }, 5000);

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error("User already Exists");
      }
    }
  };
  return (
    <div className='hero1'>

      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0 ">
        <div className="content row gx-0">
          <div className="col-md-5">
          </div>
          <div className="col-md-7">
            <div className="text-center p-5 border border-3 rounded-4 border-warning bordercolor">
              <h2 className=" fw-bolder text pb-2">Create New Account</h2>

              <form >
                <label htmlFor='firstname' className='text-white float-start pt-2'>Firstname</label>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter First Name"
                  name="firstname"
                  required
                  onChange={handleChange}
                  value={data.firstname}


                />
                <label htmlFor='lastname' className='text-white float-start pt-2'>Lastname</label>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter Last Name"
                  name="lastname"
                  required
                  onChange={handleChange}
                  value={data.lastname}



                />
                <label htmlFor='email' className='text-white float-start pt-2 f-2'>Email</label>
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Enter Email"
                  name="email"
                  required
                  onChange={handleChange}
                  value={data.email}


                />
                <label htmlFor='password' className='text-white float-start pt-2'>Password</label>
                <div className="position-relative">
                  <input

                    type="password"
                    className="form-control mt-3"
                    placeholder="Enter Password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={data.password}


                  />

                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btncolor text-center mt-3 w-50"
                >
                {isLoading ? (
                                                    <span className='spinner-border text-black mx-2'></span>
                                                ) : (
                                                    "Register"
                                                )}
                </button>
                <ToastContainer />

                <div className='my-3'>
                  <Link to="/" className='text-decoration-none text-primary '>
                    Go Back
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Signup
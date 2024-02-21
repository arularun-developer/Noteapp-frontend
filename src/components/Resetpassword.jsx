import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Resetpassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const url = `https://noteapp-3su3.onrender.com/reset/:token`;
      const { data } = await axios.post(url, { password });
      toast.success("Password Reset Sucsessful");
      navigate('/login');
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // toast.error("Invalid Entry");
        console.log("Invalid entry");
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
              <h2 className=" fw-bolder text pb-2">Update Password</h2>

              <form >

                <label htmlFor='password' className='text-white float-start pt-2 f-2'>Password</label>
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Enter Password"
                  name="password"
                  required
                  value={password} onChange={(e) => setPassword(e.target.value)}

                />

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btncolor text-center mt-3 w-50"
                >
                  {isLoading ? (
                    <span className='spinner-border text-black mx-2'></span>
                  ) : (
                    "Update Password"
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

export default Resetpassword
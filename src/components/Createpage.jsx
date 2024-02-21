import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Createpage() {
    const [data, setData] = useState({
        title: "",
        date: "",
        document: "",
    });
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);



    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'x-auth-token': `${token}`,
        }
    };


    useEffect(() => {
        return () => {
            // Clear the timeout when the component is unmounted
            if (countdown) {
                clearTimeout(countdown);
            }
        };
    }, [countdown]);

    // Use useEffect to update the countdown on the dashboard
    useEffect(() => {
        if (countdown > 0) {
            // Update the countdown every second
            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1000);
            }, 1000);

            // Clear the countdown interval when the component is unmounted
            return () => clearInterval(countdownInterval);
        }
    }, [countdown]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const url = "https://noteapp-3su3.onrender.com/note/add";
            const response = await axios.post(url, data, config);
            localStorage.setItem('createdNote', JSON.stringify(response.data));

            const reminderTimeout = setTimeout(() => {
            
                toast.info("reminding 1 mintue");
                localStorage.removeItem('createdNote');

                setCountdown(0);
            }, 1 * 60 * 1000); // 1 minute in milliseconds

            setCountdown(reminderTimeout);

            toast.success("Create Notes Successfully");

            navigate("/view");





        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
            }
        }
    };

    return (
        <div className='container'>
            <Navbar />
            <br /><br /><br />
            <div className=" d-flex align-items-center justify-content-center  py-md-0 ">
                <div className="col-md-7">
                    <div className="text-center p-5 border border-3 rounded-4 border-white">
                        <h2 className=" fw-bolder text pb-2 text-white" >Create</h2>
                        <form >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text text-white fs-4 float-start" >
                                    Title
                                </label>
                                <input type="text" className="form-control" placeholder="Title"
                                    required
                                    name='title'
                                    value={data.title}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label text text-white fs-4 float-start"
                                >
                                    Date
                                </label>
                                <input type="date" className="form-control" placeholder="Date"
                                    required
                                    name='date'
                                    value={data.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="document" className="form-label text text-white fs-4  float-start">
                                    Notes
                                </label>
                                <textarea type="text" className="form-control h-25 "
                                    name="document"
                                    value={data.document}
                                    onChange={handleChange}
                                    placeholder="Notes"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="btncolor  text-center mt-3 w-50"
                            >
                                {isLoading ? (
                                    <span className='spinner-border text-black mx-2'></span>
                                ) : (
                                    "Add Content"
                                )}
                            </button>

                            <ToastContainer />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Createpage
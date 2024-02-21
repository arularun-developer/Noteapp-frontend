import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Editpage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: '',
        date: "",
        document: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'x-auth-token': token,
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://noteapp-3su3.onrender.com/note/edit/${id}`, config);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // 
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleDocumentUpdate = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            const saveDocoument = await axios.put(`https://noteapp-3su3.onrender.com/note/edit/${id}`, data, config);
            // You might want to use a toast library here to show a success message.
            console.log('Document Saved!', saveDocoument.data);
            toast.success("Document Updated Successfully");
            navigate('/view')
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='container' >
            <Navbar />
            <br /><br /><br />
            <div className="container  d-flex align-items-center justify-content-center  py-md-0    ">
                <div className="col-md-7">
                    <div className="text-center p-5 border border-3 rounded-4 border-white">
                        <h2 className=" fw-bolder text pb-2 text-white" >Update</h2>
                        <form >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-white text fs-4 float-start" >
                                    Title
                                </label>
                                <input type="text" className="form-control" placeholder="Title" required
                                    name='title' value={data.title} onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label text-white text fs-4  float-start" >
                                    Date
                                </label>
                                <input type="date" className="form-control" placeholder="Date" required
                                    name='date' value={data.date} onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="notes" className="form-label text-white text fs-4 float-start">
                                    Notes
                                </label>
                                <textarea type="text" className="form-control h-25 " placeholder="Notes" required
                                    name='document' value={data.document} onChange={handleChange}
                                />
                            </div>

                            <button
                                onClick={handleDocumentUpdate}
                                type="submit"
                                className="btncolor text-center mt-3 w-50"
                            >
                                {isLoading ? (
                                    <span className='spinner-border text-black mx-2'></span>
                                ) : (
                                    "Update"
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

export default Editpage
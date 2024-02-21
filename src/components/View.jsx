import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPlusCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";


function View() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);



  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const [read, setRead] = useState([]);

  useEffect(() => {
    axios
      .get('https://noteapp-3su3.onrender.com/note/all', config)
      .then((response) => {
        setRead(response.data);
        setLoading(false);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);

      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://noteapp-3su3.onrender.com/note/delete/${id}`, config)
      .then(() => {
        toast.error('Data will be deleted');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting notes:', error);
      });


  };
  const navigateToCreate = () => {
    navigate('/Create');
  };
  return (
    <div className='container'>
      <Navbar />

      <div style={{ marginTop: "5rem" }} className=" p-3 mb-5 rounded-3 h-100vh bg-black">
        <div className="row">

          <div>
            <BsPlusCircleFill className='float-end fs-1 text-warning ps-2' onClick={navigateToCreate}></BsPlusCircleFill>
          </div>

          {loading ? (
            // Display loading spinner or placeholder while data is being fetched
            <div className="text-center">
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden ">Loading...</span>
            </div>
          </div>
          ) : (
            // Render cards when data is available
            read.map((element) => (
              <div className="col-sm-4 mb-3 mb-sm-0" key={element._id}>
                <div className="card my-2">
                  <div className="card-body py-2 ">
                    <h5 className="card-title float-end badge rounded-pill text-bg-primary text-white p-2 ">{element.title}</h5>
                    <p className="card-text text-white fw-bolder p-3">{element.document}</p>
                    <div>
                     
                      <Link className='fs-4 text-danger px-2 float-end' onClick={() => handleDelete(element._id)}>
                        <BsFillTrashFill />
                      </Link>
                      <Link className='fs-4 text-success float-end' to={`/edit/${element._id}`}>
                        <AiFillEdit />
                      </Link>
                      <ToastContainer />
                      <p className="card-subtitle text-white pt-2 ">
                        {element.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>


  )
}

export default View
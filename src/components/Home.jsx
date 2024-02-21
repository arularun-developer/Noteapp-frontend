import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <section className="hero">
      <div className="content">
        <h1 className='text headline'>Welcome to Notes App</h1>
        <p>
        Every Moment is Fresh Beginning
        </p>
  
        <div style={{ display: 'flex', justifyContent: 'center', }}>
      <Link to='/login' >
        <button  className='btn btn-light' >Login</button>
      </Link>

      <Link to='/register'>
        <button  className='btn btn-light mx-2'>Signup</button>
      </Link>
    </div>


      </div>
    </section>
  )
}

export default Home
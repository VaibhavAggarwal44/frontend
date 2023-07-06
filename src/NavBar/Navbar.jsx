import React from 'react'
import {useNavigate} from "react-router-dom"



function Navbar() {

    const navigate= useNavigate();

    const redirectHome=()=>{
        navigate('/')
    }

    const redirectLogin=()=>{
        sessionStorage.clear()
        navigate('/login')
    }

    const redirectUserArticles=()=>{

    }

  return (
    // <div class="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-dark px-3 mb-2 justify-content-end">
        <a className="navbar-brand text-white " onClick={redirectHome}>Home</a>
        <a className="navbar-brand text-white " onClick={redirectLogin}>Logout</a>
        {/* <div className='justify-content-end'> */}
        <a className="navbar-brand text-white " onClick={redirectUserArticles}>{sessionStorage.getItem('username')}</a>
        {/* </div> */}
        
    </nav>
    // </div>
  )
}

export default Navbar
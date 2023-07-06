import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './NavBar/Navbar'
import {useNavigate} from "react-router-dom"

function ArticleBody(props) {
    let articleId=sessionStorage.getItem('articleId')

    const [article,setArticle]=useState({})

    const navigate=useNavigate()

    useEffect(() => {
      let username=sessionStorage.getItem('username')
      // console.log(username)
      if(username==='' || username===null){
        navigate('/login')
      }
  
   }, []);

    

  return (
    <>
        <div>
          <Navbar/>
          {<h1>yo boy</h1>}
        </div> 

    </>
  )
}

export default ArticleBody
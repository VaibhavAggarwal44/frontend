import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './NavBar/Navbar'
import {useNavigate} from "react-router-dom"
import './App.css'

function ArticleBody() {
    
    const [article,setArticle]=useState({})

    const navigate=useNavigate()

    useEffect(() => {
      let username=sessionStorage.getItem('username')
      // console.log(username)
      if(username==='' || username===null){
        navigate('/login')
      }else{
        func2()
      }
  
   }, []);

  //  useEffect(()=>{
  //   func()
  //  },[])

  //  const func=()=>{
  //     func2()
  //  }

  //  useEffect(()=>{},[html])

   const func2= ()=>{
    let articleId=localStorage.getItem('articleid')
    console.log("fetcher")
    fetch(`http://localhost:8081/apis/${articleId}`)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(data => {
        setArticle(data)
      })
      .catch((err)=>{
        console.log(err)
      })
   }


  return (
    <>
    <Navbar/>
        <div className="container">
          <div className='headers-article'>
            <h6>Created By: {article.createdBy}</h6>
            <h6>UPVOTES: {article.likes}</h6>
            <h6>VIEWS: {article.views}</h6>
          </div>
          <h3>{article.heading}</h3>
          
          <div dangerouslySetInnerHTML={{__html: article.displayBody}}></div>
        </div> 

    </>
  )
}

export default ArticleBody
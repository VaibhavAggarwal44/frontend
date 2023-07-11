import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './NavBar/Navbar'
import {useNavigate} from "react-router-dom"
import {FaThumbsUp,FaThumbsDown} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import { IconContext } from "react-icons/lib";
import './App.css'
import Navbar1 from './NavBar/Navbar'
import CommentExampleComment from './Comment/Comment'
import Nested from './Comment/Comment'

function ArticleBody() {
    const [likeColor,setLikeColor]=useState("blue")
    const [dislikeColor,setDislikeColor]=useState("red")

    const [likes,setLikes]=useState(0)

    const [dislikes,setDisLikes]=useState(0)
    let username=sessionStorage.getItem('username')
    
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

   useEffect(()=>{},[likeColor,dislikeColor])

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
        setLikes(data.likes)
        setDisLikes(data.dislikes)

        if(data.dislikedBy.includes(username)){
          setDislikeColor("red")
          setLikeColor("grey")
        }
        if(data.likedBy.includes(username)){
          setLikeColor("blue")
          setDislikeColor("grey")
        }
        
      })
      .catch((err)=>{
        console.log(err)
      })
   }

   const likeHandler=(e)=>{
    e.preventDefault()
    let articleId=localStorage.getItem('articleid')
    // console.log(likeColor)
    setLikeColor("blue")
    setDislikeColor("grey")
      
      fetch(`http://localhost:8081/apis/${articleId}/${username}/like`)
      .then(response => {
        console.log("response.json()");
        return response.json();
      })
      .then(data => {
        setLikes(data.likes)
        setDisLikes(data.dislikes)
      })

      return ;
    
   }

   const dislikeHandler=(e)=>{
    e.preventDefault()
    let articleId=localStorage.getItem('articleid')
    // console.log(likeColor)
    setDislikeColor("red")
          setLikeColor("grey")
      fetch(`http://localhost:8081/apis/${articleId}/${username}/dislike`)
      .then(response => {
        console.log("response.json()");
        return response.json();
      })
      .then(data => {
        setLikes(data.likes)
        setDisLikes(data.dislikes)
      })

      return ;
    
   }

   const editHandler=(e)=>{
    e.preventDefault();
    navigate('/edit')
   }


  return (
    <>
    <Navbar1/>
        <div className="container">
          <div className='headers-article py-3'>
            <h6>Created By: {article.createdBy}</h6>
            
            <h6>VIEWS: {article.views}</h6>

            <h6>Likes: {likes}</h6>

            <h6>Dislikes: {dislikes}</h6>

            <div>
              <button onClick={(e)=>likeHandler(e)} className='button-border-set'>
                  <IconContext.Provider value={{ color: `${likeColor}`,size:30 }}>
                      <FaThumbsUp/>
                  </IconContext.Provider>
              </button>
              <button onClick={(e)=>dislikeHandler(e)} className='button-border-set'>
                  <IconContext.Provider value={{ color: `${dislikeColor}`,size:30 }}>
                      <FaThumbsDown/>
                  </IconContext.Provider>
              </button>
              {article.createdBy==username && <button className='button-border-set' onClick={(e)=>{editHandler(e)}}>
                  <IconContext.Provider value={{ color: "",size:30 }}>
                      <FiEdit/>
                  </IconContext.Provider>
              </button>}
          </div>
          </div>
          <h1>{article.heading}</h1>
          
          <div dangerouslySetInnerHTML={{__html: article.displayBody}}></div>
        </div> 
        {/* <div className='container'>
        <Nested/>
        </div> */}
        

    </>
  )
}

export default ArticleBody
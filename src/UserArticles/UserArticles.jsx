import { useAutocomplete } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import Navbar from '../NavBar/Navbar';

function UserArticles() {

    const [articles,setArticles]=useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        let username=sessionStorage.getItem('username')
        // console.log(username)
        if(username==='' || username===null){
          navigate('/login')
        }else{
            fetch(`http://localhost:8081/apis/checker/${username}`)
            .then(response => {
                // console.log(response.json());
                return response.json();
              })
              .then(data => {
                setArticles(data)
                // console.log(data);
              })
        }
    
     }, []);

     

  return (
    <>
    <Navbar/>
    <div className="container">
        <h1>THESE ARE YOUR ARTICLES:</h1>
        <div className="container w-75">
        {(articles.length>0 && (
            articles.map((article,i)=>(
                <div class="card my-4">
                <div class="card-header">
                    <h4>{article.heading}</h4>
                </div>
                <div class="card-body">
                    <h6>LIKES: {article.likes}&nbsp;&nbsp;   VIEWS:{article.views}</h6>
                    <p class="card-text">{article.articleBody?article.articleBody.substring(0,70)+"...":""}</p>
                    <a onClick={()=>{localStorage.setItem('articleid',article.id); navigate('/view/article');}} class="btn btn-primary table-row">View Post</a>
                </div>
                </div>

            ))
            ))}
        </div>

    </div>
    </>
  )
}

export default UserArticles
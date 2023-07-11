import React from "react";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import  Button  from "react-bootstrap/Button";
import { Link,useNavigate } from "react-router-dom";
import "./App.css"
import Navbar from "./NavBar/Navbar";
import Navbar1 from "./NavBar/Navbar";
import Typewriterj from "./Typewriter";
import CommentExampleComment from "./Comment/Comment";

const Home = () => {
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
    <Navbar1/>
    <div >
      
      <Typography sx={{ margin:"5%" }} variant="h3" align="center">
        BLOGGER APP
      </Typography>
      <Typewriterj/>
      
    </div>
      {/* <CommentExampleComment/> */}
    </>
  );
};

export default Home;
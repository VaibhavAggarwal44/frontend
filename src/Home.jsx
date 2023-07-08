import React from "react";
import { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import "./App.css"
import Navbar from "./NavBar/Navbar";

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
    <Navbar/>
    <div >
      
      <Typography sx={{ margin:"5%" }} variant="h3" align="center">
        ARTICLE WEBSITE
      </Typography>
      <div>
        <ul className="ul" >
        
          <li>
          <Link to="/create">
          <Button className="button-style" sx={{ margin:"2% 3%"}} variant="outlined">
            
              INSERT AN ARTICLE
            
            </Button>
            </Link>
          </li>
          
          
          <li>
          <Link to="/search">
          <Button className="button-style" sx={{ margin:"2% 3%"}} variant="outlined">
            
              SEARCH
            
            </Button>
            </Link>
          </li>
          
         
          <li>
          <Link to="/display">
          <Button className="button-style" sx={{ margin:"2% 3%"}} variant="outlined">
            
              VIEW ALL ARTICLES
            
            </Button>
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
    </>
  );
};

export default Home;
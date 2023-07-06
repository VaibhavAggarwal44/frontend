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
        <Link to="/create">
          <li>
          <Button className="button-style" sx={{ margin:"2% 3%"}} variant="outlined">
            
              INSERT AN ARTICLE
            
            </Button>
          </li>
          </Link>
          <Link to="/search">
          <li>
          <Button className="button-style" sx={{ margin:"2% 3%"}} variant="outlined">
            
              SEARCH
            
            </Button>
          </li>
          </Link>
          <Link to="/display">
          <li>
          <Button className="button-style" sx={{ margin:"2% 3%"}} variant="outlined">
            
              VIEW ALL ARTICLES
            
            </Button>
          </li>
          </Link>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Home;
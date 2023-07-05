import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css"

const Home = () => {
  return (
    <div >
      <Typography sx={{ margin:"5%" }} variant="h3" align="center">
        ARTICLE WEBSITE
      </Typography>
      <div>
        <ul className="ul">
        <Link to="/create">
          <li>
          <Button sx={{ margin:"2% 3%"}} variant="outlined">
            
              INSERT AN ARTICLE
            
            </Button>
          </li>
          </Link>
          <Link to="/search">
          <li>
          <Button sx={{ margin:"2% 3%"}} variant="outlined">
            
              SEARCH
            
            </Button>
          </li>
          </Link>
          <Link to="/display">
          <li>
          <Button sx={{ margin:"2% 3%"}} variant="outlined">
            
              VIEW ALL ARTICLES
            
            </Button>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Home;
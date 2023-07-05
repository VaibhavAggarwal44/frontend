// src/App.js

import "./Form.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import Card from "../Card/Card";
import CardGrid from "../Card/CardGrid";
import { useNavigate } from "react-router-dom";
// import 

function Form() {
  const url='http:/localhost:8081/apis/insert';
  const navigate=useNavigate()
  // const [article,setArticle]=useState({id:21});
  const [heading, setHeading] = useState("");
  const [articleBody, setarticleBody] = useState("");
  const [createdBy, setcreatedBy] = useState("");
//   const [createdBy, set] = useState("");
  const [message, setMessage] = useState("");

  let flag=false;

  // const baseURL="http://localhost"

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(heading.length>0 && articleBody.length>0 && createdBy.length>0){
      fetch('http://localhost:8081/apis/insert',{
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          articleBody:articleBody,
          heading:heading,
          createdBy:createdBy
        })
      })
      .then((response)=>{console.log(response)
        if(response.status==200){
          flag=true;
          setMessage("article inserted successfully")
          setTimeout(()=>{navigate('/')},1000)
          
        }else{
          setMessage("some error occured")

          setTimeout(()=>{navigate('/')},1000)
        }
      })
      .catch((err)=>{console.log(err)});

      console.log(heading+" "+articleBody+" "+createdBy)
    }
    else{
      flag=false;
      setMessage("please fill all the details")
    }
    // navigate('/')
    // console.log(JSON.stringify(article))
    // fetch(url,{
    //   method:'POST',
    //   body: JSON.stringify(article),
    // }).then((data)=>{console.log(data)})
    // .catch((err)=>{console.log(err)});
  }

  return (
    <div id="inner">
      <div className="App">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input
            type="text"
            value={heading}
            placeholder="Heading"
            onChange={(e) => setHeading(e.target.value)}
          />
          <input
            type="text"
            value={articleBody}
            placeholder="Content"
            onChange={(e) => setarticleBody(e.target.value)}
          />
          <input
            type="text"
            value={createdBy}
            placeholder="Username"
            onChange={(e) => setcreatedBy(e.target.value)}
          />

          <button type="submit">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
          <CardGrid>{flag && (
          <Card>
            <h2>{heading}</h2>
            <h4>Posted By:{createdBy}</h4>
            <p>{articleBody}</p>
            {/* <h5>{user.createdBy}</h5> */}
          </Card>
          
          )}
          </CardGrid>
        </form>
      </div>
      <CardGrid>{flag && (
          <Card>
            <h2>{heading}</h2>
            <h4>Posted By:{createdBy}</h4>
            <p>{articleBody}</p>
            {/* <h5>{user.createdBy}</h5> */}
          </Card>
          
          )}
        </CardGrid>
    </div>
  );
}

// export a;
export default Form;
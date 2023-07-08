// src/App.js

import "./Form.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import JoditEditor from "jodit-react"
import { useRef } from "react";
import ReactSwitch from "react-switch";
// import 

function Form() {
  const [checked,setChecked]=useState(true)
  const editor=useRef(null)
  const [content,setContent]=useState('')
  const url='http:/localhost:8081/apis/insert';
  const navigate=useNavigate()
  // const [article,setArticle]=useState({id:21});
  const [heading, setHeading] = useState("");
  const [articleBody, setarticleBody] = useState("");
//   const [createdBy, set] = useState("");
  const [message, setMessage] = useState("");

  // const navigate=useNavigate()

  useEffect(() => {
    let username=sessionStorage.getItem('username')
    // console.log(username)
    if(username==='' || username===null){
      navigate('/login')
    }

 }, []);

 function togglePublic(val){
  console.log(val)
  setChecked(val)
 }

  let flag=false;

  function removeTags(str) {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
      
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
  }

  // const baseURL="http://localhost"

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(heading.length>0 && content.length>0){
      fetch('http://localhost:8081/apis/insert',{
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          articleBody:removeTags(content),
          heading:heading,
          createdBy:sessionStorage.getItem('username'),
          displayBody:content,
          isPublic:checked
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

      console.log(heading+" "+articleBody)
    }
    else{
      flag=false;
      setMessage("please fill all the details")
      setTimeout(()=>setMessage(""),2000)
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
    <>
    <Navbar/>
    <div >
      <div className="checker">
        <form className="container" onSubmit={(e)=>handleSubmit(e)}>
          <input
          className="my-3"
            type="text"
            value={heading}
            placeholder="Heading"
            onChange={(e) => setHeading(e.target.value)}
          />
          {/* <input
          className="my-3"
            type="text"
            value={articleBody}
            placeholder="Content"
            onChange={(e) => setarticleBody(e.target.value)}
          /> */}
          <JoditEditor
          ref={editor}
          value={content}
          // className="text-editor"
          // config={config} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => setContent(newContent)} 
        />

          <div style={{textAlign: "center"}}>
                <h4>Keep The Article Public:</h4>
                <ReactSwitch
                  checked={checked}
                  onChange={togglePublic}
                />
          </div>
          <button type="submit" className="my-3 insert-button">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
        
      </div>
      
    </div>
    
    </>
  );
}

// export a;
export default Form;
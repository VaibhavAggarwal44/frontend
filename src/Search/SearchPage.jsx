import React, { useEffect, useState } from "react"
import "./SearchPage.css"
import Navbar from "../NavBar/Navbar";
import {useNavigate} from "react-router-dom"

const SearchBar = () => {
  const [users, setUsers] = useState([])
  
  const [message, setMessage] = useState('');

  const [updated, setUpdated] = useState(message);

  const handleChange1= (e)=>{
    
    setMessage(e.target.value);

  }

  const navigate=useNavigate()

  useEffect(() => {
    let username=sessionStorage.getItem('username')
    // console.log(username)
    if(username==='' || username===null){
      navigate('/login')
    }

 }, []);

  const handleChange2= (e)=>{
    e.preventDefault();
    handleChange()
  }

  const articleView=(id)=>{
    sessionStorage.setItem('articleId',id)
    // navigate('/view/article')
  }

  const handleChange = () => {
    // setMessage(event.target.value);
    // setMessage(message.trim())
    var str=message.trim()
    var query=str.replace(' ', "--")
    fetch(`http://localhost:8081/apis/search/${query}`)
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .then(data => {
        setUsers(data)
        // console.log(data);
      })
      // setMessage('')

  };

  return (
    <div>
      <Navbar/>
      <div id="inner">
        <form >
        <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange1}
          value={message}
        />

        <h2>Query: {message}</h2>

        <button onClick={(e)=>{handleChange2(e)}}>Search</button>
        </form>
        
      </div>
      
      <div> 
    {users.length>0 &&     
    (<table id="customers">
      <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Heading</th>
            <th>Article Body</th>
            <th>Created By</th>
            <th>Likes</th>
            <th>Views</th>
          </tr>
        </thead>
        
       {users.length > 0 && (
        <tbody>
          {
          users.map(user => (
            
            <tr key={user.id}>
              {/* <td>{user.id}</td> */}
              <td><a href="http://localhost:3000/view/article">{user.heading}</a></td>
              <td>{user.articleBody}</td>
              <td>{user.createdBy}</td>
              <td>{user.likes}</td>
              <td>{user.views}</td>
            </tr>
          ))}
        </tbody>
        
      )}
      
    </table>)}
    </div>
    </div>
  );
}

export default SearchBar;
import React, { useEffect, useState } from "react"
import "./AllArticles.css"
import { Link,useNavigate } from "react-router-dom";
import ArticleListItem from "./ArticleListItem";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./NavBar/Navbar";
// import CardGrid from "./Card/CardGrid";
// import Card from "./Card/Card";
// import "./Card/style.css"

const AllArticles = () => {

  const [articles, setArticles] = useState([]);
  let var1=false;
  let var2=false;

  useEffect(() => {
    let username=sessionStorage.getItem('username')
    if(username==='' || username===null){
      navigate('/login')
    }else{
      handleChange("articles/sortView")
    }

 }, []);

  const [currentPage, setCurrentPage]=useState(1);
  const recordsPerPage=4;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=articles.slice(firstIndex,lastIndex);
  const npage=Math.ceil(articles.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1);

  const navigate=useNavigate()


  function nextPage(){
    if(currentPage!==lastIndex && currentPage!==npage){
      setCurrentPage(currentPage+1)
    }

  }

  function prePage(){
    // if(currentPage===1){}
    if(currentPage!==firstIndex && currentPage!==1){
      setCurrentPage(currentPage-1)
    }
  }

  function changeCPage(id){
    // if(id>0)
    // pageSetter(id)
  }

  // function pageSetter(id){
  //   setCurrentPage(id)
  // }

    const handleChange2= (e)=>{
        e.preventDefault();
        if(var1){
            console.log("like")
            handleChange("articles/sortLike")
        }else if(var2){
            console.log("view")
            handleChange("articles/sortView")
        }else{
            console.log("all articles")
            handleChange("articles")
        }
    }   

    // useEffect(() => {
    //     handleChange("articles")
    // }, []);

  const handleChange = (message) => {
    try{
        fetch(`http://localhost:8081/apis/${message}`)
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .then(data => {
        // console.log(data)
        if(message=="articles")
        setArticles(data.content)
        else
        setArticles(data)
        // console.log(data.type);
      })

    }catch(err){
        console.log(err);
    }
    
      // setMessage('')

      return true;

  };

  return (
    <div>
      <Navbar/>
      
      <div className="container checker2">
        <button className="style-button btn btn-primary my-2 justify-content-center" onClick={(e)=>{var1=true; var2=false; handleChange2(e);}}>Sort by likes</button>
        <button className="style-button btn btn-primary my-2 justify-content-center" onClick={(e)=>{var1=false; var2=true; handleChange2(e);}}>Sort by views</button>
        {records.length>0 &&     
        // (<table id="customers">
        // <thead>
        //     <tr>
        //         {/* <th>ID</th> */}
        //         <th>Heading</th>
        //         <th>Article Body</th>
        //         <th>Created By</th>
        //         <th><a onClick={(e)=>{var1=true; var2=false; handleChange2(e);}}>Likes</a></th>
        //         <th>Views</th>
        //     </tr>
        //     </thead>
            
        // {records.length > 0 && (
        //     <tbody>
        //     {
        //     records.map(article => (
        //         // <Link to="/view/article">
                
        //         <tr key={article.id} className="table-row" onClick={()=>{localStorage.setItem('articleid',article.id); navigate('/view/article');}}>
        //           <td>{article.heading}</td>
        //           <td>{article.articleBody?article.articleBody.substring(0,70)+".....":""}</td>
        //           <td>{article.createdBy}</td>
        //           <td>{article.likes}</td>
        //           <td>{article.views}</td>
        //         </tr>
        //         // </Link>
        //     ))}
        //     </tbody>
            
        // )}
        
        // </table>)

        (records.length>0 && (
          records.map(article=>(
            <div class="card my-4">
              <div class="card-header">
                <h4>{article.heading}</h4>
              </div>
              <div class="card-body">
                <h6>LIKES: {article.likes}&nbsp;&nbsp; VIEWS:{article.views}&nbsp;&nbsp; POSTED BY:{article.createdBy}</h6>
                <p class="card-text">{article.articleBody?article.articleBody.substring(0,70)+"...":""}</p>
                <a onClick={()=>{localStorage.setItem('articleid',article.id); navigate('/view/article');}} class="btn btn-primary table-row">View Post</a>
              </div>
            </div>

          ))
        ))
      
      }
        
        
        </div> 
        
        {records.length>0 && (
        <div className="paginator">
          <nav className="my-3">
            <ul className="pagination justify-content-center">
            <a className="page-link"
                    onClick={prePage}>
                <li className="page-item">
                    Prev
                </li>
                </a>
                {
                  numbers.map((n,i)=>(
                    <a className="page-item"
                      onClick={()=>setCurrentPage(n)}>
                    <li className={`page-link ${currentPage===n?'bg-warning':''}`} key={i}>
                      {n}
                    </li>
                    </a>
                  ))
                }
                <a className="page-link"
                    onClick={nextPage}>
                <li className="page-item">
                    Next
                </li>
                </a>
            </ul>
          </nav>
        </div>)}
    </div>
  );
}

export default AllArticles;
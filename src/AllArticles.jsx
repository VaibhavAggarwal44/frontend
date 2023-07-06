import React, { useEffect, useState } from "react"
import "./Search/SearchPage.css"
import "./AllArticles.css"
import { Link } from "react-router-dom";
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

  

  const [currentPage, setCurrentPage]=useState(1);
  const recordsPerPage=10;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=articles.slice(firstIndex,lastIndex);
  const npage=Math.ceil(articles.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1);

  function nextPage(){
    if(currentPage!==lastIndex){
      setCurrentPage(currentPage+1)
    }

  }

  function prePage(){
    if(currentPage!==firstIndex){
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

    useEffect(() => {
        handleChange("articles")
    }, []);

  const handleChange = (message) => {
    try{
        fetch(`http://localhost:8081/apis/${message}`)
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .then(data => {
        console.log(data)
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
  //  let id="";

  return (
    <div>
      <Navbar/>
        <button classname="ml-3 my-3" onClick={(e)=>{var1=false; var2=false; handleChange2(e);}}>View All</button>
        <button classname="ml-3 my-3" onClick={(e)=>{var1=true; var2=false; handleChange2(e);}}>Sort by likes</button>
        <button classname="ml-3 my-3" onClick={(e)=>{var1=false; var2=true; handleChange2(e);}}>Sort by views</button>
        {records.length>0 &&     
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
            
        {records.length > 0 && (
            <tbody>
            {
            records.map(article => (
                // <Link to="/view/article">
                
                <tr key={article.id}>
                    {/* {console.log(article)} */}
                    {/* {id=article.id} */}
                {/* <td>{article.id}</td> */}
                <td>{article.heading}</td>
                <td>{article.articleBody}</td>
                <td>{article.createdBy}</td>
                <td>{article.likes}</td>
                <td>{article.views}</td>
                </tr>
                // </Link>
            ))}
            </tbody>
            
        )}
        
        </table>)}
        
        {records.length>0 && (
        <nav className="mx-2 my-3">
          <ul className="pagination">
              <li className="page-item">
                  <a className="page-link"
                  onClick={prePage}>Prev</a>
              </li>
              {
                numbers.map((n,i)=>(
                  <li className={`page-link ${currentPage===n?'bg-warning':''}`} key={i}>
                    <a className="page-item"
                    onClick={()=>setCurrentPage(n)}>{n}</a>
                  </li>
                ))
              }
              <li className="page-item">
                  <a className="page-link"
                  onClick={nextPage}>Next</a>
              </li>
          </ul>
        </nav>)}
            
    </div>
  );
}

export default AllArticles;
import React from 'react'

function ArticleBody(props) {
    console.log(props.a_id)

  return (
    <>
            <h1>{props.heading}</h1>
            <h4>POSTED BY: {props.createdby}<br/>Views: {props.views}</h4>
            <p>{props.articlebody}</p>

    </>
  )
}

export default ArticleBody
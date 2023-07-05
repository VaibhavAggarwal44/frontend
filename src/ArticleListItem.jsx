import React from 'react'

function ArticleListItem(props) {
  return (
    <div>
        <h4>{props.heading}</h4>
        <h6>{props.createdBy}</h6>
        <p>{props.articleBody}</p>
    </div>
  )
}

export default ArticleListItem
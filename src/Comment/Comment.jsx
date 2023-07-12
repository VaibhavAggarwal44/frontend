import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

import {ToastContainer ,toast } from "react-toastify";

import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import Reply from './Reply';

function Comment() {
    const [content,setContent]=useState('');
    const [comment,setComment]=useState([]);
    const [reply,setReply]=useState('');
    let username=sessionStorage.getItem('username');
    let articleId=localStorage.getItem('articleId');

    useEffect(()=>{
        let articleId=localStorage.getItem('articleId')
        fetch(`http://localhost:8081/comment/${articleId}`)
        .then(response => {
            // console.log(response.json());
            return response.json();
        })
        .then(data => {
            console.log(data)
            setComment(data)
        })
    },[])

    const func=()=>{
        let articleId=localStorage.getItem('articleId')
        fetch(`http://localhost:8081/comment/${articleId}`)
        .then(response => {
            // console.log(response.json());
            return response.json();
        })
        .then(data => {
            debugger
            console.log(data)
            setComment(data)
        })
    }

    const handleComment=(e)=>{
        e.preventDefault();

        var str=content.trim();

        if(str===''){
            return;
        }else{
            fetch('http://localhost:8081/comment/insert',{
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          content:str,
          articleId:articleId,
          username:username
        })
      })
      .then((response)=>{console.log(response)
        if(response.status==200){
        //   flag=true;
          toast.success("comment inserted successfully")
        //   setTimeout(()=>{navigate('/')},1000)
        func()
          
        }else{
          toast.error("some error occured")

        //   setTimeout(()=>{navigate('/')},1000)
        }
      })
      .catch((err)=>{console.log(err)});

      setContent('')
    }

    }

    const handleReply=(e,commentId)=>{
        e.preventDefault();
        console.log("bete")

        var str=reply.trim();

        if(str===''){
            console.log("aonther")
            return;
        }else{
            console.log("dust")
            fetch(`http://localhost:8081/comment/${commentId}/insert`,{
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          content:reply,
          articleId:articleId,
          username:username
        })
      })
      .then((response)=>{console.log(response)
        if(response.status==200){
             window.location.reload(false)
        //   setTimeout(()=>{navigate('/')},1000)
            func()
        }else{
          toast.error("some error occured")

        //   setTimeout(()=>{navigate('/')},1000)
        }
      })
      .catch((err)=>{console.log(err)});

      setReply('')
    }

    }



  return (
    <Row className="my-4">

                    <Col md={

                        {
                            size: 9,
                            offset: 1
                        }
                    }>
                        <h3>Comments</h3>

                        {
                            comment && comment.map((c, index) => {
                                if(c.parentComment){
                                    console.log(c.replies)
                                    return (
                                    <Card className="mt-4 border-1" key={index}>
                                        <CardBody>
                                            <div className='d-flex'>
                                            <CardText className='mx-2'><strong>{c.username}</strong></CardText>
                                            <CardText>
                                                {c.content}
                                            </CardText>
                                            </div>
                                            <Input
                                                placeholder="Reply??"
                                                value={reply}
                                                onChange={(event) => setReply(event.target.value)}
                                            />

                                            <Button  className="mt-2" color="primary" onClick={(e)=>handleReply(e,c.commentId)}>Reply</Button>
                                            <Reply commentId={c.commentId}/>
                                        </CardBody>
                                    </Card>);
                                }}
                                
                                // (c?.replies && c.replies.map((reply)=>{<Card className="mt-4 border-1" key={index}>
                                // <CardBody className='d-flex my-3'>
                                //         <CardText className='mx-2'><strong>{reply.username}</strong></CardText>
                                //         <CardText>
                                //             {reply.content}
                                //         </CardText>
                                //         </CardBody>
                                // </Card>}))
                            )
                                
                        }
                        <Card className="mt-4 border-0" >
                            <CardBody>

                                <Input
                                    type="textarea"
                                    placeholder="Enter comment here"
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                />

                                <Button  className="mt-2" color="primary" onClick={(e)=>handleComment(e)}>Submit</Button>
                            </CardBody>
                        </Card>

                    </Col>

            <ToastContainer/>
    </Row>

  )
}

export default Comment
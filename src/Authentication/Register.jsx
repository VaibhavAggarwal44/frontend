import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const Register = () => {

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')

    useEffect(()=>{
        sessionStorage.clear();
    },[]);

    const usenavigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (username === null || username === '') {
            isproceed = false;
            errormessage += ' Username,';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password,';
        }
        if (cpassword === null || cpassword === '') {
            isproceed = false;
            errormessage = 'Please Confirm your Password,';
        }
        else if(cpassword!==password){
            errormessage="password mismatch"
        }

        if(!isproceed){
            toast.warning(errormessage)
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
            e.preventDefault();
            // console.log(username+password+cpassword)
        if(IsValidate()){
            fetch("http://localhost:8081/auth/register",{
                method:'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            })
            .then((resp) => {
                return resp.json()
            })
            .then((resp)=>{
                // console.log(resp)
                if(resp.username=='AaA' || resp.password=='AaA'){
                    toast.error("user already exists")
                }else{
                    sessionStorage.setItem('username',username)
                    toast.success("Successfully registered")
                    usenavigate('/')
                }
            })
        }
    }
    return (
        <>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div >
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div >
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                                <div >
                                    <div className="form-group">
                                        <label>Confirm Password<span className="errmsg">*</span></label>
                                        <input value={cpassword} onChange={e => setCpassword(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button> |
                            <Link to={'/login'} className="btn btn-danger">Login</Link>
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer/>
        </>
    );
}

export default Register;
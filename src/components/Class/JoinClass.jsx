import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import HomeNavbar from "../Navbar/Homenavbar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import "../styles/Style1.css";
const URL = process.env.REACT_APP_BACKEND_URL;
const JoinClass = () => {
    const [inputCode, setInputCode] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    const [createError, setCreateError] = useState('');
    const [joinError, setJoinError] = useState('');
    const [userName, setUserName]=useState('');
    
    useEffect(() => {
        const token = new Cookies().get('token'); 
            axios.get(`${URL}/user`,{
                headers: {
                Authorization:`Bearer ${token}`}})
            .then(res => {
                setUserName(res.data.name)
            })
    }, [])
    

    const openJoinTab = () => {
        document.querySelector("#join-class").style.display = "block";
        document.querySelector("#create-class").style.display = "none";
    }
    const openCreateTab = () => {
        document.querySelector("#join-class").style.display = "none";
        document.querySelector("#create-class").style.display = "block";
    }

    const CreateClass = e => {
        e.preventDefault();
        if(createError === ""){
            const token = new Cookies().get('token');
            axios.post(`${URL}/classroom`, {name: inputTitle},{
                headers: {
                Authorization:`Bearer ${token}`}})
            .then(res => {window.location = `/class/${res.data._id}`;
                }
            )
            .catch(() => setJoinError("Something went wrong."))
        }
    }

    const JoinClass = e => {
        e.preventDefault();
        if(joinError === ""){
           const token = new Cookies().get('token');
            axios.put(`${URL}/student/classroom/enroll`, {code: inputCode},{
                headers: {
                Authorization:`Bearer ${token}`}})
            .then(res => window.location = `/class/${res.data._id}`)
            .catch(() => setCreateError("Something went wrong."))
        }
    }

    return(
        <div className="container-fluid">
            <HomeNavbar user={userName}/>
            <div className="container">
            <div className="wrapper">
                <Box sx={{ '& button': { m: 1 } }}>
                    <Button variant="contained" size="medium" onClick = {openJoinTab}>
                            Join class
                    </Button>
                   
                    <Button variant="contained" size="medium" onClick = {openCreateTab}>
                    Create class
                    </Button>
                    <div className="box-text">
                        <form id = "join-class" onSubmit = {JoinClass}>
                        
                        <div className="heading">
                            <h1 className="text text-large box-title">Join a Class</h1>
                            <h4 className="form-error text-error">{joinError}</h4>
                        </div>
                            <div className="form-group">

                                <TextField id="outlined-basic" label="Class Code" variant="outlined" value = {inputCode} onChange = {({target: {value}}) => setInputCode(value)}/>
                                <Button variant="contained" size="medium" type="submit">
                                Submit
                                </Button>
                            </div>
                        
                        </form>
                        <form id = "create-class" style={{display: "none"}} onSubmit = {CreateClass}>
                        <div className="heading">
                            <h1 className="text text-large box-title">Create Class</h1>
                            <h4 className="form-error text-error">{createError}</h4>
                        </div>
                        <div className="form-group">
      
                                <TextField id="outlined-basic" label="Classroom Name" variant="outlined" value = {inputTitle} onChange = {({target: {value}}) => setInputTitle(value)}/>
                                <Button variant="contained" size="medium" type="submit">
                                Submit
                                </Button>
                        </div>
                            
                        </form>
                       
                    </div>
                </Box>
                </div>
            </div>
        </div>
    )
}

export default JoinClass;
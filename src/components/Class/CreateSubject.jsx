import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import HomeNavbar from "../Navbar/Homenavbar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import "../styles/Style1.css";
const URL = process.env.REACT_APP_BACKEND_URL;
const CreateSubject = () => {
    const {id} = useParams();
    const [inputTitle, setInputTitle] = useState('');
    const [createError, setCreateError] = useState('');
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
    

    const openCreateTab = () => {
        document.querySelector("#create-subject").style.display = "block";
    }

    const CreateSubject = e => {
        e.preventDefault();
        if(createError === "" && id){
            const token = new Cookies().get('token');
            axios.post(`${URL}/classroom/${id}`, {name: inputTitle},{
                headers: {
                Authorization:`Bearer ${token}`}})
            .then(res => {window.location = `/class/${res.data.classroomId}`;
                }
            )
            .catch(() => setCreateError("Something went wrong."))
        }
    }

    

    return(
        <div className="container-fluid">
            <HomeNavbar user={userName}/>
            <div className="container">
            <div className="wrapper">
                <Box sx={{ '& button': { m: 1 } }}>
                    <Button variant="contained" size="medium" onClick = {openCreateTab}>
                    Create Subject
                    </Button>
                    <div className="box-text">
                        <form id = "create-subject" style={{display: "block"}} onSubmit = {CreateSubject}>
                            <div className="heading">
                                <h1 className="text text-large box-title">Create Subject</h1>
                                <h4 className="form-error text-error">{createError}</h4>
                            </div>
                            <div className="form-group">
        
                                    <TextField id="outlined-basic" label="Subject Name" variant="outlined" value = {inputTitle} onChange = {({target: {value}}) => setInputTitle(value)}/>
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

export default CreateSubject;
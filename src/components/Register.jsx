import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import "./styles/Style1.css"
import 'react-phone-number-input/style.css'
const URL = process.env.REACT_APP_BACKEND_URL;
const Register = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordConfirmation, setInputPasswordConfirmation] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [inputPhoneNumber,setInputPhoneNumber]=useState();
    const [inputRole,setInputRole]=useState('');
    const [error, setError] = useState([]);

    //Register the user
    const Submit = async (e) => {
        e.preventDefault();

        if(error === ""){
            console.log(URL);
            await axios.post(`${URL}/user`,{name: inputUsername,email: inputEmail, phone: inputPhoneNumber,role: inputRole, password: inputPassword},{
                headers: {
                basicauth: "KDSUBF73HH2IO92H99"}})
            .then(res => {
                const token = new Cookies();
                token.set('token', res.data.token, {path: '/', maxAge:604800 })
                //return to home page
                window.location = "/";
            })
            .catch(err => setError(err.response.data.message));
        }
    }

    useEffect(() => {
        if(inputEmail.length > 0) setError('');
    }, [inputEmail])

    //validating users' input
    useEffect(() => {
        if(inputPassword !== inputPasswordConfirmation) setError("Password and confirmation must match.")
        else {
            if(inputUsername.length < 3 && inputUsername.length !== 0) setError("Username length should be more than or equal to three");
            else if(inputUsername.length > 50) setError('Username length should be less or equal to 50');
            else setError('');
        }
    }, [inputPassword, inputPasswordConfirmation, inputUsername])

    
    return (
        <div className="container">
            <div className="wrapper">
            <form className="margin box box-shadow text-dark form-control form" onSubmit={Submit}>
                <div className="heading">
                <h1 className="text text-large">Register user</h1>
                <p className="form-error text-error">{error}</p>
                </div>
                <div className="form-group">
                    <TextField id="outlined-name" autoComplete="username" label="Username" type="text" variant="outlined" className="form-control" value={inputUsername} onChange={({target: {value}}) => setInputUsername(value)} required/>
                </div>
                <div className="form-group">
                    <TextField id="outlined-email" autoComplete="email" label="Email" type="email" variant="outlined" className="form-control" value={inputEmail} onChange = {({target: {value}}) => setInputEmail(value)} required/>
                </div>
                <div className="form-group">
                    <TextField id="outlined-password" autoComplete="password" label="Password" variant="outlined" type="password" className="form-control" value={inputPassword} onChange= {({target: {value}}) => setInputPassword(value)} required/>
                </div>
                <div className="form-group">
                    <TextField id="outlined-re-password" label="Re-enter Password" variant="outlined" type="password" className="form-control" value={inputPasswordConfirmation} onChange= {({target: {value}}) => setInputPasswordConfirmation(value)} required/>
                </div>
                <div className="form-group">
                    <TextField id="outlined-phone" label="Enter phone number" variant="outlined" type="phone" className="form-control" value={inputPhoneNumber} onChange= {({target: {value}}) => setInputPhoneNumber(value)} required/>
                </div>
                {/* <div className="form-group">
                    <PhoneInput defaultCountry="IND" placeholder="Enter phone number"  className="form-phone" value={inputPhoneNumber} onChange= {setInputPhoneNumber} required/>
                </div> */}
                <div className="form-group">
                <FormControl fullWidth>

                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role-select"
                        value={inputRole}
                        label="role"
                        onChange= {({target: {value}}) => setInputRole(value)} 
                    >
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                        <MenuItem value={"student"}>Student</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div className="form-group">
                    <p className = "form-label">Already have account? <NavLink to="/login" className="text-link">Login</NavLink></p>
                </div>
                <div className="form-group">
                    <Button type="submit" variant="contained" className="form-control">Submit</Button>
                </div>

            </form>
            </div>
        </div>
        
    )
}

export default Register;
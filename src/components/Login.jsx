import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
const URL = process.env.REACT_APP_BACKEND_URL;
const Login = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [error, setError] = useState('');

    const Submit = (e) => {
        e.preventDefault();

        axios.post(`${URL}/user/login`, {email: inputEmail, password: inputPassword})
        .then(res => {
            const token = new Cookies();
            token.set('token', res.data.token, {path: '/', maxAge:604800 })
            //return to home page
            window.location = "/";
        })
        .catch(() => setError("Something went wrong. Please try again."))
    }

    return(
        <div className="container">
            <div className="wrapper">
            <form className="margin box box-shadow text-dark form-control form" onSubmit={Submit}>
            <div className="heading">
                <h1 className="text text-large">Login user</h1>
                <h4 className="form-error text-error">{error}</h4>
            </div>
                <div className="form-group">
                    <TextField id="outlined-email" autoComplete="email" label="Email" type="email" variant="outlined" className="form-control" value={inputEmail} onChange = {({target: {value}}) => setInputEmail(value)} required/>
                </div>
                <div className="form-group">
                   
                    <TextField id="outlined-password" autoComplete="password" label="Password" variant="outlined" type="password" className="form-control" value={inputPassword} onChange= {({target: {value}}) => setInputPassword(value)} required/>
                </div>
                <div className="form-group">
                    <p className = "form-label">Don't have account yet? <NavLink to="/register" className="text-link">Register</NavLink></p>
                </div>
                <div className="form-group">
                <Button type="submit" variant="contained" className="form-control">Submit</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login;
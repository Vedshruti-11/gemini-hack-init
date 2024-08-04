import React from 'react';
// import Cookies from 'universal-cookie';
// import DefaultProfile from "../components/Icons/profile.png";
// import UserInfo from '../library/UserInfo';
// import {NavLink} from "react-router-dom";
// import axios from "axios";
import '../styles/NavHam.css';
import Classicnavbar from './Classicnavbar';
// import { Button } from '@mui/material';
//const URL = process.env.REACT_APP_BACKEND_URL;

const HomeNavbar = (props) => {
    return(
        <nav className='custom-nav'>
            <Classicnavbar user={props.user}/>
        </nav>
    )
}

export default HomeNavbar;
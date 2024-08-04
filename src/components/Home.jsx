import React, { useEffect, useState } from "react";
import UserInfo from "../library/UserInfo";
import Cookies from "universal-cookie";
import HomeNavbar from "./Navbar/Homenavbar.jsx";
import axios from "axios";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import './styles/Home.css';
// import { Button } from "@mui/material";
const URL = process.env.REACT_APP_BACKEND_URL;


const Home = () => {
    const [userInfo, setUserInfo] = useState('');
    const [classes, setClasses] = useState([]);
    const [userName, setUserName]=useState('');
    useEffect(() => {
        const token = new Cookies().get('token');
        UserInfo(token).then((res) =>{if(res) setUserInfo(res); else window.location = "/login"})
    }, [])

    useEffect(() => {
        const token = new Cookies().get('token'); 
            axios.get(`${URL}/user`,{
                headers: {
                Authorization:`Bearer ${token}`}})
            .then(res => {
                setUserName(res.data.name)
            })
    }, [])

    useEffect(() => {
        if(userInfo){
            const token = new Cookies().get('token'); 
            // axios.get(`${URL}/classroom`,{
            //     headers: {
            //     Authorization:`Bearer ${token}`}})
            // .then(res => {
            //     res.data.forEach(_class => {
            //         setClasses(classes => [...classes, _class])
            //     })
            // })
            axios.get(`${URL}/classroom/user/fetchclassrooms`,{
                headers: {
                Authorization:`Bearer ${token}`}})
            .then(res => {
                setClasses(res.data)
            })
            // axios.get(`${URL}/classroom/${userInfo._id}`)
            // .then(res => {
            //     res.data.forEach(_class => {
            //         setClasses(classes => [...classes, _class])
            //     })
            // })
        }
    }, [userInfo])

    // const Archive = (classId, owner) => {
    //     if(userInfo._id !== owner){
    //         axios.post(`${URL}/class/user/archive`, {_class: classId, student: userInfo._id, token: userInfo.token})
    //         .then(() => window.location = "/archived")
    //         .catch(err => console.log(err.response))
    //     }
    //     else{
    //         if(window.confirm("Are you sure?")){
    //             axios.post(`${URL}/class/archive`, {token: userInfo.token, owner: userInfo._id, _class: classId})
    //             .then(() => window.location = "/archived")
    //         }
    //     }
    // }

    // const Unenroll = (classId) => {
    //     axios.post(`${URL}/class/students/delete`, {token: userInfo.token, _class: classId, student: userInfo._id})
    //     .then(() => window.location = "/")
    // }

    return(
        <div className="container-fluid">
            <HomeNavbar user={userName} />
            <div className = "container-flow">
            <div className = "container">
                <div className="row">
                {classes.map((_class,index)  => {
                    if(_class){
                        return <div className="custom-container" key = {index}>
                                        
                                        <div className="card card-1">
                                            <h3>{_class.name}</h3>
                                            <p>Class Code : {_class.code}</p>
                                            <p>Owned by : <span className="text-normal" >{_class.ownerId.name }</span></p>
                                            <button className="btn glyphicon-play" onClick = {() => window.location = `/class/${_class._id}`}><span className="play-icon"></span></button>
                                        </div>
     
                                        
                            {/* <p className="box-option link" onClick = {() => Archive(_class._id, _class.owner)}>Archive</p>
                            {_class.students.includes(userInfo._id)?
                                <p className="box-option link" onClick = {() => Unenroll(_class._id)}>Unenroll</p>
                            :
                            <p className="box-option link" onClick = {() => window.location = `/class/${_class._id}/setting`}>Setting</p>} */}
                       
                        </div>
                    }else return null;
                })}
            </div>
            </div>
            </div>
        </div>
    )
}

export default Home;
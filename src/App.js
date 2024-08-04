import './App.css';

import React from "react";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import JoinClass from './components/Class/JoinClass';
import Class from './components/Class/Class';
import CreateSubject from './components/Class/CreateSubject';
import Subject from './components/Class/Subject';
const App = () => (
    <Router>
        <Routes>
            <Route exact path = "/" element = {<Home/>} />
            <Route path = "/login" element = {<Login/>} />
            <Route exact path = "/register" element = {<Register/>} />
            <Route path = "/logout" element = {<Logout/>} />
            <Route path = "/class/join" element = {<JoinClass/>} />
            <Route path = "/class/:id" element = {<Class/>} />
            <Route path = "/class/create-subject/:id" element = {<CreateSubject/>} />
            <Route path = "/class/subject/:id" element = {<Subject/>} />
            
        </Routes>
    </Router>
)

export default App;

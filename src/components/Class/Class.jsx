import React, { useEffect, useState } from "react";
import UserInfo from "../../library/UserInfo.js";
import Cookies from "universal-cookie";
import HomeNavbar from "../Navbar/Homenavbar.jsx";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "../styles/Home.css";
import { useParams } from "react-router-dom";
const URL = process.env.REACT_APP_BACKEND_URL;

const Class = () => {
  const {id} = useParams();
  const [userInfo, setUserInfo] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [userName, setUserName] = useState("");
  const [classId,setClassId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = new Cookies().get("token");
    UserInfo(token).then((res) => {
      if (res) setUserInfo(res);
      else window.location = "/login";
    });
  }, []);

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
    const token = new Cookies().get("token");
    axios.get(`${URL}/classroom/user/fetchclassrooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(id);
        const clsId=res.data.find(({_id})=> _id === id)._id;
        // console.log(clsId);
        if(clsId){
        setClassId(clsId);
        }
      }).catch((error) => {
        setError("Error fetching classroom");
        //console.log(error);
      });
      
    }
  }, [userInfo,id]);

  useEffect(() => {
    if (userInfo && classId) {
      const token = new Cookies().get("token");
      axios
        .get(`${URL}/classroom/${classId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSubjects(res.data);
        }).catch((error) => {
          setError("Error fetching subjects");
          //console.log(error);
        });
    }
  }, [userInfo,classId]);

  return (
    <div className="container-fluid">
      <HomeNavbar user={userName} />
      <div className="container-flow">
        <div className="container">
        {/* <Button variant="text" className="button-style"> */}
                <Fab size="large" className="button-style" color="primary" aria-label="add" onClick = {() => window.location = `/class/create-subject/${classId}`}>
                  <AddIcon />
                </Fab>
                <span className="text-style">CREATE SUBJECT</span>
                <h4 className="text-error">{error}</h4>
              {/* </Button> */}
        <div className="row">
            {subjects.map((_subject, index) => {
              if (_subject) {
                return (
                    
                  <div className="custom-container" key={index}>
                      <div className="card card-1">
                        <h3>{_subject.name}</h3>
                        {/* <p>
                          Faculty :{" "}
                          <span className="text-normal">
                            {_subject.ownerId.name}
                          </span>
                        </p> */}
                        <button className="btn glyphicon-play" onClick={() => (window.location = `/class/subject/${_subject._id}`)}>View</button> 
                    </div>
                   
                  </div>
                );
              } else return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;

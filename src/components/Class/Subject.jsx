import axios from "axios";
import UserInfo from "../../library/UserInfo.js";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import HomeNavbar from "../Navbar/Homenavbar";
import IconButton from '@mui/material/IconButton';
//import SendIcon from '@mui/icons-material/Send';
//import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar} from '@mui/material';
import { useParams } from "react-router-dom";
import "../styles/Subject.css";
import FileUpload from "../ClassUploads/FileUpload.jsx";
const URL = process.env.REACT_APP_BACKEND_URL;
const Subject = () => {
    const {id}=useParams();
    const [userInfo, setUserInfo] = useState("");
    const [subject, setSubject] = useState([]);
    const [userName, setUserName] = useState("");
    const [error, setError] = useState(null);
  
    function stringToColor(string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }
    
    function stringAvatar(name) {
      name=(!name)?"Default User":name;
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
      };
    }
    useEffect(() => {
        const token = new Cookies().get("token");
        UserInfo(token).then((res) => {
          if (res) setUserInfo(res);
          else window.location = "/login";
        });
      }, []);

  useEffect(() => {
    const token = new Cookies().get("token");
    axios
      .get(`${URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.name);
      });
  }, []);

  useEffect(() => {
    //console.log(id);
    if(userInfo && id){
    const token = new Cookies().get("token");

    axios.get(`${URL}/subject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubject(res.data);
      }).catch((error) => {
        setError("Error fetching a subject");
        //console.log(error);
      });
      
    }
  }, [userInfo,id]);

    return (
    <>
    <HomeNavbar user={userName} />
    <div className="class">
    <p>{error}</p>
      <div className="class__nameBox">
        <div className="class__name">{subject?.name}</div>
      </div>
      <div className="class__announce">
      <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar {...stringAvatar(userName)} />  
        </IconButton>
        <input
          type="text"
        //   value={announcementContent}
        //   onChange={(e) => setAnnouncementContent(e.target.value)}
          placeholder="Announce something to your class"
        />
        {/* <Button variant="contained" endIcon={<SendIcon />}>
            Send
        </Button> */}
        <FileUpload subjectId={subject._id}/>
      </div>
      {/* {posts?.map((post) => (
        <Announcement
          authorId={post.authorId}
          content={post.content}
          date={post.date}
          image={post.image}
          name={post.name}
        />
      ))} */}
    </div>
    </>
  );
};

export default Subject;

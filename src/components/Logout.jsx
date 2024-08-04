import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./styles/Style1.css" 
const Logout = () => {
  useEffect(() => {
    const token = new Cookies();
    token.remove("token");
    window.location = "/login";
  }, []);
  return (
    <div className="container">
        <div className="wrapper-logout">
            <div className="heading">
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                    <span><h1 className="text-large">Logging out...</h1></span>
                </Box>
            </div>
        </div>
    </div>
  );
};

export default Logout;

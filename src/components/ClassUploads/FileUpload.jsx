import React, { useState } from 'react';
//import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../styles/File.css'
const URL = process.env.REACT_APP_BACKEND_URL;
const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const token = new Cookies().get("token");
      const response = await axios.post(`${URL}/subject/${props.subjectId}/document`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Include authentication headers if necessary
          Authorization: `Bearer ${token}`,
        },
        
      });

      if (response.status === 200) {
        console.log('File uploaded successfully!', response.data);
        setFile('');
        // Handle success response
      } else {
        console.error('Upload failed.');
        // Handle non-200 response
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
            <div>
                <input type="file" onChange={handleFileChange} />
                <Button onClick={handleUpload} disabled={uploading}>
                <CloudUploadIcon/>{uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>
  );
};

export default FileUpload;

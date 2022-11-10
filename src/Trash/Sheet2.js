import { useState,useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL,listAll } from "firebase/storage";
import { Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from "@mui/system";
import axios from 'axios'

function App() {

    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [Datalist,setDatalist] = useState([])
    const [detail,setDetail] = useState([])
    const url = 'gs://uploadfiles-4db5b.appspot.com/files'


    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    const handleUpload = () => {
      
        if(!file){
            toast.error('File is Required!', {
                position: toast.POSITION.TOP_CENTER
            })
        }
              
  
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setPercent(percent);
            },
            (err) => console.log(err),
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    // useEffect(()=>{
    //     listAll(storageRef).then(
    //         (response) =>{
    //              console.log("data--->",response)
    //             response.items.forEach((item)=>{
    //                 getDownloadURL(item).then((url) => {
    //                     setDatalist((prev => [...prev,url]));
    //                 });
    //             });
    //         });
    // },[]);

    useEffect(()=>{
        axios.get('https://docs.google.com/spreadsheets/d/1qq-tHB-Mdh6NxIMH7cLiRK8ZMx7kLEaR/edit#gid=1584255846').then(
            res => console.log(res.data)

        )
    },[])

    return (
        <Box>
           <Grid >
            <input style = {{ padding: '50px 20px 30px', fontSize: '20px'}} type="file" onChange={handleChange} accept="/files/*" />
            <Button sx = {{fontsize: 25}} onClick={handleUpload}>Upload File</Button>
            <Typography  sx ={{fontSize: 25}}>{percent} % done</Typography>
            <ToastContainer />
            </Grid>
            <Grid>
                {Datalist.map((item) => {
                    return 
                           <ul>
                            <li>{item.Name}</li>
                            <li>{item.Email}</li>
                           </ul>

                })}
            </Grid>
        </Box>
    );
}

export default App;
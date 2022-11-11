import { useState } from 'react'
import { Data } from '../components/Data'
import * as XLSX from 'xlsx'
import { Box, Button, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SheetData() {

  
const [errorMessage, setErrorMessage]=useState([]);
  let i = 0;

  const [excelFile, setExcelFile] = useState(null);



  const [excelData, setExcelData] = useState(null);


  const handleFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {

      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {

        setExcelFile(e.target.result);
      }

    }

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);



      for (let i = 0; i < data.length; i++) {

        // if (!data[i].Name || !data[i].Email || !data[i].Mobile || !data[i].Address || !data[i].Country) {
          
        //   console.log(data[i])
        //   data[i].Status = 'Data Missing' 
        //   data[i].Error = 'Error occurs'
        // } else {
        //   data[i].Status = 'Success'
        //   data[i].Error = 'No Error'
        //   console.log("dataaaaaa->",data[i]);
        // }
        
        if(!data[i].Name){
          //let Status = 
          setErrorMessage(errorMessage => errorMessage + 'Name is missing')
          data[i].Status = errorMessage;
          //console.log('Data---->',errorMessage)
         
           
        }
        
        if(!data[i].Email){
          //console.log("email", errorMessage)
          setErrorMessage(errorMessage => errorMessage + "Email is missing")
          data[i].Status = errorMessage;
         
        }
        if(!data[i].Mobile){
          setErrorMessage(errorMessage => errorMessage + "Mobile is missing")
          data[i].Status = errorMessage;
          
        }
        if(!data[i].Address){
          setErrorMessage(errorMessage => errorMessage + "Address is missing")
          data[i].Status = errorMessage;
        

        }
        if(!data[i].Country){
          setErrorMessage(errorMessage => errorMessage + "Counrty is missing")
          data[i].Status = errorMessage;
         

        }
       
    

      }
      setExcelData(data);

    }
    else {
      setExcelData(null);
      toast.error('File not Found !', {
        position: toast.POSITION.TOP_CENTER
      });
    }




  }

  return (

    <Box>

      <Grid >
        <form onSubmit={handleSubmit}>
          <Typography>Upload Excel file</Typography>

          <input type='file' className='form-control'
            onChange={handleFile} />

          <Button type='submit' className='btn btn-success'
            style={{ marginTop: 5 + 'px' }}>Submit</Button>
        </form>
      </Grid>


      <hr></hr>

      <div className='viewer'>
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div>
            <table style={{ padding: '2% 5% 0% 10%' }}>
              <thead >
                <tr>

                  <th style={{ paddingRight: '1%' }} scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Mobile</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Country</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Error</th>

                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />

    </Box>
  );
}

export default SheetData;
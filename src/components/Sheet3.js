import {useState} from 'react'
import {Data} from '../components/Data'
import * as XLSX from 'xlsx'
import { Box, Button, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SheetData() {
  let i = 0;

  const [excelFile, setExcelFile]=useState(null);
 // const [excelFileError, setExcelFileError]=useState(null);  
 const [error,setError] = useState('Yes')
 

  const [excelData, setExcelData]=useState(null);

  //const fileType=['application/vnd.ms-excel'];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    // if(selectedFile){
     //alert('send me details',selectedFile)
     
      if(selectedFile){
        //console.log(selectedFile)
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          //setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
       //alert('send me details')
      }
      // else{
        //setExcelFileError('Please select only excel file types');
      
      // }
    // }
    // else{
    //   console.log('plz select your file');
    // }
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      //console.log('Data-->',data[0].Name)

      // const handleChanges=()=>{

        
        for(let i=0;i<data.length;i++){
          setError(data[i])
          console.log(data[i])
          // if(data[i].Name)
          //return data[i]
        }
      // }

    }
    else{
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
          onChange={handleFile} 
          // required
           />                  
          {/* {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>} */}
          <Button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</Button>
        </form>
      </Grid>

   
      <hr></hr>

      <Grid className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <Grid>
            <table>
              <thead >
                <tr>
                  {/* <th scope='col'>ID</th> */}
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Mobile</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Country</th>
                  <th scope='col'>Status</th>
                  {/* <tr>{error[i].name}</tr> */}
                  <th scope = 'col'>Error</th>
                  {/* <th scope='col'>{status.map((item)=>{
                  })}</th> */}
                          
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}
                />
              </tbody>
            </table>            
          </Grid>
        )}       
      </Grid>
      <ToastContainer />

    </Box>
  );
}

export default SheetData;
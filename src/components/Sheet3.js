import { useState } from 'react'
import { Data } from '../components/Data'
import * as XLSX from 'xlsx'
import { Box, Button, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import paginationFactory from 'react-bootstrap-table2-paginator';




let PageSize = 10;
let array = [];

function SheetData() {

  let i = 0;
  let line = 'No Error';
  const isAnonymous = false;

  const [excelFile, setExcelFile] = useState(null);
  //const [currentPage, setCurrentPage] = useState(1);
  const [excelData, setExcelData] = useState(null);
  const [list, setList] = useState([])
  const [double, setDouble] = useState(false);


  // const colums = [

  //   { name: 'Name', test: 'Name' },
  //   { email: 'Email', test: 'Email' },
  //   { mobile: 'Mobile', test: 'Mobile' },
  //   { address: 'Address', test: 'Address' },
  //   { company: 'Company', test: 'Company' }


  // ]

  const handleClick = event => {
    event.currentTarget.disabled = true;
  };


  const pagenation = paginationFactory({
    page: 1,
    sizePerPage: 10,
    firstPageText: '<<',
    lastPageText: '>>',
    prePageText: '<',
    nextPageText: '>',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page)
      console.log('sizePerPage', sizePerPage)
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page)
      console.log('sizePerPage', sizePerPage)
    }
  });


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


  // const handleClick = event => {
  //   event.setExcelData.disabled = true;
  //   console.log('button clicked');
  // };


  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
     


      for (let i = 0; i < data.length; i++) {
        data[i].Status = 'Active'
        data[i].Error = 'No Error'

        // if (!data[i].Name || !data[i].Email || !data[i].Mobile || !data[i].Address || !data[i].Country) {

        //   console.log(data[i])
        //   data[i].Status = 'Data Missing' 
        //   data[i].Error = 'Error occurs'
        // } else {
        //   data[i].Status = 'Success'
        //   data[i].Error = 'No Error'
        //   console.log("dataaaaaa->",data[i]);
        // }



        // for Email
        if (!data[i].Email) {
          data[i].Status = 'Inactive'
          line = 'Email ID'
          data[i].Error = line
        
        }
        if (!data[i].Name) {
          data[i].Status = 'Inactive'
          line = line + " "+  '&' + " " + 'Name'
          data[i].Error = { line }

        }
        // for Mobile
        if (!data[i].Mobile) {
          data[i].Status = 'Inactive'
          line = line + " "+  '&' + " " + 'Mobile is required'
          data[i].Error = line
        }
        // for Name   
        

        //console.log(array.join(" "))

        // if(!data[i].Email){
        //   //console.log("email", errorMessage)
        //   setErrorMessage(errorMessage => errorMessage + "Email is missing")
        //   data[i].Status = errorMessage;

        // }
        // if(!data[i].Mobile){
        //   setErrorMessage(errorMessage => errorMessage + "Mobile is missing")
        //   data[i].Status = errorMessage;

        // }
        // if(!data[i].Address){
        //   setErrorMessage(errorMessage => errorMessage + "Address is missing")
        //   data[i].Status = errorMessage;


        // }
        // if(!data[i].Country){
        //   setErrorMessage(errorMessage => errorMessage + "Counrty is missing")
        //   data[i].Status = errorMessage;


        // }



      }
      setExcelData(data);
      isAnonymous = true;

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

          <button 
             disabled={isAnonymous ? true : ''}
             type='submit' className='btn btn-success'
            style={{ marginTop: 5 + 'px', backgroundColor: 'skyblue', borderColor: 'skyblue' }}>Submit</button>
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
                <Data  pagenation = {pagenation} excelData={excelData} />


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
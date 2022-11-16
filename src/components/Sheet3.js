//import { Data } from '../components/Data'
import * as XLSX from 'xlsx'
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';



const PageSize = 50;
let search;

function SheetData() {
  

  let i = 0;
  let line = 'No Error';
  const getInitialState = () => {
    const value = "20";
    return value;
  };
  

  const [disable, setDisable] = useState()
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [currentPages, setCurrentPage] = useState(1);
  const [value, setValue] = useState(getInitialState);
  const [filtervalue,setFiltervalue] = useState('')
  const [search, setSearch] = useState(null);
  // const recordsPerPage = useState(10);
  // const indexoflastRecord = currentPage * recordsPerPage;
  // const indexoffirstRecord = indexoflastRecord - recordsPerPage;
  // const currentRecords = data.slice(indexoffirstRecord,indexoflastRecord);
  // const nPages = Math.ceil(data.length / recordsPerPage)




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

  const handleClick = () => {
    setDisable(false);
  };


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

        // for Email
        if (!data[i].Email) {
          data[i].Status = 'Inactive'
          line = 'Required Email ID'
          data[i].Error = line

        }
        // for Name   
        if (!data[i].Name) {
          data[i].Status = 'Inactive'
          line = line + " " + '&' + " " + 'Name'
          data[i].Error = line

        }
        // for Mobile
        if (!data[i].Mobile) {
          data[i].Status = 'Inactive'
          line = line + " " + '&' + " " + 'Mobile'
          data[i].Error = line
        }     

      }
      setExcelData(data);
      setSearch(data);
      setDisable(true);
     

    }
    else {
      setExcelData(null);
      toast.error('File not Found !', {
        position: toast.POSITION.TOP_CENTER
      });
    }

  } 

const handleFilter = (e) =>{
     if(e.target.value == ''){
      setExcelData(search)
     }else{
        const filterResult = search.filter(items => 
           items.Name.includes(e.target.value) ||
           items.Email.includes(e.target.value) ||
           items.Mobile.includes(e.target.value) ||
           items.Address.toLowerCase().includes(e.target.value.toLowerCase()) ||
           items.Country.toLowerCase().includes(e.target.value.toLowerCase())
        
        )
        setExcelData(filterResult)
     }
     setFiltervalue(e.target.value)
}

// const currentPage = () =>{
//   if(currentPage !== nPage){
//     setCurrentPage(currentPage + 1)
//   }
// }

// const prevPage = () => {
//   if(currentPage !== 1) 
//       setCurrentPage(currentPage - 1)
// }

  return (

    <div>

      <div >
        <form onSubmit={handleSubmit}>
          <Typography>Upload Excel file</Typography>

          <input type='file' className='form-control'
            onChange={handleFile} />
          <button
            disabled={disable}
            onClick={handleClick}
            type='submit' className='btn btn-success'
            style={disable ? styles.buttonDisabled : styles.button}
          >Submit</button>
        </form>
      </div>


      <hr></hr>
      <div style={{justifyContent:'space-between'}}>
      <select style={{ padding:'15px'}} value={value}>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
       
      <input
        style={{ top: "0", left: "0" ,padding : '15px 35px',fontSize:'15px'}}
        type = 'text'
        value = {filtervalue}
        onInput={(e)=>handleFilter(e)}
      />

        </div>
      <div className="openbtn text-center">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div>
            <table 
            className="table"
            style={{ padding: '2% 10% 10% 15%' }}>
              <thead style={{border: 'rgb(228, 247, 244)',backgroundColor : 'rgb(228, 247, 244)'}} className="table table-striped table-dark">
                <tr>
                
                  <th scope="row">ID</th>
                  <th scope="row">Name</th>
                  <th scope="row">Email</th>
                  <th scope="row">Mobile</th>
                  <th scope="row">Address</th>
                  <th scope="row">Country</th>
                  <th scope="row">Status</th>
                  <th scope="row">Error</th>
                 
                </tr>
              </thead>
              <tbody>
               
             {excelData.map((items,index) => (
             <tr key = {index} style={{border : 'rgb(243, 212, 212)',backgroundColor : 'rgb(243, 212, 212)',width : '500px'}}>

                    <td>{index+1}</td>
                    <td>{items.Name}</td>
                    <td>{items.Email}</td>
                    <td>{items.Mobile}</td>
                    <td>{items.Address}</td>
                    <td>{items.Country}</td>
                    <td>{items.Status}</td>
                    <td>
                     <ul>
                        <li>{items.Error}</li>
                     </ul>
                     </td>
                    </tr>       

              ))}
              

              
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />

    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 30px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    padding: '10px 30px',
    cursor: 'not-allowed',
  },
};

export default SheetData;
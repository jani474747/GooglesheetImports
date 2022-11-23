import * as XLSX from 'xlsx'
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactPaginate from "react-paginate";
import '../Pagenation.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const PageSize = 10;
let search;
const excelData = undefined;


function SheetData() {


  let i = 0;
  let line = 'No Error';

  const [age, setAge] = React.useState('');


  const {inputRef} = useRef(null);


  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [filtervalue, setFiltervalue] = useState('')
  const [search, setSearch] = useState(null);
  const [order, setOrder] = useState('ASC');
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [testPage, setTestPage] = useState(10);
  const usersPerPage = testPage;
  const pagesVisited = pageNumber * usersPerPage;
  const [clear,setClear] = useState(null);


  const PerPage = page
  const pageCount = excelData ? Math.ceil(excelData.length / usersPerPage) : 0;
  const pagehandler = excelData ? Math.ceil(1 - { excelData } + excelData.length - 1) : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);

  };


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



  // const handleClick = () => {
  //   setDisable(false);
  // };



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
      setExcelData(data)
      setSearch(data);
      // setExcelData(data.slice(0, 500));


    }
    else {
      setExcelData(null);
      toast.error('File not Found !', {
        position: toast.POSITION.TOP_CENTER
      });
    }

  }



  const handleFilter = (e) => {
    if (e.target.value == '') {
      setExcelData(search)
    } else {
      const filterResult = search.filter(items =>
        items.Address.toLowerCase().includes(e.target.value.toLowerCase()) ||
        items.Country.toLowerCase().includes(e.target.value.toLowerCase())

      )
      setExcelData(filterResult)
    }
    setFiltervalue(e.target.value)
  }

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...excelData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setExcelData(sorted)
      setOrder('DSC')

    }
    if (order === 'DSC') {
      const sorted = [...excelData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setExcelData(sorted)
      setOrder('ASC')

    }
    if (order === Number) {
      const sorted = [...excelData].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setExcelData(sorted)
      setOrder('ASC')
    }

  }

  // const inputRef = useRef(null);
  const onButtonClick = () => {
    setExcelData(null)
    // setDisable(false)

  };

  const handleCheck = (a, b) => {
    console.log("Event value", a)

    console.log("Event value", b)
    // setTestPage(val);
  }
  const handleChange = (event) => {
    setAge(event.target.value);
    //console.log("-------->", event.target.value)
    setTestPage(event.target.value);
  };

  return (

    <div>

      <div >
        <form onSubmit={handleSubmit}>
          <Typography>Upload Excel file</Typography>

          <input ref={inputRef} type='file'
            style={{ maxWidth: '500px', margin: 'auto' }} accept='.xlsx' className='form-control'
            onChange={handleFile} />
          <div style={{ marginTop: "2%" }}>

            <button
              // disabled={disable}
              // onClick={handleClick}
              type='submit' className='btn btn-success'
            // style={disable ? styles.buttonDisabled : styles.button}
            >Submit</button>

            <button className='btn btn-danger' style={{ marginLeft: '2%' }}
              onClick={onButtonClick}
              type="reset" value="Reset"
              >Clear</button>
          </div>
        </form>
      </div>


      <hr></hr>
      <div style={{display : 'flex',justifyContent: 'space-between' }}>

        <FormControl style = {{width : '10%'}}>
          <InputLabel id="demo-simple-select-label">Rows</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Rows"
            onChange={handleChange}
          >
            
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={150}>150</MenuItem>
            <MenuItem value={250}>250</MenuItem>
            <MenuItem value={500}>All</MenuItem>
          </Select>
        </FormControl>
        
        <input
          style={{ top: "0", left: "0", padding: '15px 35px', fontSize: '15px' }}
          type='text'
          value={filtervalue}
          placeholder = 'Search'
          onInput={(e) => handleFilter(e)}
        />
         
      </div>
      <div className="openbtn text-center">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (

          <div>
            <table
              className="table"
              style={{ padding: '2% 10% 10% 15%' }}>
              <thead style={{ border: 'rgb(228, 247, 244)', justifyContent: 'space-between', backgroundColor: 'rgb(228, 247, 244)' }} className="table table-striped table-dark">
                <tr>

                  <th scope="row"><button style={{ border: 'transparent', color: 'white' }}>ID</button></th>
                  <th scope="row"><button
                    onClick={() => sorting("Name")} style={{ border: 'transparent', color: 'white' }}>Name</button></th>
                  <th scope="row"><button
                    style={{ border: 'transparent', color: 'white' }}>Email</button></th>
                  <th scope="row"><button
                    style={{ border: 'transparent', color: 'white' }}>Mobile</button></th>
                  <th scope="row"><button
                    onClick={() => sorting('Address')} style={{ border: 'transparent', color: 'white' }}>Address</button></th>
                  <th scope="row"><button
                    onClick={() => sorting('Country')} style={{ border: 'transparent', color: 'white' }}>Country</button></th>
                  <th scope="row"><button style={{ border: 'transparent', color: 'white' }}>Status</button></th>
                  <th scope="row"><button style={{ border: 'transparent', color: 'white', marginLeft: '5%' }}>Error</button></th>

                </tr>
              </thead>
              <tbody>
                {/* <Pagination */}
                {
                  // ((rowsPerPage > 0
                  //   ? excelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  //   : excelData
                  // ))
                    excelData.slice(pagesVisited, pagesVisited + usersPerPage).map((items, index) => (
                      <tr key={index} style={{ border: 'rgb(243, 212, 212)', backgroundColor: 'rgb(243, 212, 212)', width: '500px' }}>
                        <td>{index + 1}</td>
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
            <div style={{ display: 'flex' }}>
              <h4 style={{ marginLeft: '5%' }}> 1 - {testPage} of {excelData.length}</h4>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}

              />
            </div>
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
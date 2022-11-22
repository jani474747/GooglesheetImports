//import { Data } from '../components/Data'
import * as XLSX from 'xlsx'
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomTablePagination } from './customtable'
import { useRef } from 'react'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactPaginate from "react-paginate";
import '../Pagenation.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import TablePagination from "@material-ui/core/TablePagination";
// import ReactTable from 'react-table'




const PageSize = 10;
let search;
// const fromDb = undefined;
// const str = fromDb || '';
const excelData = undefined;


function SheetData() {


  let i = 0;
  let line = 'No Error';
  // const getInitialState = () => {
  //   const value = "10";
  //   return value;
  // };
  const [age, setAge] = React.useState('');

  //const refresh = useRef(null)
  const inputRef = useRef(null);


  // const [disable, setDisable] = useState()
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  // const [value, setValue] = useState(getInitialState);
  const [filtervalue, setFiltervalue] = useState('')
  const [search, setSearch] = useState(null);
  const [order, setOrder] = useState('ASC');
  const [currentPage, setCurrentPage] = useState(1);
  const [Perpage, setPerpage] = useState()
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);



const [testPage, setTestPage]=useState(10);

  const usersPerPage = testPage;
  const pagesVisited = pageNumber * usersPerPage;
  const PerPage = page


  const pageCount = excelData ? Math.ceil(excelData.length / usersPerPage) : 0;

  const pagehandler = excelData ? Math.ceil(1 - { PerPage } + excelData.length - 1) : 0;

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



  const handleClick = () => {
    // setDisable(false);
  };


  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
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
      //console.log(data)
      // console.log(data.slice(0,50))
      setExcelData(data)
      //setPerpage(data.slice(0,50))
      setSearch(data);
      // pagenationFunc()
      setExcelData(data.slice(0, 500));
      // setPageSize(data)
      //setDisable(true);


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
      //console.log(search)
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
    inputRef.current.value = "";
    const rows = [...excelData];
    rows.splice(excelData, 1);
    setExcelData(rows);
  };

  const handleCheck=(a,b) => {
    console.log("Event value", a)
    
    console.log("Event value", b)
    // setTestPage(val);
  }
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log("-------->", event.target.value)
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
              onClick={handleClick}
              type='submit' className='btn btn-success'
            // style={disable ? styles.buttonDisabled : styles.button}
            >Submit</button>

            <button className='btn btn-danger' style={{ marginLeft: '2%' }}
              onClick={onButtonClick}
              type='clear' >Clear</button>
          </div>
        </form>
      </div>


      <hr></hr>
      <div style={{ justifyContent: 'space-between' }}>
        <input
          style={{ top: "0", left: "0", padding: '15px 35px', fontSize: '15px' }}
          type='text'
          value={filtervalue}
          onInput={(e) => handleFilter(e)}
        />

      </div>
      <div className="openbtn text-center">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (

          <div>
            {/* <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            > Show Per Page
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select> */}

            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>10</MenuItem>
    <MenuItem value={20}>20</MenuItem>
    <MenuItem value={30}>30</MenuItem>
  </Select>
</FormControl>

            {/* <CustomTablePagination
              // rowsPerPageOptions={[20, 30, 40, 50, { label: 'All', value: -1 }]}
               rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
              colSpan={3}
              count={excelData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              // onRowsPerPageChange={handleChangeRowsPerPage}
              onRowsPerPageChange={()=>{
                handleCheck(
                   page, rowsPerPage);
              }}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}


            <table
              className="table"
              style={{ padding: '2% 10% 10% 15%' }}>
              <thead style={{ border: 'rgb(228, 247, 244)', justifyContent: 'space-between', backgroundColor: 'rgb(228, 247, 244)' }} className="table table-striped table-dark">
                <tr>

                  <th scope="row"><button style={{ border: 'transparent', color: 'white' }}>ID</button></th>
                  <th scope="row"><button
                    onClick={() => sorting("Name")} style={{ border: 'transparent', color: 'white' }}>Name</button></th>
                  <th scope="row"><button
                    // onClick={()=> sorting('Email')}
                    style={{ border: 'transparent', color: 'white' }}>Email</button></th>
                  <th scope="row"><button
                    // onClick={()=> sorting('Mobile')}
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
                  ((rowsPerPage > 0
                    ? excelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : excelData
                  ))
                .slice(pagesVisited, pagesVisited + usersPerPage).map((items, index) => (
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
              <h4 style={{ marginLeft: '5%' }}> 1 - {pagehandler} of {excelData.length}</h4>
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
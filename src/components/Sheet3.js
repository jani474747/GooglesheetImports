//import { Data } from '../components/Data'
import * as XLSX from 'xlsx'
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useMemo, useState } from 'react';
// import UsePagination from '../components/UsePagination';
// import Pagenation from './TableData';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Pagination from './Pagenation';
// import axios from 'axios';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import * as ReactBootStrap from 'react-bootstrap'
// import { CustomTablePagination } from './customtable'
import { useRef } from 'react'
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactPaginate from "react-paginate";
import '../Pagenation.css'





const PageSize = 10;
let search;
// const fromDb = undefined;
// const str = fromDb || '';
const excelData = undefined;


function SheetData() {


  let i = 0;
  let line = 'No Error';
  const getInitialState = () => {
    const value = "20";
    return value;
  };
  //const refresh = useRef(null)
  const inputRef = useRef(null);


  // const [disable, setDisable] = useState()
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [value, setValue] = useState(getInitialState);
  const [filtervalue, setFiltervalue] = useState('')
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState([])
  const [order, setOrder] = useState('ASC');
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [Perpage, setPerpage] = useState()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [user, setUser] = useState(excelData.slice(0, 50))
  const [pageNumber, setPageNumber] = useState(0);


  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

 
  const pageCount = excelData ? Math.ceil(excelData.length / usersPerPage) : 0;
  
  const pagehandler = excelData ? Math.ceil( 1 - pageCount + excelData.length -1) : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  // const [postsPerPage, setPostsPerPage] = useState(8);

  // const Pages = ({ excelData }) => {
  //   const [
  //     totalPages,
  //     startPageIndex,
  //     endPageIndex,
  //     currentPageIndex, //eslint-disable-line
  //     displayPage,
  //   ] = usePagination(5, excelData.length);

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
      console.log(data)
      // console.log(data.slice(0,50))
      setExcelData(data)
      //setPerpage(data.slice(0,50))
      setSearch(data);
      // pagenationFunc()
      // setExcelData(data.slice(0, 500));
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

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - excelData.length) : 0;


  //   const handleChangePage = (
  //     event: React.MouseEvent<HTMLButtonElement> | null,
  //     newPage: number,
  //   ) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (
  //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   ) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };






  // const inputRef = useRef(null);
  const onButtonClick = () => {
    inputRef.current.value = "";
    const rows = [...excelData];
    rows.splice(excelData, 1);
    setExcelData(rows);
  };



  // Avoid a layout jump when reaching the last page with empty rows.


  // const currentTableData = useMemo(() =>{
  //   const firstpage = (currentPage - 1) * PageSize;
  //   const lastpage = firstpage + PageSize;

  //    if(firstpage === '' || lastpage == ''){
  //     setExcelData(loading)
  //    }else{
  //     setLoading.slice(firstpage,lastpage)
  //    }
  //     
  //    //return excelData.slice(firstpage , lastpage); 

  // },[currentPage])

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
        {/* <CustomTablePagination
          //rowsPerPageOptions={[10, 50, 150, 250, { label: 'All', value: -1 }]}
          // colSpan={3}
          rowsPerPage={rowsPerPage}
          // slotProps={{
          //   // select: {
          //   //   'aria-label': 'rows per page',
          //   // },

          // }}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
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
            <table
              className="table"
              style={{ padding: '2% 10% 10% 15%' }}>
              <thead style={{ border: 'rgb(228, 247, 244)', justifyContent: 'space-between', backgroundColor: 'rgb(228, 247, 244)' }} className="table table-striped table-dark">
                <tr>

                  <th scope="row"><button style={{ border: 'transparent', color: 'white'}}>ID</button></th>
                  <th scope="row"><button
                    onClick={() => sorting("Name")} style={{ border: 'transparent', color: 'white' }}>Name</button></th>
                  <th scope="row"><button
                    // onClick={()=> sorting('Email')}
                    style={{ border: 'transparent', color: 'white'}}>Email</button></th>
                  <th scope="row"><button
                    // onClick={()=> sorting('Mobile')}
                    style={{ border: 'transparent', color: 'white' }}>Mobile</button></th>
                  <th scope="row"><button
                    onClick={() => sorting('Address')} style={{ border: 'transparent', color: 'white'}}>Address</button></th>
                  <th scope="row"><button
                    onClick={() => sorting('Country')} style={{ border: 'transparent', color: 'white'}}>Country</button></th>
                  <th scope="row"><button style={{ border: 'transparent', color: 'white' }}>Status</button></th>
                  <th scope="row"><button style={{ border: 'transparent', color: 'white', marginLeft: '5%' }}>Error</button></th>

                </tr>
              </thead>
              <tbody>
                {/* <Pagination */}
                {/* {
                  ((rowsPerPage > 0
                    ? excelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : excelData
                  ))*/}
                {excelData .slice(pagesVisited, pagesVisited + usersPerPage).map((items, index) => (
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
                {/* {emptyRows > 0 && (
                  <tr style={{ height: 41 * emptyRows }}>
                    <td colSpan={3} />
                  </tr>
                )} */}
              </tbody>

{/* 
              <CustomTablePagination
                //  rowsPerPageOptions={[10, 50, 150, 250, { label: 'All', value: -1 }]}
                // colSpan={3}
                 count={excelData.length}
                 rowsPerPage={rowsPerPage}
                page={page}
               
                 onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
              />
 */}

            </table>
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
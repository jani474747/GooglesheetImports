import { Data } from '../components/Data'
import * as XLSX from 'xlsx'
import { Box, Grid, listClasses, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useMemo, useEffect } from 'react';
import { TableHeader, Search } from "../components/pages";
import { Stack, Pagination } from '@mui/material';
import axios from 'axios';
import { Table, Input } from "antd";
import useTableSearch from './TableData'
import { userColumns } from "./column";
import { KeySharp } from '@mui/icons-material';
// import excelData from './Data'



const PageSize = 50;
let search;

function SheetData() {
  
  const { Search } = Input;
  let i = 0;
  let line = 'No Error';
  const getInitialState = () => {
    const value = "20";
    return value;
  };


  const [totalItems, setTotalItems] = useState(0)
  const [comments, setComments] = useState([]);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [disable, setDisable] = useState()
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [search, setSearch] = useState('')
  const [index,setIndex] = useState('')
  const [data, setData] = useState([])
  const [value, setValue] = useState(getInitialState);
  //const [loading, setLoading] = useState(true);
  const [recordsPerPage] = useState(10);
  const [query,setQuery] = useState('')
  const [searchVal, setSearchVal] = useState(null);

  // const { filteredData, loading } = useTableSearch({
  //   searchVal,
  //   retrieve: excelData
  // });




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

 
  // const excelData = {
  //   nodes : list.filter((item)=>
  //     item.name.toLowerCase().includes(search.toLowerCase())
  //   )
  // }




  // const commentsData = useMemo(() => {
  //   let excelData = comments;


  //   if (Search) {
  //     excelData = excelData.filter(
  //         (comment) =>
  //             comment.Name.toLowerCase().includes(Search.toLowerCase()) ||
  //             comment.Email.toLowerCase().includes(Search.toLowerCase()) ||
  //             comment.Mobile.toLowerCase().includes(Search.toLowerCase()) ||
  //             comment.Address.toLowerCase().includes(Search.toLowerCase()) ||
  //             comment.Country.toLowerCase().includes(Search.toLowerCase()) 
  //     );
  // }


  //   if (sorting.TableExcelData) {
  //     const reversed = sorting.order === 'asc' ? 1 : -1;
  //     excelData = excelData.sort(
  //       (a, b) => reversed * a[sorting.Name].localCompare(b[sorting.Country])
  //     );
  //   }




  //   setTotalItems(excelData.length);


  //   return excelData.slice(
  //     (currentPage - 1) * PageSize,
  //     (currentPage - 1) * PageSize + PageSize
  //   );

  // }, [comments, currentPage, sorting]);

  //console.log(commentsData)

//Pagenation

// const indexOfLastRecord = currentPage * recordsPerPage;
// const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
// const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
// const nPages = Math.ceil(data.length / recordsPerPage)
// const url = ''

// useEffect(() => {
//   axios.get(url)
//       .then(res => {
//               setData(res.data);
//               setLoading(false);
//           })
//           .catch(() => {
//               console.log('There was an error while retrieving the data')
//           })
// }, [])


var keys = ['Name','Email','Mobile','Address','Country']
const search = (excelData) => {
  return excelData.filter(
    (item) =>
    keys.some((key) => item[key].toLowerCase().includes(query) ||
   item[key].toLowerCase().includes(query) ||
   item[key].toLowerCase().includes(query) ||
   item[key].toLowerCase().includes(query) ||
   item[key].toLowerCase().includes(query))
   );

}

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
      //console.log('data->',data)
      setDisable(true);



    }
    else {
      setExcelData(null);
      toast.error('File not Found !', {
        position: toast.POSITION.TOP_CENTER
      });
    }

  } 

 

  

 

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

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
            //style={{ marginTop: 5 + 'px', backgroundColor: 'skyblue', borderColor: 'skyblue' }}
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
        placeholder="Search"
        enterButton
        style={{ top: "0", left: "0" }}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

        </div>
      <div className="openbtn text-center">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div>
            <table 
            className="table"
            style={{ padding: '2% 10% 10% 15%' }}>
              {/* <TableHeader
                // headers={headers}
                excelData={excelData}
                onSorting={(Name, order) =>
                  setSorting({ Name, order })
                } */}
              {/* /> */}
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
                <Data excelData={search(excelData)} />
                {/* <Pagination
                  total={totalItems}
                  itemsPerPage={PageSize}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                /> */}
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










 // if (!data[i].Name || !data[i].Email || !data[i].Mobile || !data[i].Address || !data[i].Country) {

        //   console.log(data[i])
        //   data[i].Status = 'Data Missing' 
        //   data[i].Error = 'Error occurs'
        // } else {
        //   data[i].Status = 'Success'
        //   data[i].Error = 'No Error'
        //   console.log("dataaaaaa->",data[i]);
        // }

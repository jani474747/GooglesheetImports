import Pagination from "@mui/material/Pagination";
// import { usePagination } from "../hooks/";
import * as XLSX from 'xlsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {usePagination , displayPage} from '../hooks/Pagenation'







//data



// import Pagination from './TableData';
const PageSize = 10;
// let search;
// const fromDb = undefined;
// const str = fromDb || '';
// const excelData = undefined;


// function SheetData() {

  
  let i = 0;
  let line = 'No Error';
  const getInitialState = () => {
    const value = "20";
    return value;
  };

// let displayPage = 1;


  const Pages = () => {

  const [disable, setDisable] = useState()
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [value, setValue] = useState(getInitialState);
  const [filtervalue, setFiltervalue] = useState('')
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [player,setPlayer] = useState([])
  const [order,setOrder] = useState('ASC');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [Perpage,setPerpage] = useState()
  // const [postsPerPage, setPostsPerPage] = useState(8);

  // const Pages = ({ excelData }) => {
  
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
      // console.log(data.slice(0,50))
      setExcelData(data)
      //setPerpage(data.slice(0,50))
      setSearch(data);
      // pagenationFunc()
      //setExcelData(data.slice(0,50));
      setDisable(true);
      
      
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

  const sorting = (col)=>{
    if(order === 'ASC'){
      const sorted = [...excelData].sort((a,b) => 
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setExcelData(sorted)
      setOrder('DSC')
  
    }
    if(order === 'DSC'){
      const sorted = [...excelData].sort((a,b) => 
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setExcelData(sorted)
      setOrder('ASC')
  
    }
    if(order === Number){
      const sorted = [...excelData].sort((a,b)=>
      a[col] > b[col] ? 1 : -1
      );
      setExcelData(sorted)
      setOrder('ASC')
    }
  
  }
  
  //pagenation data
  const pageHandler = (pageNumber) =>{


    if(pageNumber == ''){
      setExcelData(loading)
    }else{
      loading(excelData.slice((pageNumber*50)-50,pageNumber*50))
      console.log('data-->',loading)
    }
    // if(!excelData){
    //   // setLoading()
    //    setExcelData(loading)
    //   return 'no file found'
    //   //console.log('data-->',excelData)
    //   //alert('Data',loading)

    // }else{
    //    //setExcelData(excelData.slice((pageNumber*50)-50,pageNumber*50))
    //   setLoading(excelData.slice((pageNumber*50)-50,pageNumber*50))
    // }
}


const [
    totalPages,
    startPageIndex,
    endPageIndex,
    // currentPageIndex, 
    displayPage,
  ]=usePagination(5, excelData.length);

 


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



//ending





  return (
    <div style={{ marginLeft: "20px" ,}}>
      {(() => {
        const displayPosts = [];
        for (let i = startPageIndex; i <= endPageIndex; i++) {
          displayPosts.push(
            <div key={excelData[i].ID}>
               {excelData !== null && (

<div>
  <table
    className="table"
    style={{ padding: '2% 10% 10% 15%' }}>
    <thead style={{ border: 'rgb(228, 247, 244)',justifyContent : 'space-between', backgroundColor: 'rgb(228, 247, 244)' }} className="table table-striped table-dark">
      <tr>

        <th scope="row"><button style = {{color: 'white',marginLeft:'15%'}}>ID</button></th>
        <th scope="row"><button 
        onClick={()=> sorting("Name")} style = {{color: 'white',marginLeft:'15%'}}>Name</button></th>
        <th scope="row"><button 
        // onClick={()=> sorting('Email')}
         style = {{color: 'white',marginLeft:'25%'}}>Email</button></th>
        <th scope="row"><button 
        // onClick={()=> sorting('Mobile')}
         style = {{color: 'white',marginLeft:'25%'}}>Mobile</button></th>
        <th scope="row"><button 
        onClick={()=> sorting('Address')} style = {{color: 'white',marginLeft:'15%'}}>Address</button></th>
        <th scope="row"><button 
        onClick={()=> sorting('Country')} style = {{color: 'white',marginLeft:'30%'}}>Country</button></th>
        {/* <th scope="row">Name</th>
        <th scope="row">Email</th>
        <th scope="row">Mobile</th>
        <th scope="row">Address</th>
        <th scope="row">Country</th>
         */}
         <th scope="row"><button style = {{color: 'white'}}>Status</button></th>
         <th scope="row"><button style = {{color: 'white',marginLeft:'40%'}}>Error</button></th>

      </tr>
    </thead>
    <tbody>
    {/* <Pagination */}
    {
      
    excelData.map((items, index) => (
      
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

      )) }
    </tbody>
    {/* <Pagenation 
    className = 'pagenation-bar'
    currentPage = {currentPage}
    totalCount = {excelData.length}
    PageSize = {PageSize}
    onPageChange = {page => setCurrentPage(page)}

    /> */}
    {/* <Pages  excelData = {excelData} */}
      
     {/* /> */}
  </table>
</div>
)}
             
             
            </div>
          );
        }
        return displayPosts;
      })()}
      <Pagination
        color="primary"
        count={totalPages == null}
        style = {{display:'flex'}}
        onChange={(event, value) => displayPage(value)}
      />
    </div>
  );
};

export default Pages
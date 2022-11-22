import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';

const TableData = ({excelData, pageHandler}) => {
    let pageNumber = [ ];
    let line = "";
    for(let i=1;i<Math.ceil(excelData.length/50)+1;i++){
         pageNumber.push(i)
         
    }
  return (
    <div>
     
     <center>
        {pageNumber.map(page =>
          <div className="btn-toolbar" style = {{ cursor:'pointer',backgroundColor:'grey'}} 
          onClick = {()=>pageHandler(page)}
          >{page}</div>)}
     </center>

    </div>
  )
}

export default TableData
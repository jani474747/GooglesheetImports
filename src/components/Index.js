 const SerialNumberColumn = {
    Header: "Sr No", // label of header
    id: "row", 
    maxWidth: 50,
    filterable: false,  
    Cell: (row) => {
      let {pageIndex} = row.state; // get current page index (1 - n)
      let {index} = row.cell.row;  // get current row number (0 - 9)
      let srNo = ``;

      if(pageIndex === 1){
        srNo = index + 1;
      // 1, 2, 3, 4,
     // as index starts from 0

      }else{
        if(index === 9){
          srNo = `${pageIndex}0`;
       // in case of 20, 30, 40, 50
        }else{
          srNo = `${pageIndex - 1}${index + 1}`;
       // for others such as 11, 12, 13, 41, 42, ..., n
        }
      }
         return <div>{srNo}</div>;
    }
};
export default SerialNumberColumn
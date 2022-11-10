import React from 'react'

export const TableData = ({TableExcelData}) => {
    return (
        <>
            {/* <th>{TableExcelData.Id}</th> */}
            <th>{TableExcelData.Name}</th>
            <th>{TableExcelData.Email}</th>
            <th>{TableExcelData.Mobile}</th>
            <th>{TableExcelData.Address}</th>
            <th>{TableExcelData.Country}</th>
            <th>{TableExcelData.Status}</th>
            <th>{TableExcelData.Error}</th>
           
            
            
        </>
    )
}

// export default TableData
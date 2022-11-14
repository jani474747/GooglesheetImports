import React from 'react'
import line from './Sheet3'

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
            <th>
                {
                <ul>
                <li>{TableExcelData.Error}</li>
                {/* <li>{TableExcelData.Error}</li> */}
                </ul>
                }
                </th>
           
            
            
        </>
    )
}

// export default TableData
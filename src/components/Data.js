import React from 'react'
import { TableData } from '../components/TableData'

export const Data = ({excelData}) => {
    return excelData.map((TableExcelData)=>(
         <tr key={TableExcelData.Id}>
            <TableData TableExcelData={TableExcelData}/>
         </tr>        
    ))
}

// export default Data
import React from 'react'
import { TableData } from '../components/TableData'

export const Data = ({excelData}) => {
    return excelData.map((TableExcelData)=>(
         <tr key={TableExcelData.Id}>
            <TableData style = {{justifyContent : 'space-between'}} TableExcelData={TableExcelData}/>
         </tr>        
    ))
}

// export default Data
import React,{useState} from 'react'
import { TableData } from '../components/TableData'
// import commentsData from './Sheet3'



export const Data = ({ excelData }) => {
    //const [Search , setSearch] = useState('')

   return excelData.map((items,index) => (
         <tr key = {index} style={{border : 'rgb(243, 212, 212)',backgroundColor : 'rgb(243, 212, 212)',width : '500px'}}>
            {/* <TableData TableExcelData={TableExcelData}/> */}

                    <td>{index+1}</td>
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

   ))

}


// .filter(excelData =>excelData.Country.toLowerCase().include(Search.toLocaleLowerCase()))
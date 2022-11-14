import React from 'react'
import { TableData } from '../components/TableData'


export const Data = ({excelData}) => {
 
   // const [currentPage , setCurrentPage] = useState(1)


    return excelData.map((TableExcelData)=>(
         <tr key={TableExcelData.Id}>
            <TableData style = {{justifyContent : 'space-between'}} TableExcelData={TableExcelData}/>
         </tr>       

            //    <Stack spacing={2} >
            //       <Pagination 
            //         key={TableExcelData.Id}
            //         count={10}
            //         renderItem={(TableExcelData) => (
            //           <TableData
            //             style = {{justifyContent : 'space-between'}}
            //             slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            //             {...TableExcelData}
            //           />
            //         )}
            //       />
            //     </Stack>
    ))

}


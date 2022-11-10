// import React, {useState} from 'react'
// import { storage } from '../firebase'
// import { ref, uploadBytes } from 'firebase/storage'
// import { v4 } from 'uuid';
// import Button from '@mui/material/Button';



// const Sheets = () => {
// const [upload,setUpload] = useState(null)
//     const uploadfile = () => {
//         if(upload == null) return ;
//         const uploadRef = ref(storage, `file/${upload.name + v4()}`);
//         uploadBytes(uploadRef, upload).then(()=>{
//             alert('File uploaded Successfully')
//         })
//     }


//   return (
//     <div>
//         <input type = 'file' onChange={(e)=>setUpload(e.target.files[0])}/>
//         <Button  onClick={uploadfile}>Upload File</Button >
//     </div>
//   )
// }

// export default Sheets
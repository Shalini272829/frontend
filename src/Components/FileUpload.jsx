import React, { useState } from "react";
import axios from 'axios';
function FileUpload(){

    const [file,setFile]=useState(null);
    const handlefilechange=(event)=>{
        const files=event.target.files;
        if(files.length>0){
            setFile(files[0]);
        }
        else{
            setFile(null);
        }
    }
    const handleSubmit=()=>{
        const formData=new FormData();
        formData.append('file',file);

        if(file){
            axios.post("http://localhost:8091/public/fileupload",formData,
                {
                    headers:{"Content-Type":'multipart/form-data'}
                }
            )
            .then(response=>response.data)
            .then(console.log(response))
        }
    }

    const handleDownload=async()=>{
        const filename="images.png"
       await axios.get(`http://localhost:8091/public/filedownload/${filename}`,
            {responseType:'blob'}
        ).then((obj)=>{console.log(obj.data)
        const url=window.URL.createObjectURL(obj.data);
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',"invoicebill.png");
        link.setAttribute('target','__blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        })

      
        
    }
    return(
        <>
        <input type="file" onChange={handlefilechange} />
        <button onClick={handleSubmit}>Upload</button>
        <button onClick={handleDownload}>Download</button></>

    )
}

export default FileUpload;
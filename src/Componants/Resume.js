import React, { useState } from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Styles/resume.css"
import { FaCloudUploadAlt } from "react-icons/fa";
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"



function Resume({ resumeValue}) {
  // const [buttonDisabled, setButtonDisabled]= useState(false)
   const [resume, setResume]= useState()
  const toast= useToast()
  const token= localStorage.getItem("token")
  
  const handleResumeUpdate=async ()=>{ 
    console.log(resume.type)

    

    
    if(!navigator.onLine){
      addToast("Your are offline!", 'Please check your internet connection !', 'warning')
    }else{

    
      try{
    const response=  await fetch("http://localhost:5000/api/candidate/profile/add_resume",{
      method:"POST",
      body:JSON.stringify({resume:resume, token:token}),
      headers:{
        "Content-type":"application/json"
      }

    })
    if(!response.ok){
      console.log(response)
      console.log(response.statusText)
      addToast("Resume Not Uploaded", response.statusText,"error")
      throw new Error(response.statusText)
    }else{
      const data=  response.json()
      console.log(data)
      addToast("Updated Successfully", " Resume Updated Successfully", "success")
    }

  }catch(err){
    console.log(err)

  }
}
   
  }    
  //  console.log(resumeValue)
   
  const addToast=(title,message="", status)=>{
    toast({
      title: title,
      description: message,
      status: status,
      duration: 10000,
      isClosable: true,
    })
  }
  


  return (
    <div className='bg-light rounded-3 mx-auto  p-3 p-sm-3 p-md-3 p-lg-5  shadow resume'>
      <div className='d-flex justify-content-between resume-header'>  
        <div>
          <Link  className='fw-bold  '>{resumeValue}</Link> <br></br>
          <span className='fw-light'>Uploaded on aug 06, 2024 {resumeValue}</span>
        </div>
        <div className='d-flex justify-content-end'>
        <span className='text-primary btn download-btn rounded-circle   '> <CiSaveDown2  className='mt-1 fs-5 '/></span>
        <span className='text-primary btn delete-btn  rounded-circle  '><RiDeleteBin6Line className='mt-1 fs-5 ' /> </span>
        </div>    
      </div>
   <div className='resume-content p-5 mx-auto d-flex justify-content-center  flex-column ' >
    <input type='file' onChange={(e)=>{setResume(e.target.value)}}  accept='.pdf' className='upload-resume mx-auto' />
    <span className='text-secondary resume-placeholder mx-auto'>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</span>
    { resume === undefined ?
    <button  disabled  className='  btn btn-outline-primary upload-btn mx-auto mt-4 d-flex justify-content-around'> <span className='mt-1'> <FaCloudUploadAlt /></span> <span className='ms-2'> Upload</span></button>:
    <button   className='  btn btn-outline-primary upload-btn mx-auto mt-4 d-flex justify-content-around' onClick={handleResumeUpdate}> <span className='mt-1'> <FaCloudUploadAlt /></span> <span className='ms-2'> Upload</span></button>

    }
   </div>

      
    </div>
  )
}

export default Resume


Resume.propTypes={
  resumeValue:PropTypes.string

}
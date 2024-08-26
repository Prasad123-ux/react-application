import React, { useState } from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Styles/resume.css"


function Resume() {
  const [resume, seResume]= useState("Prasad-metkar-resume-pdf")



  return (
    <div className='bg-light rounded-3 mx-auto  p-3 p-sm-3 p-md-3 p-lg-5  shadow resume'>
      <div className='d-flex justify-content-between resume-header'>  
        <div>
          <span className='fw-bold  '> {resume}</span> <br></br>
          <span className='fw-light'>Uploaded on aug 06, 2024</span>
        </div>
        <div className='d-flex justify-content-end'>
        <span className='text-primary btn download-btn rounded-circle   '> <CiSaveDown2  className='mt-1 fs-5 '/></span>
        <span className='text-primary btn delete-btn  rounded-circle  '><RiDeleteBin6Line className='mt-1 fs-5 ' /> </span>
        </div>    
      </div>
   <div className='resume-content p-5 mx-auto d-flex justify-content-center  flex-column ' >
    <input type='file'  className=' upload-resume mx-auto' />
    <span className='text-secondary resume-placeholder mx-auto'>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</span>

   </div>

      
    </div>
  )
}

export default Resume

import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../Styles/education.css"
function Education() {
  return (
    <div className='bg-light rounded-3 mx-auto  p-3 p-sm-3 p-md-3 p-lg-5  shadow resume'>
      <div className='education-first d-flex justify-content-between align-items-center'> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon'><MdCastForEducation className='fs-4' /> </span> 
          <div className='ms-4'>
            <span className='d-block'>Add Education Details</span>
            <span className='d-block'> Your school/college details</span> 
          </div>
          
        </div>
        <div className='education-btn'>
          <button className='btn btn-outline-info'>  <IoMdAdd /> <span> Add new</span> </button>
        </div>

      </div>
      
      
    </div>
  )
}

export default Education

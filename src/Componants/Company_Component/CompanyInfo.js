import React from 'react' 
import "../../Styles/companyInfo.css" 
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa"; 
import { Link } from 'react-router-dom'; 
import { TbWorld } from "react-icons/tb";

export default function CompanyInfo() {
  return (
    <div className='companyInfo-info shadow  mx-auto'>   

    <span className='fs-6 fw-medium text-info'>More Information</span> 

    <div className='row mx-auto'>
<div className='col-md-6  col-12 mt-2 '><span className='fw-medium'>Company Size</span>:<span className='text-secondary'> 1000</span></div> 
<div className='col-md-6  col-12 mt-2'><span className='fw-medium'>Company Establishment</span>:<span className='text-secondary'> 2007</span></div>  
<div className='col-md-6 col-12 mt-2'><span className='fw-medium'>Company Owner</span>:<span className='text-secondary'> Prasad Metkar</span></div>  
<div className='col-md-6 col-12 mt-2'><span className='fw-medium'>Company Mail</span>:<span className='text-secondary'>prasadmetkar333@gmail.com</span></div>         



<div className='d-flex justify-content-end mt-5 col-4 mx-auto'> 
      <Link>
    <FaFacebookSquare className='text-primary fs-3 company-icon'   style={{"width":"50px"}}/>  </Link> 
   <Link>  <FaLinkedin className='text-primary fs-3 company-icon'  style={{"width":"50px"}} /></Link> 
    <Link><FaTwitterSquare   className='text-primary fs-3 company-icon'  style={{"width":"50px"}} /></Link>
    <Link><TbWorld    className='text-primary fs-3 company-icon'  style={{"width":"40px"}} /></Link>     

    </div>


    </div> 
   

    


      
    </div>
  )
}

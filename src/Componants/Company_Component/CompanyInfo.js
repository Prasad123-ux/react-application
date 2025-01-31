import React from 'react' 
import "../../Styles/companyInfo.css" 
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa"; 
import { Link } from 'react-router-dom'; 
import { TbWorld } from "react-icons/tb";

export default function CompanyInfo({owner, year, size, mail, twitter, linkedin, website, facebook}) {
  return (
    <div className='companyInfo-info shadow  mx-auto'>   

    <span className='fs-6 fw-medium text-info'>More Information</span> 

    <div className='row mx-auto'>
      {size ?
<div className='col-md-6  col-12 mt-2 '><span className='fw-medium'>Company Size</span>:<span className='text-secondary'> {size}</span></div>:"" }
{year ?<div className='col-md-6  col-12 mt-2'><span className='fw-medium'>Company Establishment</span>:<span className='text-secondary'>{year}</span></div> :"" }
{owner ?<div className='col-md-6 col-12 mt-2'><span className='fw-medium'>Company Owner</span>:<span className='text-secondary'>{owner}</span></div>:""  }
{mail ?<div className='col-md-6 col-12 mt-2'><span className='fw-medium'>Company Mail</span>:<span className='text-secondary'>{mail}</span></div>  :""   }    



<div className='d-flex justify-content-end mt-5 col-4 mx-auto'> 
     {facebook ?  <Link to={facebook} > <FaFacebookSquare className='text-primary fs-3 company-icon'   style={{"width":"50px"}}/>  </Link>:"" }
  {linkedin ? <Link to={linkedin}  >  <FaLinkedin className='text-primary fs-3 company-icon' style={{"width":"50px"}} /></Link>:"" }
   {twitter ? <Link to={twitter} ><FaTwitterSquare   className='text-primary fs-3 company-icon'  style={{"width":"50px"}} /></Link>:''}
    {website ?<Link to={website}><TbWorld     className='text-primary fs-3 company-icon'  style={{"width":"40px"}} /></Link>     :""}

    </div>


    </div> 
   

    


      
    </div>
  )
}

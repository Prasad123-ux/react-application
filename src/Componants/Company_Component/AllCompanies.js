import React, { useState } from 'react' 
 import options from "../data.json"  
 import "../../Styles/allCompanies.css" 
 import { FcNext } from "react-icons/fc";

export default function AllCompanies() { 
   const  [title,setTitle]= useState("Actively Hiring Companies ")  
   
   const [companyType, setCompanyType]= useState([])         
   
  return (
    <div className='mt-5'>
        <h1>{title}</h1>
        <div className='bg-secondary d-flex justify-content-center  company-slider mx-auto'> { options.companyType && options.companyType.length>=1?
            options.companyType.map((item, index)=>{
                return <div className='  company-board'> <span className='company-type d-block'>{item} </span>    

                <span className='text-primary  company-number '> 330 Companies </span> <FcNext className='company-next d-inline' /></div>  
            })
          :""  }

        </div>
      
    </div>
  )
}

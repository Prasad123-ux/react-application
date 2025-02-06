import React from 'react' 
import { FcRating } from "react-icons/fc"; 
import "../../Styles/company-card.css" 
import { FcNext } from "react-icons/fc"; 
import { useNavigate } from 'react-router-dom'; 


export default function CompanyCard({name,logo ,id}) {  
    const navigate= useNavigate()
    const handleCompanyProfile=(id)=>{ 
navigate(`/companies/skeleton/companyProfile/${id}`)


    }
  return (
    <div className='company-card shadow d-flex justify-content-center align-items-center' onClick={()=>{handleCompanyProfile(id)}}>   
        <div  className='company-image '> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAiKwSHdLVcWku1Y4GvwXaDV2v9yFYqIYO0CsFdYAgxiQwQv6KPNqfZGorxrCl7oX7Pk&usqp=CAU"  className='side-img' alt="card-image"/>   </div> 
        <div className='company-card-data'>
            <span className='company-Name d-block'> {name}</span> 
            <span > <FcRating className='rating-icon d-inline' />  <span className='rating'>3.8 | 14 reviews</span></span>
            
            
             </div> 
             <div> <FcNext  className=' align-items-center d-inline'/></div>
      
    </div>
  )
}

import React from 'react' 
import "../../Styles/showjobs.css" 
import { FcNext } from "react-icons/fc"; 


export default function ShowJobs(sectors) {
  return (
    <div className='showJobs  mx-auto' >  
    <div className='showJobs-sectors'> <span  className='showJobs-sectorName d-block'>Data Science and Analytics</span> <span className='showJobs-openings text-primary'> 13 Openings  <FcNext  className=' showJobs-next-icon d-inline'/> </span></div>
    
        

         
    </div>
  )
}

import React from 'react' 
import { Text } from '@chakra-ui/react' 
import { useNavigate } from 'react-router-dom' 
import { CiLocationOn, } from "react-icons/ci";


export default function RecommendedJobs({similarJobData,  months, jobData}) {  
    const navigate=useNavigate

    const handleButtonClick=(id)=>{ 
        navigate() 
        navigate(`/job_detail/${id}`)


    }
  return (
    <div className='similar-job  bg-white shadow  p-4 mt-5     style={{"borderRadius":"10px"}}'>
    <Text  className='fw-bolder'>Jobs you might be interested in </Text>
    { similarJobData && similarJobData.length>0  ? Object.entries(similarJobData).filter(([key,value])=>value._id !==jobData._id).map(([key,value])=>{
   return  <button className='similar-particular-job' onClick={()=>{handleButtonClick(value._id)}}>
<div className='fw-bold'>{value.JobTitle}</div>
<span>{value.CompanyEmail}</span>
<div className='mt-2 d-flex justify-content-between'>
 <span className='location'><CiLocationOn className='d-inline' style={{"width":"25px"}}/>  { value.jobLocation && value.JobLocation.length>=1 ? value.JobLocation.slice(0,9) :""}... </span>
 <span className='posted '> Posted: {value.createdAt ? (`${months[new Date(value.createdAt ).getMonth()] } ${new Date(value.createdAt ).toUTCString().slice(5,7)}`):""}</span>
 
</div>
<hr></hr>
</button>
    }):<button>FIND RELATED job</button>
   
        }
       
   
</div>
  )
}

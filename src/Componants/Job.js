import React, { createContext, useEffect, useState } from 'react'
import {Box, HStack, Avatar, VStack,Text, Button} from '@chakra-ui/react'
import './job.css'
import { ViewOffIcon } from '@chakra-ui/icons'
 import {  FaSave} from 'react-icons/fa'  

import { CiLocationOn, } from "react-icons/ci";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsPersonWorkspace } from "react-icons/bs";
import { PiNotepadLight } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'



const UserContext =createContext()   

  export default function Job({href,postedDate, contract_type,category,company_name, title,logo, location, country, employment_type, description,experience,maxSalary,minSalary,qualification , id, onDelete, maxExperience,minExperience, requirement,neededSkills}) {
const months=["jan", "Feb", "March", "April", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"]          




 let monthName=months[new Date(postedDate).getMonth()]
let day=new Date(postedDate).toUTCString().slice(5,7)
console.log(monthName,day)
const [saveValue, setSaveValueJob]=useState("Save")

const token= localStorage.getItem("token")
const navigate=useNavigate()
 
console.log(requirement)




 const [values, setValues] =useState([])
  
 const handleSaveJob= async (key)=>{
try{
  const response = await fetch('http://localhost:5000/api/candidate/save_job', {
    method:"POST",
    body:JSON.stringify({token:token, id:key}),
    headers:{
      "Content-type":"application/json"
    }

  })
  if(!response.ok){
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result=  await response.json()
   console.log(result)
   
  
  setSaveValueJob("Saved")
}catch(err){
  console.log(err)

}



 }



 

  const handleOnDelete=(id)=>{
    console.log(id)
    onDelete(id)
    
  }
  const handleButtonClick=(id)=>{
    navigate(`/job_detail/${id}`)

  }




 

 

  


    
  return (
  <>
    <UserContext.Provider value={{values, setValues}}>
      {/* <Link className='link ' to="/job_detail" > */}
  <button   onClick={()=>{handleButtonClick(id)}}   className='box shadow'  >
      
      <div className=' d-flex justify-content-between flex-column' >
    <HStack justifyContent={{base:'start',md:'start', sm:'start'}}>
    <Avatar className='avatar' size={{base:'sm', sm:'md', md:'md', lg:'md',xl:'md'}}  name={company_name} />
    <span className='title'>{title} </span>
    </HStack >
    <Text className='companyName'>{company_name}</Text>
    <div className='d-flex flex-row justify-content-around mt-2'   >
     <div className='location  d-flex    '> 
       <span><CiLocationOn className='fs-5   ms-5 mt-1 '/></span> <span className=' me-4'>  { location && location.length>1 ? `${location.slice(0,10)}...` :"Not Mentioned"}</span>
       </div>
    <div className='employment-type d-flex '> <span><BsCurrencyRupee  className=' fs-5 ms-5 mt-1'/></span> <span className='me-4'>{maxSalary  && minSalary ?`${minSalary}-${maxSalary} Lacs PA`: "Not Disclosed"}</span></div>
    <div className='experience d-flex ' > <span><BsPersonWorkspace  className='fs-5 ms-5 mt-1'/></span> <span className='me-5 '> { minExperience && maxExperience ? `${minExperience}- ${maxExperience} Yrs`:"0 Yrs"}</span> </div>
    </div>        
    <div className='salary d-flex   ' >
      <span className='w-25 d-inline ms-1  ps-5'><PiNotepadLight className='fs-5 ' /></span><span className=' me-5 '>{ requirement && requirement.length>0  ?` ${requirement[0].EducationalRequirement.slice(0,70)}...`:""  }</span>
    
   
    </div>
    <Text className='d-flex justify-content-around text-secondary fw-bold'>{requirement && requirement.length>0? requirement[0].NeededSkillsAndTechnologies.slice(0,80):"" }</Text>
    <Text className='description ps-5 pe-5' >{ description && description.length>1 ?` ${description.slice(0,150)}...`:""}</Text>


    {/* <HStack justifyContent={{base:'end',sm:'space-evenly',md:'space-evenly'}} mt={{base:'2', sm:'7',md:'10', lg:'10', xl:'10'}}  ml={{base:'4',sm:'0', md:'0', lg:'0', xl:'0'}}> */}
      {/* <Button width={{base:'100px',sm:'',md:'200px', lg:'200px'}}  backgroundColor={'transparent'} fontSize={{base:'0.5rem',md:'0.8rem'}} className='not-interested' onClick={handleDelete}> <ViewOffIcon />  Hide</Button> */}
    {/* <a href={href}><Button className='button' width={{base:'20', sm:'35', md:'40', lg:'40', xl:'40'}}  fontSize={{base:'10',md:'18'}} height={{base:'8'}} colorScheme='messenger'><ExternalLinkIcon/>Apply</Button></a> */}
   {/* <Button width={{base:'40', sm:'30',md:'200px'}} backgroundColor={'gray.300'}  height={{base:'7', sm:'', md:'', lg:'', xl:''}} className='save' fontSize={{base:'0.7rem', sm:'0.9rem', md:'1rem', lg:'1rem', xl:'1.2rem'}}  mr={'10'}> <FaSave/><FaSave className='icon' fontSize={'1rem'}/> {save}</Button> */}
   <div className='jobBoardFooterSide  d-flex justify-content-start mt-2 '> 
    <div  className='posted   d-flex  w-100     '>
      <span className=' ms-5  mt-1      '><FaRegCalendarAlt   className='  '/> </span>
      <span className='text-secondary fw-bold me-5  pe-5 '>  {postedDate ? (`${months[new Date(postedDate).getMonth()] } ${new Date(postedDate).toUTCString().slice(5,7)}`):""}</span>
      </div>
    <div className='save-hide d-flex justify-content-end   '>
      
      <button onClick={()=>{handleOnDelete(id)}} className='hide ms-5'><ViewOffIcon /> Hide</button>
      <button onClick={()=>{handleSaveJob(id)}} className='hide me-5 d-flex justify-content-center'> <span className='ms-4 mt-1' > <FaSave/></span>  <span className='me-5' >{saveValue}</span></button>

    </div>
   </div>
   
  

   {/* </HStack> */}
   </div>
   
    
      </button>
      {/* </Link> */}
        </UserContext.Provider>
        </>
    
  )
} 
export {UserContext};
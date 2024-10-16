import React, { createContext,  useState } from 'react'
import { HStack, Avatar,Text} from '@chakra-ui/react'
import "../Styles/job.css"
import { ViewOffIcon } from '@chakra-ui/icons'
 import {  FaSave} from 'react-icons/fa'  

import { CiLocationOn, } from "react-icons/ci";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsPersonWorkspace } from "react-icons/bs";
import { PiNotepadLight } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { BsSave } from "react-icons/bs"; 
import { BsSaveFill } from "react-icons/bs";



const UserContext =createContext()   

  export default function Job({href,postedDate, contract_type,category,company_name, title,logo, location, country, employment_type, description,experience,maxSalary,minSalary,qualification , id, onDelete, maxExperience,minExperience, requirement,neededSkills}) {
const months=["jan", "Feb", "March", "April", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"]          




 let monthName=months[new Date(postedDate).getMonth()]
let day=new Date(postedDate).toUTCString().slice(5,7)
console.log(monthName,day)
const [saveValue, setSaveValueJob]=useState(false)

const token= localStorage.getItem("token")
const navigate=useNavigate()
 
console.log(requirement)



 const [values, setValues] =useState([])
  
 const handleSaveJob= async (key)=>{
try{
  // const response = await fetch('   http://localhost:5000/api/candidate/save_job', {
     const response = await fetch('   http://localhost:5000/api/candidate/save_job', {

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
   
  
  setSaveValueJob("true")
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
      
  <button   onClick={()=>{handleButtonClick(id)}}   className='box shadow'   >
      
      <div className=' d-flex justify-content-between flex-column mx-auto' >
    <HStack justifyContent={{base:'start',md:'start', sm:'start'}} className='mx-auto'>
    <Avatar className='avatar ms-2 mt-2' size={{base:'sm', sm:'md', md:'md', lg:'md',xl:'md'}}  name={company_name} />
    <span className='title mx-auto'>{title} </span>
    </HStack >
    <Text className='companyName mx-auto'>{company_name}</Text>   


    
     <div className='second-job-section '   >
     <div className='third-job-section' ><CiLocationOn className='icons' /> <span className='value'>  { location && location.length>1 ? `${location.slice(0,10)}...` :"Not Mentioned"}</span></div>
    <div className='third-job-section' ><BsCurrencyRupee   className='icons'/> <span className='value'>{maxSalary  && minSalary ?  `${minSalary}-${maxSalary} L`: "Not Disclosed"}</span></div>
    <div className='third-job-section'><BsPersonWorkspace  className='icons'/>   <span className='value'>{ minExperience && maxExperience ? `${minExperience}-${maxExperience}Yrs`:"0 Yrs"}</span> </div>
    </div>        





   {requirement && requirement.length>0? <div className='salary d-none d-sm-flex   mx-auto  icons' >      <PiNotepadLight className='icons ' /><span className=' value  '>{ requirement && requirement.length>0  ?` ${requirement[0].EducationalRequirement.slice(0,70)}...`:""  }</span></div> :""}



    { requirement && requirement.length>0? <Text className='d-none d-md-flex  text-secondary skills fw-bold d-none d-lg-block mx-auto'>{requirement && requirement.length>0? requirement[0].NeededSkillsAndTechnologies.slice(0,80):"" }</Text>:"" }
      {  description && description.length>1 ? <Text className='description ' >{ description && description.length>1 ?` ${description.slice(0,150)}...`:""}</Text>:"" }


   

<div className='second-job-section'> 
    <div  className=' third-job-section'> <FaRegCalendarAlt   className=' icons '/> <span className='value'>  {postedDate ? (`${months[new Date(postedDate).getMonth()] } ${new Date(postedDate).toUTCString().slice(5,7)}`):""}</span></div>
    <div className=' footer-buttons '>
      
      <button onClick={()=>{handleOnDelete(id)}} ><ViewOffIcon /> </button>
        {  saveValue===false   ? <button onClick={()=>{handleSaveJob(id)}}>  <BsSave /> </button> :    <button onClick={()=>{handleSaveJob(id)}}>  <BsSaveFill /> </button>}

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
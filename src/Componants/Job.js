import React, { createContext,  useState } from 'react'
import { HStack, Avatar,Text} from '@chakra-ui/react'
import "../Styles/job.css"
import { ViewOffIcon } from '@chakra-ui/icons'


import { CiLocationOn, } from "react-icons/ci";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsPersonWorkspace } from "react-icons/bs";
import { PiNotepadLight } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom' 
import { useToast } from '@chakra-ui/react';






const UserContext =createContext()   

  export default function Job({href,postedDate, contract_type,category,company_name, title,logo, location, country, employment_type, description,experience,maxSalary,minSalary,qualification , id, onDelete, maxExperience,minExperience, requirement,neededSkills}) {
const months=["jan", "Feb", "March", "April", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"]          
const toast= useToast()




 let monthName=months[new Date(postedDate).getMonth()]
let day=new Date(postedDate).toUTCString().slice(5,7)
console.log(monthName,day)
const [saveValue, setSaveValueJob]=useState(false)

const token= localStorage.getItem("token")
const navigate=useNavigate()
 
console.log(requirement)



 const [values, setValues] =useState([])
  


 

  const handleOnDelete=(id)=>{
    
    onDelete(id)
    
    addToast("Job Deleted ", "" , "warning")
    
  }
  const handleButtonClick=(id)=>{
    navigate(`/job_detail/${id}`)

  }



  const addToast=(title,message="", status)=>{
    toast({
      title: title,
      description: message,
      status: status,
      duration: 4000,
      isClosable: true,
    })
  }
 

 

  


    
  return (
  <>
   
    <UserContext.Provider value={{values, setValues}}>
   
      
  <div     className='box shadow'   >
 
      <div className=' d-flex justify-content-between flex-column mx-auto' >
    <HStack justifyContent={{base:'start',md:'start', sm:'start'}} className='mx-auto'>
    <Avatar className='avatar ms-2 mt-2' size={{base:'sm', sm:'md', md:'md', lg:'md',xl:'md'}}  name={company_name} />
    <span className='title mx-auto'>{title} </span>
    </HStack >
    <Text className='companyName mx-auto'>{company_name}</Text>   


    
     <div className='second-job-section '      >
     <div className='third-job-section' ><CiLocationOn className='icons' /> <span className='value'>  { location && location.length>1 ? `${location.slice(0,10)}...` :"Not Mentioned"}</span></div>
    <div className='third-job-section' ><BsCurrencyRupee   className='icons'/> <span className='value'>{maxSalary  && minSalary ?  `${minSalary}-${maxSalary} L`: "Not Disclosed"}</span></div>
    <div className='third-job-section'><BsPersonWorkspace  className='icons'/>   <span className='value'>{ minExperience && maxExperience ? `${minExperience}-${maxExperience}Yrs`:"0 Yrs"}</span> </div>
    </div>        



    {
  requirement && requirement.length >= 0 ? (
    <div className='salary d-none d-sm-flex mx-auto icons'>
   { requirement && requirement.length >= 1 ?   <PiNotepadLight className='icons' />:""}
      <span className='value'>
        {
        
        
        requirement[0]?.EducationalRequirement && 
         requirement[0]?.EducationalRequirement?.length >= 1
          ? ` ${requirement[0].EducationalRequirement.slice(0, 70)}...`
          : ''
          
          
          }
      </span>
    </div>
  ) : (
    ""
  )
}


   {/* {requirement && requirement.length>=1 ? <div className='salary d-none d-sm-flex   mx-auto  icons' >      <PiNotepadLight className='icons ' /><span className=' value  '>{ requirement && requirement.length>=1  ?` ${ requirement[0].EducationalRequirement && requirement[0].Requirement.length>=1 ?  requirement[0].Requirement.slice(0,70):''}...`:"no data"  }</span></div> :""} */}



    { requirement && requirement.length>=1 ? <Text className='d-none d-md-flex  text-secondary skills fw-bold d-none d-lg-block mx-auto'>{requirement[0].NeededSkillsAndTechnologies && requirement[0].NeededSkillsAndTechnologies.length>=1? requirement[0].NeededSkillsAndTechnologies.slice(0,70):"" }</Text>:"" }
      {  description && description.length>=1 ? <Text className='description ' >{ description && description.length>1 ?` ${description.slice(0,150)}...`:""}</Text>:"" }


   

<div className='second-job-section mx-auto mt-3'> 
    <div  className=' third-job-section'> <FaRegCalendarAlt   className=' icons '/> <span className='value'>  {postedDate ? (`${months[new Date(postedDate).getMonth()] } ${new Date(postedDate).toUTCString().slice(5,7)}`):""}</span></div> 
    <button className='btn btn-primary mx-auto more-info-button  mx-auto shadow' onClick={()=>{handleButtonClick(id)}}  >View </button>
    <div className=' footer-buttons '>
      
      <button className='btn more-info-button shadow btn-primary' onClick={()=>{handleOnDelete(id)}} ><ViewOffIcon /> </button>
        {/* {  saveValue===false   ? <button onClick={()=>{handleSaveJob(id)}}>  <BsSave /> </button> :    <button onClick={()=>{handleSaveJob(id)}}>  <BsSaveFill /> </button>} */}

    </div>
   </div>
   
  

   {/* </HStack> */}
   </div>
   
    
      </div>
      {/* </Link> */}
        </UserContext.Provider>
        </>
    
  )
} 
export {UserContext};
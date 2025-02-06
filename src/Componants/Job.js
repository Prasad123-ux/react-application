import React, { createContext,  useEffect,  useState } from 'react'
import { HStack, Avatar,Text} from '@chakra-ui/react'
import "../Styles/job.css"
import { ViewOffIcon } from '@chakra-ui/icons' 
import { CiLocationOn, } from "react-icons/ci";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsPersonWorkspace } from "react-icons/bs";
import { PiNotepadLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom' 
import { useToast } from '@chakra-ui/react';






const UserContext =createContext()   

  export default function Job({href,postedDate, contract_type,category,company_name, title,logo, location, country, employment_type, description,experience,maxSalary,minSalary,qualification , id, onDelete, maxExperience,minExperience, requirement,neededSkills, mail}) {
const months=["jan", "Feb", "March", "April", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"]          
const toast= useToast()
const monthName=months[new Date(postedDate).getMonth()]
const day=new Date(postedDate).toUTCString().slice(5,7)
console.log(monthName,day)
const [companyInfo, setCompanyInfo]= useState()
const navigate=useNavigate()
 const [values, setValues] =useState([])
  


useEffect(()=>{
  const getCompanyInfo=async()=>{
    try{
const response = await fetch(`https://jobnexus-backend.onrender.com/api/candidate/companyInfo/${mail}`, {
  method:"get"

})

if(!response.ok){
  const errorText= await response.text 
  // console.log(result.message)
  throw new Error(`${errorText}`)
}
else{
  const data=await response.json()    
  console.log(data.data.CompanyName)
  setCompanyInfo(data.data)
}
}
catch(err){ 

console.log(err.message)

    }

  }


  getCompanyInfo()

},[mail])



 

  const handleOnDelete=(id)=>{
    
    onDelete(id)
    
    addToast("Job Deleted ", "" , "warning")
    
  }
  const handleButtonClick=(id)=>{
    navigate(`/job_detail/${id}`,  {state  : {companyInfo}})

  }



  const handleCompanyInfo=(id)=>{
    navigate(`/companies/skeleton/companyProfile/${id}`)

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
   
      
  <div     className='box shadow mx-auto'   >
 
      <div className=' d-flex justify-content-between flex-column mx-auto' >
    <HStack justifyContent={{base:'start',md:'start', sm:'start'}} className='mx-auto'>
    <Avatar className='avatar ms-2 mt-2' size={{base:'sm', sm:'md', md:'md', lg:'md',xl:'md'}} onClick={()=>{handleCompanyInfo(companyInfo._id)}}  name={company_name} />
    <span className='title mx-auto'>{title}</span>
    </HStack > 
    <Text className='companyName mx-auto ' onClick={()=>{handleCompanyInfo(companyInfo._id)}}>{companyInfo ?companyInfo.CompanyName:" "}</Text>   

    
     <div className='second-job-section'>
     <div className='third-job-section' ><CiLocationOn className='icons  d-inline ' /> <span className='value mt-1 mt-md-0'>  { location && location.length>1 ? `${location.slice(0,10)}...` :"Not Mentioned"}</span></div>
    <div className='third-job-section' ><BsCurrencyRupee   className='icons'/> <span className='value mt-1 mt-md-0'>{maxSalary  && minSalary ?  `${minSalary}-${maxSalary} L`: "Not Disclosed"}</span></div>
    <div className='third-job-section'><BsPersonWorkspace  className='icons'/>   <span className='value mt-1 mt-md-0'>{ minExperience && maxExperience ? `${minExperience}-${maxExperience}Yrs`:"0 Yrs"}</span> </div>
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
    {/* <div  className=' third-job-section   d-block d-md-none '> <FaRegCalendarAlt   className=' icons '/> <span className='value'>  {postedDate ? (`${months[new Date(postedDate).getMonth()] } ${new Date(postedDate).toUTCString().slice(5,7)}`):""}</span></div>  */}
    {/* <button className='btn btn-primary  more-info-button  mx-auto shadow'  onClick={()=>{handleButtonClick(id)}}  >View </button> */}
    <div className=' footer-buttons  d-flex justify-content-around'>
    <button className='btn more-info-button shadow ' onClick={()=>{handleButtonClick(id)}} >View</button>
      <button className='btn more-info-button shadow ' onClick={()=>{handleOnDelete(id)}} ><ViewOffIcon /> </button>
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
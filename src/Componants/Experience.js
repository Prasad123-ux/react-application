import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import "../Styles/education.css"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react'; 
import options from "./data.json" 
import { RiHomeOfficeFill } from "react-icons/ri";

import PropTypes from "prop-types"

function Experience({onFetchDataButton}) {
  const [ExperienceDetail, setExperienceDetail]= useState({prevCompanyName:"", industry:"", designation:"", startingDate:"",endingDate:"", experience:"", usedSkills:""})
  const dispatch= useDispatch() 
  const [loader,setLoader]= useState(false)
  const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers)
  
  const [updateID, setUpdateID]= useState()
  const [updateIndex, setUpdateIndex]= useState()
  const toast=useToast()

      
  
  
  const handleExperience=(e)=>{
    setExperienceDetail({...ExperienceDetail, [e.target.name]:e.target.value })
  }

  const updateData=(id, index)=>{ 
    setUpdateID(id) 
    setUpdateIndex(index)
  
   }



const token= localStorage.getItem("token")






const handleExperienceDetails=async (e)=>{
  e.preventDefault()

try{
  const response= await fetch('   https://jobnexus-backend.onrender.com/api/candidate/Profile/addProfileDetail',{
    method:"POST",
    body:JSON.stringify({token:token, data:ExperienceDetail, dataType:"Experience" }),
    headers:{
      "Content-type":'application/json'
    }

  })
  if(!response.ok){
    addToast("Data Not Added", "error")

    throw new Error(response.statusText)
  }
     
  const result= await response.json()
  // 
  addToast(result.message, "success") 
  // await  onFetchDataButton()    



  console.log(result)
}catch(err){
  addToast("Data Not Added", "error")
  console.error(err.message)
  
}

}   

// API request for updating data     

const handleUpdateProfileDetail=async(e)=>{  

e.preventDefault()
  try{
    const response=  await fetch('   https://jobnexus-backend.onrender.com/api/candidate/profile/updateProfileDetail  ',{
      method:"POST",
      body:JSON.stringify({token:token, data:ExperienceDetail, dataCategory:'Experience', id:updateID,index:updateIndex }),
      headers:{
        "Content-type":"application/json"
      }
    })
    if(!response.ok){
      addToast("Data Not Added", "error")

      throw new Error(response.statusText)
    }else{
      const data = await response.json()
      addToast(data.message, "success") 

      
    }
  }catch(err){
    addToast("Internal Server Error", "error")
    console.error(err)

  }
  
} 






// API requst for deleting data

const handleDeleteUserData=async(id, index)=>{ 
  console.log(jobSeekerData)

  console.log(id,index)
  setLoader(true)
  try{
    const response= await fetch(`https://jobnexus-backend.onrender.com/api/candidate/profile/education/deleteEducation?id=${id}&index=${index}&datType=Experience`, {     
      method:"DELETE",
      body:JSON.stringify({dataType:"Experience"}),
      headers:{"Content-type":"application/json"}


    })
    if(!response.ok){
      setLoader(false)
       addToast("Data not deleted", "error")
      throw new Error(response.statusText)
    }
    else{
      await onFetchDataButton
      const data = await response.json()
      setLoader(false)
    
      addToast(data.message, "success") 
      
      // window.location.reload() 
      
    
    }
  }catch(err){
    
    setLoader(false)

    
    addToast("Data not deleted, Internal Server Error", "error") 
    console.log(typeof(onFetchDataButton))
    
    


  }
  
}

const addToast=(title,status)=>{
  toast({title: title,
    
    status: status,
    duration: 5000,
    isClosable: true})

}





  return (
    

    <div className='bg-light rounded-3 mx-auto  p-3 p-sm-3 p-md-3 p-lg-5 align-items-center  shadow resume'>


      {jobSeekerData.extraFields?.Experience && jobSeekerData.extraFields?.Experience.length>=1  ?
 
                     <div className='education-first d-flex justify-content-between align-items-center'> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon'><RiHomeOfficeFill  className='fs-4' /> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>Add Certificate/Course Details</span>
            <span className='d-block'> All Experience/Courses you have dones</span> 
          </div>
          
        </div>
        <div className='education-btn'>
          <button className='btn btn-outline-info d-flex justify-content-center ' type='button'  data-bs-toggle="modal" data-bs-target="#exampleModal">
             <span className='add-icon mt-1 fw-bolder'> <IoMdAdd /></span>  <span className='add-btn-name'> Add New</span> </button>
        </div>

      </div> 
:


      <div className='d-flex flex-column align-items-center'>
    <div className='education-heading'>
        <span className='education-icon'><RiHomeOfficeFill className='fs-4' /> </span> 
    </div>
    <div className='text-center mt-2'>
        <span className='d-block fw-bold education-text'> Add Previous Company/Organization</span>
        <span className='d-block education-text'>All Experience you have got</span> 
    </div>
    <div className='education-option-btn mt-2'>
        <button className='btn btn-outline-info d-flex justify-content-center' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal">
            <span className='add-icon mt-1 fw-bolder'><IoMdAdd /></span>
            <span className='add-btn-name'>Add New </span>
        </button>
    </div>
</div>

      }

{/* USER EDUCATION FOR  */}



     {
     jobSeekerData.extraFields?.Experience && jobSeekerData.extraFields.Experience.length>=1 ? jobSeekerData.extraFields.Experience.map((item,index)=>{
      return <div className='education-first user-education p-3 mt-4'>
<div className='  d-flex justify-content-between align-items-center '> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon '><FaGraduationCap  className='fs-4'/> </span> 
       
          <div className='ps-5'>
            <span className='fs-5  fw-bold'>{item.prevCompanyName}</span>
         <span className='d-block fs-6 fw-bold'> {item.designation}----{item.experience} yr of Experience</span> 
         <span> {item.startingDate} to {item.endingDate}</span>
         {/* <Link to="/" className='link text-primary'>{item.link}</Link>   */}

         <span className='d-block fw-bolder'> {item.usedSkills}</span>
         


      </div>
      <div className='education-btn d-flex justify-content-around  '>
       

       <button className='btn btn-outline-info d-flex justify-content-center icon' type='button' data-bs-toggle="modal" data-bs-target="#exampleModalUpdate" onClick={()=>{updateData(jobSeekerData._id, index)}} >
               <MdOutlineModeEditOutline />
               </button>
               <button className='btn btn-outline-info d-flex justify-content-center icon ' type='button'  onClick={()=>{handleDeleteUserData(jobSeekerData._id ,index)}}>
               <MdDelete />
              </button>
               </div>


        
           
          
        </div> 
        
        
    
      </div>
    
      </div>


         }):"" }

      


















{/* modal for adding new educational details */}


<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Experience & Courses</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


        
<div className='mt-4'>
  <form onSubmit={handleExperienceDetails}  >
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">Previous Company Name</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter name of Previous Company" name="prevCompanyName" value={ExperienceDetail.prevCompanyName}  onChange={handleExperience} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Industry Type</label>
    <select type="date" className="form-control" id="validationDefault03" placeholder="Choose Year of Industry Type"  name="industry" value={Experience.industry} onChange={handleExperience} required>
    <option  value="1" default >Industry Type</option>

    
    {options.industry.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div> 
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Year of Experience</label>
    <select type="date" className="form-control" id="validationDefault03" placeholder="Choose Year of Experience"  name="experience" value={Experience.experience} onChange={handleExperience} required>
    <option  value="1" default >Year of Experience</option>

    
    {options.experience.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label">Designation</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="Enter Your Designation" name="designation" value={ExperienceDetail.designation}  onChange={handleExperience} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Starting Date</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder=" Starting year"  name="startingDate" value={Experience.startingYear} onChange={handleExperience} required>
</input>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Ending Date</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder=" Ending year"  name="endingDate" value={Experience.endingDate} onChange={handleExperience} required>
</input>
  </div>
 <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Skills Used in Organization (Seperated by Comma)</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Skills" name="usedSkills" value={ExperienceDetail.usedSkills}  onChange={handleExperience} required/>
  </div>
  
 
 
 
  <div className="  modal-footer d-flex justify-content-around flex-row" >
        <button  className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary modal-save-btn " data-bs-dismiss="modal">Save changes</button>

      </div>
  </form>

</div>




     
      </div>
     
      
    </div>
  </div>
</div>
     








{/* modal for updating user data */}



<div className="modal fade" id="exampleModalUpdate"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Experience & Courses</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleUpdateProfileDetail}>
        <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">Previous Company Name</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter name of Previous Company" name="prevCompanyName" value={ExperienceDetail.prevCompanyName}  onChange={handleExperience} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Industry Type</label>
    <select type="date" className="form-control" id="validationDefault03" placeholder="Choose Year of Industry Type"  name="industry" value={Experience.industry} onChange={handleExperience} required>
    <option  value="1" default >Industry Type</option>

    
    {options.industry.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div> 
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Year of Experience</label>
    <select type="date" className="form-control" id="validationDefault03" placeholder="Choose Year of Experience"  name="experience" value={Experience.experience} onChange={handleExperience} required>
    <option  value="1" default >Year of Experience</option>

    
    {options.experience.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label">Designation</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="Enter Your Designation" name="designation" value={ExperienceDetail.designation}  onChange={handleExperience} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Starting Date</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder=" Starting year"  name="startingDate" value={Experience.startingYear} onChange={handleExperience} required>
</input>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Ending Date</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder=" Ending year"  name="endingDate" value={Experience.endingDate} onChange={handleExperience} required>
</input>
  </div>
 <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Skills Used in Organization (Seperated by Comma)</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Skills" name="usedSkills" value={ExperienceDetail.usedSkills}  onChange={handleExperience} required/>
  </div>
  
 
 
 
  <div className="  modal-footer d-flex justify-content-around flex-row" >
        <button  className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary modal-save-btn " data-bs-dismiss="modal">Save changes</button>

      </div>
</form>

</div>



     
      </div>
     
      
    </div>
  </div>
</div>
  

      
      
      
    
  )
}

Experience.propTypes = {
  onFetchDataButton: PropTypes.func.isRequired, // Expect a function prop, mark it as required
};

export default Experience

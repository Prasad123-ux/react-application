import React, {  useState } from 'react'
import { MdCastForEducation } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../Styles/education.css"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
// import { FaLink } from 'react-icons/fa';
import {Link } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';  
import { FaAward } from "react-icons/fa6";

import PropTypes from "prop-types"

function Accomplishment({onFetchDataButton}) {
  const [accomplishmentDetail, setAccomplishmentDetail]= useState({accomplishmentName:"", accomplishmentDescription:"", accomplishmentAccomplishmentDate:"",accomplishmentLink:"", accomplishmentSkills:""})
  const dispatch= useDispatch() 
  const [loader,setLoader]= useState(false)
  const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers)
  
  const [updateID, setUpdateID]= useState()
  const [updateIndex, setUpdateIndex]= useState()
  const toast=useToast()

      
  
  
  const handleAccomplishment=(e)=>{
    setAccomplishmentDetail({...accomplishmentDetail, [e.target.name]:e.target.value })
  }

  const updateData=(id, index)=>{ 
    setUpdateID(id) 
    setUpdateIndex(index)
  
   }



const token= localStorage.getItem("token")






const handleAccomplishmentDetails=async (e)=>{
  e.preventDefault()

try{
  const response= await fetch('   https://jobnexus-backend.onrender.com/api/candidate/Profile/addProfileDetail',{
    method:"POST",
    body:JSON.stringify({token:token, data:accomplishmentDetail, dataType:"Accomplishment" }),
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
      body:JSON.stringify({token:token, data:accomplishmentDetail, dataCategory:'Accomplishment', id:updateID,index:updateIndex }),
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
    const response= await fetch(`https://jobnexus-backend.onrender.com/api/candidate/profile/education/deleteEducation?id=${id}&index=${index}&datType=Accomplishment`, {     
      method:"DELETE",
      body:JSON.stringify({dataType:"Accomplishment"}),
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


      {jobSeekerData.extraFields?.Accomplishment && jobSeekerData.extraFields?.Accomplishment.length>=1  ?
 
                     <div className='education-first d-flex justify-content-between align-items-center'> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon'><FaAward  className='fs-4' /> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>Add Certificate/Course Details</span>
            <span className='d-block'> All Accomplishment/Courses you have dones</span> 
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
        <span className='education-icon'><FaAward  className='fs-4' /> </span> 
    </div>
    <div className='text-center mt-2'>
        <span className='d-block fw-bold education-text'> Add Certificate/Course Details</span>
        <span className='d-block education-text'>All Accomplishment/Courses you have done</span> 
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
     jobSeekerData.extraFields?.Accomplishment && jobSeekerData.extraFields.Accomplishment.length>=1 ? jobSeekerData.extraFields.Accomplishment.map((item,index)=>{
      return <div className='education-first user-education p-3 mt-4'>
<div className='  d-flex justify-content-between align-items-center '> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon '><FaGraduationCap  className='fs-4'/> </span> 
       
          <div className='ps-5'>
            <span className='fs-6 fw-bold'>{item.accomplishmentName}</span>
         <span className='d-block'> {item.accomplishmentDescription}</span> 
         <Link to="/" className='link text-primary'>{item.accomplishmentLink}</Link>  

         <span className='d-block'> {item.accomplishmentAccomplishmentDate}</span>
         <span className='d-block'>{item.accomplishmentSkills}</span>
         


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

      


















{/* modal for adding new Accomplishment details */}


<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Accomplishment & Courses</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


        
<div className='mt-4'>
  <form onSubmit={handleAccomplishmentDetails}  >
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">Title</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter name of Achievement" name="accomplishmentName" value={accomplishmentDetail.accomplishmentName}  onChange={handleAccomplishment} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label"> Describe your Accomplishment</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="What did you learn from this Achievement" name="accomplishmentDescription" value={accomplishmentDetail.accomplishmentDescription}  onChange={handleAccomplishment} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label"> When you did the Accomplishment</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder="dd-mm-yyyy" name="accomplishmentAccomplishmentDate" value={accomplishmentDetail.accomplishmentAccomplishmentDate}  onChange={handleAccomplishment} required/>
  </div>
 
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label"> Link</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Accomplishment Link" name="accomplishmentLink" value={accomplishmentDetail.accomplishmentLink}  onChange={handleAccomplishment} required/>
  </div>
  
 <div className="col-10 mt-3">
    <label htmlFor="validationDefault05" className="form-label"> Link</label>
    <input type="link" className="form-control" id="validationDefault05" placeholder="Enter Your Skills which gain in Accomplishment" name="accomplishmentSkills" value={accomplishmentDetail.accomplishmentSkills}  onChange={handleAccomplishment} required/>
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
        <h5 className="modal-title" id="exampleModalLabel">Accomplishment & Courses</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleUpdateProfileDetail}>

      <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">Title</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter Title of Achievement" name="accomplishmentName" value={accomplishmentDetail.accomplishmentName}  onChange={handleAccomplishment} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label"> Describe your Accomplishment</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="What did you learn from this Achievement" name="accomplishmentDescription" value={accomplishmentDetail.accomplishmentDescription}  onChange={handleAccomplishment} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label"> When you did the Accomplishment</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder="dd-mm-yyyy" name="accomplishmentDate" value={accomplishmentDetail.accomplishmentDate}  onChange={handleAccomplishment} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label"> Link</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Achievement Link" name="accomplishmentLink" value={accomplishmentDetail.accomplishmentLink}  onChange={handleAccomplishment} required/>
  </div>
   <div className="col-10 mt-3">
    <label htmlFor="validationDefault05" className="form-label">Accomplishment Skill used (Seperated by comma)</label>
    <input type="text" className="form-control" id="validationDefault05" placeholder="Gained skills in achievement" name="accomplishmentSkills" value={accomplishmentDetail.accomplishmentSkills}  onChange={handleAccomplishment} required/>
  </div>
       

  

<div className="  modal-footer d-flex justify-content-around flex-row" >
        <button className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button   type="submit"  className="btn btn-primary modal-save-btn " data-bs-dismiss="modal">Save changes</button>
      </div>
</form>

</div>



     
      </div>
     
      
    </div>
  </div>  
</div>
  

      
      
      
    
  )
}

Accomplishment.propTypes = {
  onFetchDataButton: PropTypes.func.isRequired, // Expect a function prop, mark it as required
};

export default Accomplishment;

import React, { useState } from 'react'
import { MdCastForEducation } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../Styles/education.css"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import {Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'; 
import { useToast } from '@chakra-ui/react'; 
import { MdDelete } from "react-icons/md"; 
import { LiaProjectDiagramSolid } from "react-icons/lia";


function Project() {
  const [projectDetail, setProjectDetail]= useState({projectName:"", projectDescription:"", projectDate:"",projectLink:""})
  const dispatch= useDispatch() 
  const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers)
  const [loader,setLoader]= useState(false) 
  const toast= useToast()
  const [updateID,setUpdateID]= useState ()
  const [updateIndex,setUpdateIndex]= useState()

                                                      
  const handleCertification=(e)=>{
    setProjectDetail({...projectDetail, [e.target.name]:e.target.value })
  }


  const updateData=(id, index)=>{ 
    setUpdateID(id) 
    setUpdateIndex(index)
  
   }
     

const token= localStorage.getItem("token")




const handleEducationalDetails=async (e)=>{
  e.preventDefault()

try{
  const response= await fetch('   https://jobnexus-backend.onrender.com/api/candidate/Profile/addProfileDetail',{
    method:"POST",
    body:JSON.stringify({token:token,data:projectDetail , dataType:"Projects" }),
    headers:{
      "Content-type":'application/json'
    }

  })
  if(!response.ok){
    addToast("Data Not Added", "error")

    throw new Error(response.statusText)
  }
     
  const result= await response.json() 
  addToast(result.message, "success") 
  console.log(result)
}catch(err){
  addToast("Data Not Added", "error")
  console.error(err)
  
}

}   


const handleUpdateEducationDetail=async(e)=>{ 


  e.preventDefault()
  try{
    const response=  await fetch('   https://jobnexus-backend.onrender.com/api/candidate/profile/updateProfileDetail ',{
      method:"POST",
      body:JSON.stringify({token:token, data:projectDetail, dataCategory:'Projects', id:updateID,index:updateIndex }),
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




const handleDeleteUserData=async(id, index)=>{
  console.log(id,index)
  setLoader(true)
  try{
    const response= await fetch(`https://jobnexus-backend.onrender.com/api/candidate/profile/education/deleteEducation?id=${id}&index=${index}&dataType="Projects`, {     
      method:"DELETE",
      headers:{"Content-type":"application/json"}

    })
    if(!response.ok){
      setLoader(false)
       addToast("Data not deleted", "error")
      throw new Error(response.statusText)
    }
    else{
      const data = await response.json()
      setLoader(false)
      addToast(data.message, "success") 
      // window.location.reload()
    
    }
  }catch(err){
    setLoader(false)
    addToast("Data not deleted, Internal Server Error", "error")

    console.log(err)

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


      { jobSeekerData.extraFields?.Projects && jobSeekerData.extraFields?.Projects.length>=1  ?
     

       <div className='education-first d-flex justify-content-between align-items-center'> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon'><LiaProjectDiagramSolid  className='fs-4' /> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>Add Project Details</span>
            <span className='d-block'> Projects that you have worked on before</span> 
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
        <span className='education-icon'><LiaProjectDiagramSolid className='fs-4' /> </span> 
    </div>
    <div className='text-center mt-2'>
        <span className='d-block fw-bold education-text'> Add Project Details</span>
        <span className='d-block education-text'>Projects that you have worked on before</span> 
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



   {   jobSeekerData.extraFields?.Projects && jobSeekerData.extraFields?.Projects.length>=1 ? jobSeekerData.extraFields?.Projects.map((item,index)=>{
    return  <div className='education-first user-education p-3 mt-4'>
<div className='  d-flex justify-content-between align-items-center '> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon '><FaGraduationCap  className='fs-4'/> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>{item.projectName}</span>


             <span className='d-block'>{item.projectDescription} </span>  <Link to={item.projectLink} className='link text-primary'>{item.projectName} </Link>  
              <span className='d-block'>{item.projectDate} </span> 
             

          </div> 
          <div className='education-btn d-block d-sm-none '>
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
       }):"" 

}





      












{/* modal for adding new educational details */}


<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Certification & Courses</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


        
<div className='mt-4'>
  <form onSubmit={handleEducationalDetails}  >
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">Project Title</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter name of Project" name="projectName" value={projectDetail.projectName}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label"> Describe your Project</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="What did you learn from this Project" name="projectDescription" value={projectDetail.projectDescription}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label"> When you did the Projects</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder="dd-mm-yyyy" name="projectDate" value={projectDetail.projectDate}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label"> Project  Link</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Project Link" name="projectLink" value={projectDetail.projectLink}  onChange={handleCertification} required/>
  </div>
  {/* <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Skill used (Seperated by comma)</label>
    <input type="date" className="form-control" id="validationDefault04" placeholder="Type skills used" multiple name="skills" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div> */}
 
 
 
 
 
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
        <h5 className="modal-title" id="exampleModalLabel">Projects</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleUpdateEducationDetail}>

      <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">Project Title</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter name of Project" name="projectName" value={projectDetail.projectName}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label"> Describe about your Projects</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="What did you learn from this Project" name="projectDescription" value={projectDetail.projectDescription}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label"> When you did the Projects</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder="dd-mm-yyyy" name="projectDate" value={projectDetail.projectDate}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label"> Link Of Project</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Project Link" name="projectLink" value={projectDetail.projectLink}  onChange={handleCertification} required/>
  </div>


  {/* <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Skill used (Seperated  by comma)</label>
    <input type="date" className="form-control" id="validationDefault04" placeholder="Type skills used" name="skills" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div>
       */}












  

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

export default Project

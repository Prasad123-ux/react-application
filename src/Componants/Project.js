import React, { useState } from 'react'
import { MdCastForEducation } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../Styles/education.css"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";

// import { FaLink } from 'react-icons/fa';
import {Link } from "react-router-dom"

function Project() {
  const [projectDetail, setProjectDetail]= useState({certification:"", description:"", certificationDate:"",link:"", skills:''})
  // const [updateCertification,setUpdateCertification]= useState()
  //  const [projectData, setProjectData]= useState([])

  
  const handleCertification=(e)=>{
    setProjectDetail({...projectDetail, [e.target.name]:e.target.value })
  }




const token= localStorage.getItem("token")




const handleEducationalDetails=async (e)=>{
  e.preventDefault()

try{
  const response= await fetch('http://localhost:5000/api/candidate/Profile/addNew',{
    method:"POST",
    body:JSON.stringify({token:token, }),
    headers:{
      "Content-type":'application/json'
    }

  })
  if(!response.ok){
    

    throw new Error(response.statusText)
  }
     
  const result= await response.json()
  console.log(result)
}catch(err){
  console.error(err)
  
}

}   


// const handleUpdateEducationDetail=async(e)=>{
//   e.preventDefault()
//   try{
//     const response=  await fetch('http://localhost:5000/api/candidate/Profile/addNew',{
//       method:"POST",
//       body:JSON.stringify({token:token,  }),
//       headers:{
//         "Content-type":"application/json"
//       }
//     })
//     if(!response.ok){
//       throw new Error(response.statusText)
//     }else{
//       return await response.json()
//     }
//   }catch(err){
//     console.error(err)

//   }
// }





 


  return (

    <div className='bg-light rounded-3 mx-auto  p-3 p-sm-3 p-md-3 p-lg-5 align-items-center  shadow resume'>


      {/* {projectData && projectData.length>1  ? */}
     

       <div className='education-first d-flex justify-content-between align-items-center'> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon'><MdCastForEducation className='fs-4' /> </span> 
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
        <span className='education-icon'><MdCastForEducation className='fs-4' /> </span> 
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

      

{/* USER EDUCATION FOR  */}



     {/* {projectData && projectData.length>1 ? projectData.map((item,index)=>{return  */}

<div className='education-first user-education p-3 mt-4'>
<div className='  d-flex justify-content-between align-items-center '> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon '><FaGraduationCap  className='fs-4'/> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>Job Listing Application</span>


            {/* <span className='d-block'> Master of Computer Application (MCA) | Computer Science & Information Technology </span> 
            <span className='d-block fw-light'> 2019-2025</span>  */}

          </div>
          <div className='education-btn d-block d-sm-none '>
        <button className='btn btn-outline-info  ' type='button' data-bs-toggle="modal" data-bs-target="#exampleModalUpdate">
            <span className='add-icon mt-1 fw-bolder'><MdOutlineModeEditOutline /></span>
          
        </button>
        </div>
        
           
          
        </div> 
        
        
         <div className='education-btn d-sm-block d-none'>
        <button className='btn btn-outline-info d-flex justify-content-center' type='button' data-bs-toggle="modal" data-bs-target="#exampleModalUpdate">
            <span className='add-icon mt-1 fw-bolder'><MdOutlineModeEditOutline /></span>
            <span className='add-btn-name'>Update</span>
        </button>
    </div>
     
      </div>
      <div className='ps-5'>
         <span className='d-block'> Here is all detail of Projects</span> 
         <Link to="/" className='link text-primary'>Project Link</Link>  

         


      </div>

      </div>
      {/* }):"" */}

      


















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
    <label htmlFor="validationDefault01" className="form-label">Title</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter name of certification" name="certification" value={projectDetail.certification}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label"> Describe your certification</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="What did you learn from this certification" name="description" value={projectDetail.description}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label"> When you did the certification</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder="dd-mm-yyyy" name="completionDate" value={projectDetail.completionData}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label"> Link</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Certification Link" name="link" value={projectDetail.link}  onChange={handleCertification} required/>
  </div>
  {/* <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Skill used (Seperated by comma)</label>
    <input type="date" className="form-control" id="validationDefault04" placeholder="Type skills used" multiple name="skills" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div> */}
 
 
 
 
 
  <div className="  modal-footer d-flex justify-content-around flex-row" >
        <button  className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary modal-save-btn ">Save changes</button>

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
        <h5 className="modal-title" id="exampleModalLabel">Certification & Courses</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>

      <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">Title</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Enter name of certification" name="certification" value={projectDetail.certification}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label"> Describe your certification</label>
    <input type="text" className="form-control" id="validationDefault02" placeholder="What did you learn from this certification" name="description" value={projectDetail.description}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label"> When you did the certification</label>
    <input type="date" className="form-control" id="validationDefault03" placeholder="dd-mm-yyyy" name="completionDate" value={projectDetail.completionData}  onChange={handleCertification} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label"> Link</label>
    <input type="link" className="form-control" id="validationDefault04" placeholder="Certification Link" name="link" value={projectDetail.link}  onChange={handleCertification} required/>
  </div>


  {/* <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Skill used (Seperated  by comma)</label>
    <input type="date" className="form-control" id="validationDefault04" placeholder="Type skills used" name="skills" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div>
       */}












  

<div className="  modal-footer d-flex justify-content-around flex-row" >
        <button className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button   type="submit"  className="btn btn-primary modal-save-btn ">Save changes</button>
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

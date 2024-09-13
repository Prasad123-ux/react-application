import { Avatar,Text} from '@chakra-ui/react'
import React, {  useState } from 'react' 
import "../Styles/Profile.css"
import { FiEdit2 } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import {Link} from 'react-router-dom'
import ProfilePart from './ProfilePart';
import Resume from './Resume';
import Education from './Education';
import Experience from './Experience';
import Project from './Project';
import Work from './Certification';
import Accomplishment from './Accomplishment';

function Profile() {  

  const [userData, setUserData]= useState([])
  const [userUpdatedData, setUserUpdatedData]= useState({name:"", location:"", workStatus:"",city:"", join:"", })

const token= localStorage.getItem('token')
const onchange=(e)=>{
  
  setUserUpdatedData({...userUpdatedData, [e.target.name]:e.target.value})
 

}


// const handleSubmitData=(e)=>{

//   e.preventDefault()
//   try{
//     fetch('http://localhost:5000/api/candidate/getProfileData', {
//       method:"PUT",
//       body:JSON.stringify({token:token, updatedData:userUpdatedData}),
//       headers:{
//     "Content-type":"application/json"
//       }
//     }).then((response)=>{
//       if(!response.ok){
//         throw new Error(response.statusText)
                                                         
//       }else{
//         return response.json()
//       }

//     }).then((data)=>{   
//       console.log(data)

//     }).catch((err)=>{
//       console.error(err)

//     })

//   }catch(err){
//     console.log(err)

//   }



// }
// console.log(userData.extraFields.Education)


  

  const handleGetUserData= async()=>{
    console.log("function running")
    try{
       await fetch('http://localhost:5000/api/candidate/getProfileData', {
        method:"POST",
        body:JSON.stringify({token:token}),
        headers:{
          "Content-type":"application/json"
        }
      }).then((response)=>{
        if(!response.ok){
          throw new Error(response.statusText)
        }else{
          return response.json()
        }

      }).then((data)=>{
        console.log(data)
        setUserData(data.Data)
        

      }
      ).catch((err)=>{
     console.error(err.message)

      })

    }
    catch(err){
      console.log(err)
    }
    
  }



// console.log(userData.MobileNumber)
// console.log(userData.extraFields.resume)

// console.log(userData.extraFields.resume)
// console.log(userData.extraFields.resume)



 

  return (
    <>
    <div className='base' >
      <div className='base-first row  mx-auto rounded shadow  p-4 '>
        <div className='profile-photo col-12 col-lg-1 d-flex justify-content-center '>    
          <Avatar size="xl" />
          {/* <button className='ms-5 mt-2 btn btn-primary  cursor-pointer ' style={{"height":"40px"}}> EDIT</button> */}
        </div>
        <div className='profile-info mx-auto text-center col-12 col-lg-7'>
       <div className='name-info'>
     
        <span className=' name d-block fw-bold'>{userData.FullName && userData.FullName.length>1  ? userData.FullName :"" }</span>  
        {/* <span className=''></span> */}
        <span className='profile-last fw-light'>Profile last updated</span>-<span className=' day text-secondary fw-medium '>Today</span>
        {/* <button className='btn btn-primary' onClick={getUserData}>  get the user data from </button> */}
        <button className='btn btn-outline-danger' onClick={handleGetUserData}> getUserData</button>
        

       </div>

       <hr className=' mt-3 line'></hr>
       <div className='down-main row'>
        <div className='down-first col-12 col-md-6 '>
          
          <Text className='d-block text-secondary '><CiLocationOn style={{"width":"30px"}}  className='d-inline' /> <span className=''>{userData.City && userData.City.length>1  ? userData.City :"" }</span></Text>
          <Text className='d-block text-secondary '><BsPersonWorkspace className='d-inline' style={{"width":"30px"}} /> <span className=''>{userData.WorkStatus && userData.WorkStatus.length>1  ? userData.WorkStatus :"" }</span>  </Text>
          <Text className='d-block text-secondary '><MdOutlineDateRange className='d-inline' style={{"width":"30px"}} /><span className='d-inline'> </span></Text>
          
   
      
        </div>
        <div className='col-12  col-md-6' >
        <Text className='d-block text-secondary '><CiPhone style={{"width":"30px" ,"height":"20px"}} className='d-inline' /><span className=''>{userData.MobileNumber  ? userData.MobileNumber :"Not Found" }</span>  </Text>
        <Text className='d-block text-secondary '><CiMail  style={{"width":"30px" ,"height":"20px"}} className='d-inline' /><span className=''>{userData.Email && userData.Email.length>1  ? userData.Email :"" }</span>  </Text>
        <button className='d-block text-secondary btn  w-50 mx-auto shadow bg-light  ' data-toggle="modal" data-target="#exampleModalLong"><FiEdit2 className='d-inline' style={{"width":"30px"}} /><span className='d-inline'>Edit </span></button>


        </div>

       </div>

        </div>
        <div className='progress-info col-12 w-100 p-2 col-md-6 col-lg-4 rounded  mt-5 mt-lg-0 mx-auto d-flex justify-content-between  flex-column' style={{"backgroundColor":"#FFF2E3"}}>
           <div className='d-flex justify-content-between flex-row   '>
            <div className='d-block  '> 
            
            <Text className='d-flex justify-content-between text-secondary d- '><CiMail   style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add resume</span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>5%</span>  </Text>

              {/* <span className=' rounded-circle'> <IoArrowUp />5%</span> */}

            </div>

           </div>
           <button className='btn btn-primary  btn-detail mx-auto' style={{"backgroundColor":"#F05537"}}>Add missing details</button>

        </div>
      </div>
      



      



<div className="modal fade" id="exampleModalLong"  role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" >
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Basic Details</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body ">
        <form >
        <div className="form-group">
    <label htmlFor="nameInput">Name <span className='text-danger'>*</span></label>
    <input type="text" className="form-control" id="nameInput" placeholder="Prasad Metkar" value={userUpdatedData.name} name="name" onChange={onchange} required/>
  </div>
  <span className='fw-bold d-block ' > Work Status</span>
  <span className='text-secondary'>We will personalize your Jobify experience based on this</span>
  <div className='radio-button d-flex mt-3  mb-3'>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="workStatus" id="fresher"  value="Fresher" checked={userUpdatedData.workStatus==="Fresher" ||""} onChange={onchange}  required/>
  <label className="form-check-label" htmlFor="fresher">
    Fresher
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="workStatus" id="experienced" value="Experienced" checked={userUpdatedData.workStatus==="Experience"|| ""} onChange={onchange} required/>
  <label className="form-check-label" htmlFor="experienced">
    Experience
  </label>
</div>
</div>
<span className='fw-bold   ' > Current Location</span><span className='text-danger'>*</span>
  <span className='text-secondary d-block'>This helps us match you to relevant jobs</span> 
<div className='radio-button d-flex mt-3 '>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="location" id="location" value="India" checked={userUpdatedData.location ==="India"} onChange={onchange} required/>
  <label className="form-check-label" htmlFor="location">
    India
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="location" id="outsideIndia" value="Outside India" checked={userUpdatedData.location ==="Outside India"} onChange={onchange} required/>
  <label className="form-check-label" htmlFor="outsideIndia">
    Outside India
  </label>
</div>
</div>
<div className="form-group mt-3">
    <label htmlFor="cityInput">City <span className='text-danger'>*</span></label>
    <input type="text" className="form-control" id="cityInput" placeholder=" e.g.Hyderabad" value={userUpdatedData.city} name="city" onChange={onchange} required/>
  </div>
  <div>
    <span className='fw-medium'>Mobile Number <span className='text-danger'> *</span></span>
    <span className='text-secondary fw-medium d-block'> Recruiters will contact you on this number</span>
    <span className='text-secondary fw-medium'>9307173845</span><span className='ms-2 text-primary'><Link to="">Change Mobile Number</Link></span>
  </div>
  <div className='mt-4'>
    <span className='fw-medium'>Email address <span className='text-danger'> *</span></span>
    <span className='text-secondary fw-medium d-block'> We will send relevant jobs and updates to this email</span>
    <span className='text-secondary fw-medium'>prasadmetkar33@gmail.com</span><span className='ms-2 text-primary'><Link to="">Change Email</Link></span>
  </div>
  <div className='mt-4'>
    <span className='fw-medium'>Availability to join <span className='text-danger'> *</span></span>
    <span className='text-secondary fw-medium d-block'> We will send relevant jobs and updates to this email</span>
  </div>
  <div className='radio-button mt-3 mb-3'>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="join" id="join15days" value="15 days" checked={userUpdatedData.join ==="15 days"} onChange={onchange} required/>
  <label className="form-check-label" htmlFor="join15days">
    15 days
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="join" id="join1month" value="1 Month" checked={userUpdatedData.join ==="1 Month"} onChange={onchange} required/>
  <label className="form-check-label" htmlFor="join1month">
    1 Month
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="join" id="join2month" value="2 Month" checked={userUpdatedData.join ==="2 Month"} onChange={onchange} required/>
  <label className="form-check-label" htmlFor="join2month">
    2 Months
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="join" id="join3month" value="3 Month" checked={userUpdatedData.join ==="3 Month"} onChange={onchange} required/>
  <label className="form-check-label" htmlFor="join3month">
    3 Months
  </label>
</div>
</div>

        
        <div className="modal-footer d-flex">
        <button type="button" className="btn  w-25" data-dismiss="modal">Close</button>
        <button type='submit' className="btn btn-primary w-25">Save</button>
      </div>
      </form>
      </div>
    
    </div>
  </div>
</div>

      
    </div>
    < ProfilePart />
    <div className=' d-block d-sm-none mt-5'>
    <div className='w-100 bg-gradient text-info d-flex justify-content-center fs-6 fw-bold  mt-5 section-heading shadow'> Resume</div>

      <Resume    />
      <div className='w-100 bg-gradient text-info d-flex justify-content-center fs-6 fw-bold mt-5 section-heading  shadow mb-5'> Education</div>
      <Education />
      <div className='w-100 bg-gradient text-info d-flex justify-content-center fs-6 fw-bold mt-5 section-heading  shadow mb-5'> Experience</div>
      
      <Experience/>
      <div className='w-100 bg-gradient text-info d-flex justify-content-center fs-6 fw-bold mt-5 section-heading  shadow mb-5'> Work</div>
     <Work/>
      <div className='w-100 bg-gradient text-info d-flex justify-content-center fs-6 fw-bold mt-5 section-heading  shadow mb-5'> Projects</div>
      <Project/>
      <div className='w-100 bg-gradient text-info d-flex justify-content-center fs-6 fw-bold mt-5 section-heading  shadow mb-5'> Accomplishment</div>
     <Accomplishment/>

    </div>
    </>
  )
}

export default Profile

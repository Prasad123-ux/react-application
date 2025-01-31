import React, { useState } from 'react'
import "../Styles/application.css"
import { Text  } from '@chakra-ui/react'
import { FaRegFilePdf } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import { useToast } from '@chakra-ui/react';



function Application() {
    
    const location= useLocation()
    const {jobData}=location.state || {}
    const toast= useToast()
    const [applyLoading, setApplyLoading]= useState(false)
    
     const [getError, setGetError]= useState([])
  
    const token=localStorage.getItem('token')
        const navigate= useNavigate() 
        const [profile, setProfile]= useState()
    const scoreValue= useSelector((state)=>state.jobs.score) 
    const [loading, setLoading]= useState(false)
    

    


    
useEffect(()=>{ 

console.log(jobData)
    const findProfileData=async ()=>{
        try{
        const response= await fetch('   https://jobnexus-backend.onrender.com/api/candidate/getProfileData', {
            method:"POST",
            body:JSON.stringify({token:token}),
            headers:{
                "Content-type":"application/json"
            }
        })
        if(!response.ok){
            throw new Error(response.statusText)
        }
        const result = await response.json()
      
        setProfile(result.Data) 
      
        
        
    }
catch(err){
    console.log(err)

}finally{
  setLoading(false)
}
    }

    findProfileData()
},[token])

const handleHomePage=()=>{
    navigate('/main')
}

const appliedJob= async (value)=>{
  setApplyLoading(true)

    
    try{
    
   const response=     await fetch(`   https://jobnexus-backend.onrender.com/api/candidate/appliedForJob/${value}`, {
            method:"POST",
        headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({ token:token, Email:jobData.Email, companyName:jobData.company_name, JobTitle:jobData.JobTitle, location:jobData.JobLocation})

})
const result= await response.json()
if(!response.ok){
  throw new Error(result.message ||  `HTTP error! status: ${response.status}`)
  
}else{
addToast(result.message, "job Saved Successfully", "success")
}
    // navigate('/main')
    
    }catch(err){
      addToast(err.message,"Failed with application", "warning")

    }finally{
      setApplyLoading(false)

    }
}
const addToast=(title,message, status)=>{
  toast({
    title: title,
    description: message,
    status: status,
    duration: 6000,
    isClosable: true,
  })
}

   

  return (
    <>
    
      <div className='  mx-auto application-first-body shadow  text-center    flex-column pt-2 pb-3  object-fit-fill border rounded' >
<span className='fw-bold'>{ jobData && jobData.JobTitle?.length>=0 ? jobData.JobTitle:""} ({ jobData&& jobData.JobCommonInfo?.length>0 ?jobData.JobCommonInfo[0].JobRole:""})</span>
<div className='mt-1'>{jobData && jobData.company_name?.length>=0 ? jobData.company_name:""}--{jobData&& jobData.JobLocation?.length>0 ? jobData.JobLocation:"" } </div>
      </div>


<div className='mx-auto mt-5 application-first-body shadow bg-white p-4  flex-column    object-fit-fill border rounded '>
    <Text className='fs-5 fw-bold'>Please Review Your Application</Text>
    <Text className='text-secondary fw-medium' >Contact Information</Text>
    <div className='user-info shadow object-fit-fill border rounded p-3 mb-4'>
        <span className='text-secondary key'>Full Name</span>
        <Text className='fw-medium  value'>{ profile && profile.FullName.length>=0 ? profile.FullName:"Not Found"}</Text>
        <hr></hr>
        <span className='text-secondary key'>Email</span>
        <Text className='fw-medium  value'>{ profile && profile.Email.length>=0 ? profile.Email:"Not Found"}</Text>
        <hr></hr>
        <span className='text-secondary key '>Location</span>
        <Text className='fw-medium  value'>{ profile && profile.City.length>=0 ? profile.City:"Not Found"}</Text>
        <hr></hr>

        <span className='text-secondary key'>Mobile Number</span>
        <Text className='fw-medium  value'>{ profile && profile.MobileNumber ? profile.MobileNumber:"Not Found"}</Text>
    </div>
    
    {profile && profile.extraFields?.resume?.length > 0 && (
  <div className='object-fit-fill border rounded shadow p-3 mb-4'>
    <span className='icons'>
      <FaRegFilePdf className='d-inline fs-4' style={{ width: "100px" }} />
    </span>
    <Link
      to={profile.extraFields.resume}
      className='value text-primary text-decoration-underline'
    >{ profile && profile.FullName.length>=0 ? profile.FullName:"Not Found"}.resume.pdf
      
    </Link>
  </div>
)}

    <Text className='text-secondary fw-medium' >Your Chances for noticing recruiters.</Text>
    <div className='object-fit-fill border rounded shadow p-3 mb-4'>
  {profile && profile.extraFields?.resume?.length > 0 ? (
    <>
      <Text className='text-center text-success fw-bold'>{scoreValue}%</Text>
      <div className='text-center'> <Link to="/profile">Find my  Score</Link></div>
      <span className='text-secondary text-center warning'>
        (Low chances indicate you don't meet sufficient requirements for the job. Avoid applying if your chances are below 35%, as it may negatively impact your profile.)
      </span>
    </>
  ) : (
    <>
      <Text className='text-danger text-center fw-bold'>
        <span>{scoreValue}%</span>
        <div>Please update your profile and then apply.</div>
      </Text>
      <span className='text-secondary text-center warning'>
        (Low chances indicate you don't meet sufficient requirements for the job. Avoid applying if your chances are below 35%, as it may negatively impact your profile.)
      </span>
    </>
  )}
</div>





</div>
<div className=' mt-3 mb-5 mx-auto d-flex justify-content-around   flex-row application-first-body '>
    <button onClick={()=>{appliedJob(jobData._id)}} className=' submit-button shadow btn btn-primary' data-toggle="modal" data-target="#exampleModalCenter" >{scoreValue>35 ?"Submit" :"Submit Anyway"}</button>
<Link to="/main" className=' submit-button shadow btn btn-danger'>Cancel</Link>
</div >



<div className="modal " id="exampleModalCenter"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
    
      <div className="modal-body">
        {
            getError.status===false ?<div className='text-center'>
                 <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR1YxzO29WdMekQweLMPHh5zFlT5HRwfVmhh3IH08syg1bpdPtf" alt="Application Successfully" className='d-block mx-auto ' style={{"width":"200px", "heigh":"100px"}}/>
                <div>Sorry it can't happen !</div>
                <span>Please try again!</span>
            </div>:<div>
                <img src="https://img.freepik.com/free-vector/business-partners-with-documents_18591-51592.jpg?t=st=1722885433~exp=1722889033~hmac=ce36235feff116e29a3382e3727e0a5ea36d5a3be303e9021e8961ae0a445d84&w=740" alt="Application Successfully" className='d-block mx-auto  ' style={{"width":"200px", "heigh":"100px"}}/>
                <div>You Did It !</div>
                <span>Your application was sent!</span>
            </div>
        }
        
      </div>
      <div className="modal-footer">
        <button type="button" onClick={()=>{handleHomePage()}} className="btn btn-secondary " data-dismiss="modal">Just Look More !</button>
        {/* <button type="button" className="btn btn-primary w-25">Save changes</button> */}
      </div>
    </div>
  </div>
</div>

      <Footer/>
        {/* </div> */}
    </>
  )
}

export default Application

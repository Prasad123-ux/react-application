import React, { useState } from 'react'
import "../Styles/application.css"
import { Text  } from '@chakra-ui/react'
import { FaRegFilePdf } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Application() {
    const [jobData , setJobData]= useState([])
    //  const [profileData, setProfileData]= useState([])
     const [getError, setGetError   ]= useState([])
    const {id}=useParams()
    const token=localStorage.getItem('token')
    const navigate= useNavigate()
    

    useEffect(()=>{
        const findJobExplainDetail= async ()=>{
            try{
                await fetch(`http://localhost:5000/api/candidate/getJobByID/${id}`,{
                    method:"GET",
                    headers:{
                        "Content-type":"application/json"
                    }
                }).then((result)=>{
                    if(!result.ok){
                        throw new Error(result.statusText)
                    }else{
                        return  result.json()
                    }
        
                }).then((data)=>{
                     console.log(data)
                    setJobData(data.Data)
                    // console.log(jobData)
        
                }).catch((err)=>{
                    // console.log("error at fetching data",err)
        
                })
            }catch(err){
                
        
            }
        }
        
        findJobExplainDetail()
        
        
        },[id])
    
useEffect(()=>{
    const findProfileData=async ()=>{
        try{
        const response= await fetch('http://localhost:5000/api/candidate/getProfileData', {
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
        console.log(result)
        
    }
catch(err){
    console.log(err)

}
    }

    findProfileData()
},[token])

const handleHomePage=()=>{
    navigate('/main')
}

const appliedJob= async (value)=>{
    console.log(value)
    
    
    
        await fetch(`http://localhost:5000/api/candidate/appliedForJob/${value}`, {
            method:"GET",
        headers:{
            "Content-type":"application/json"
        

}}).then((response)=>{
    setGetError(response)
    if(!response.ok){
    
        throw new Error(response.statusText)
     
    }else{
        return response.json()
    }

}).then((data)=>{
    console.log(data)
    navigate('job_detail/job_application/application_success')
  
}).catch((err)=>{
    console.log(err.message)
    
    // navigate('/main')
    
})
}

   console.log(getError.status)


    console.log(id)

  return (
    <>
    
      <div className='  mx-auto application-first-body shadow  text-center  mt-5  flex-column pt-2 pb-3  object-fit-fill border rounded' >
<span className='fw-bold'>{ jobData.JobTitle && jobData.JobTitle.length>0 ? jobData.JobTitle:""} ({ jobData.JobCommonInfo && jobData.JobCommonInfo.length>0 ?jobData.JobCommonInfo[0].JobRole:""})</span>
<div className='mt-1'>{jobData.company_name && jobData.company_name.length>0 ? jobData.company_name:""}--{jobData.JobLocation && jobData.JobLocation.length>0 ? jobData.JobLocation:"" } </div>
      </div>


<div className='mx-auto mt-5 application-first-body shadow bg-white p-4  flex-column    object-fit-fill border rounded '>
    <Text className='fs-5 fw-bold'>Please Review Your Application</Text>
    <Text className='text-secondary fw-medium' >Contact Information</Text>
    <div className='user-info shadow object-fit-fill border rounded p-3 mb-4'>
        <span className='text-secondary key'>Full Name</span>
        <Text className='fw-medium  value'>Prasad Metkar</Text>
        <hr></hr>
        <span className='text-secondary key'>Email</span>
        <Text className='fw-medium  value'>Prasadmetkar333@gmail.com</Text>
        <hr></hr>
        <span className='text-secondary key '>Location</span>
        <Text className='fw-medium  value'>Hyderabad Telangana</Text>
        <hr></hr>
        <span className='text-secondary key'>Mobile Number</span>
        <Text className='fw-medium  value'>+91 9307173845</Text>
    </div>
    <Text className='text-secondary fw-medium ' >CV</Text>
    <div className='object-fit-fill border rounded shadow p-3 mb-4'>
    <span className='' > <FaRegFilePdf  className='d-inline fs-4' style={{"width":"100px"}}/></span><Link to="" className='value text-primary text-decoration-underline' >Prasad_Metkar_Resume.pdf</Link>


    </div>
    <Text className='text-secondary fw-medium' >Your Chances</Text>
    <div className='object-fit-fill border rounded shadow p-3 mb-4 '>
    
        <Text className='text-center fw-bold'> 54%</Text>
        <span className='text-secondary text-center warning'>( Low chances indicates you don't have sufficient requirements for job. Don't apply for job if you're chances is less that 35%, If you apply it will make bad impact on your profile.  )</span>
    </div>




</div>
<div className=' mt-3 mb-5 mx-auto d-flex justify-content-around   flex-row application-first-body '>
<button onClick={()=>{appliedJob(jobData._id)}} className=' submit-button shadow btn btn-primary' data-toggle="modal" data-target="#exampleModalCenter" >Submit </button>
<Link to="/main" className=' submit-button shadow btn btn-danger'>Cancel</Link>
</div >



<div className="modal fade" id="exampleModalCenter"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
    
      <div className="modal-body">
        {
            getError.status===500 ?<div className='text-center'>
                 <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR1YxzO29WdMekQweLMPHh5zFlT5HRwfVmhh3IH08syg1bpdPtf" alt="Application Successfully" className='d-block mx-auto ' style={{"width":"200px", "heigh":"100px"}}/>
                <div>You Did It !</div>
                <span>Your application was sent!</span>
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

      
        {/* </div> */}
    </>
  )
}

export default Application

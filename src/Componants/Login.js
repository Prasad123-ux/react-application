import React, { useState } from 'react'
import "../Styles/login.css"
import { useToast } from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
// import GoogleSignIn from './GoogleSignIn';




// const navigate=useNavigate()

function Login() {
  const toast= useToast()

  const [loginData, setLoginData]= useState({email:"",password:""})
  const [otpEmailValue,setOtpEmailValue]= useState()
  const [otp,setOtp]= useState()
  

  const navigate= useNavigate()


const navigateRegister=()=>{
  navigate('/registration')




}
const handleForgetPassword=(e)=>{
      e.preventDefault()

      fetch('   https://jobnexus-backend.onrender.com/api/candidate/forgetPassword',{
        method:"POST",
        body:JSON.stringify({otpEmailValue}),
        headers:{
          "content-type":"application/json"
        }
      }).then((response)=>{
        if(response.status===400){

          addToast('User Not Found',response.statusText, "error")
          throw new Error(response.statusText)
        }else{
          return response.json()
        }

        
      }).then((data)=>{
        if(!data.success){
          addToast(data.message,data.error, "error")
        }
        addToast(data.message, data.message,"success")
      

      })
      .catch((err)=>{
        console.log(err)

      })
}



const handleLoginData=async (e)=>{
  e.preventDefault()

   await fetch('   https://jobnexus-backend.onrender.com/api/candidate/loginCandidate',{
    method:"POST",
    body:JSON.stringify({data:loginData}),
    headers:{
      "Content-type":"application/json"
    }
  }).then((response)=>{
    console.log(response)
    if(response.status===404){
      

      
      addToast('User Not Found',response.statusText, "error")
      throw new Error(response.statusText)
    }else{
      return response.json()
    }

  }).then((data)=>{
    
    
    if(data.success===false){
       return addToast(data.message,data.error, "error")
    }
    navigate('/main')
    addToast(data.message, data.message,"success")
    console.log(data)


  }).catch((err)=>{
    console.log(err.message)

  })

}
 const onchange=(e)=>{
  setLoginData({...loginData,[e.target.name]:e.target.value})

}



const addToast=(title,message="", status)=>{
  toast({
    title: title,
    description: message,
    status: status,
    duration: 10000,
    isClosable: true,
  })
}

  return (
    <div className='login-page d-flex justify-content-center  ' style={{"backgroundColor":"#FAFAFA"}}>
      <div className='login-form shadow  p-4  rounded-5  mt-5' style={{"backgroundColor":"#FFFFFF"}} >
        <span className='fw-medium d-block fs-4'>Login</span>
        <form onSubmit={handleLoginData}>
        <div className="col-md-12 col-12 mt-3 ">
    <label htmlFor="validationDefault01" className="form-label">Email</label>
    <input type="email" className="form-control rounded-4" id="validationDefault01"  placeholder="Enter Email ID / Username" value={loginData.email}  onChange={onchange} name="email" style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <div className="col-md-12 col-12 mt-3">
    <label htmlFor="validationDefault02" className="form-label">Password</label>
    <input type="password" className="form-control rounded-4" id="validationDefault02"  name="password" value={loginData.password}  placeholder="Enter Password"  onChange={onchange} style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <button   className='d-flex forget-btn  btn-link justify-content-start mt-3 w-25' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Forget Password ?</button>
  <button   type='submit' className=' login-btn btn btn-primary  mt-4 w-50 ' style={{"backgroundColor":"#4A90E2"}}>Login</button>
        </form>
          <button   className='text-primary mx-auto btn-link d-flex justify-content-center mt-1 w-50'>Use OTP to Login</button>
         <span className='d-flex justify-content-center mt-3'>or </span>
         {/* <button className='btn shadow rounded-5 text-secondary fw-medium d-flex justify-content-around w-75 mx-auto mt-3' style={{backgroundColor:"white"}}>  <FcGoogle className='mt-1' style={{width:"30px"}} />Sign in with Google</button> */}
       {/* <div><GoogleSignIn/></div> */}

      </div>
      <div className='login-detail shadow mt-5  ms-2 p-5 rounded-5' style={{"backgroundColor":"#FFFFFF"}} >
        <div className='fw-medium fs-4'> New to Jobify ?</div>
        <div className='d-flex justify-content-between mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span className='ms-3'>One click apply using Jobify profile.</span>
        </div>
        <div className='d-flex justify-content-between mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span className='ms-3'>Get relevant job recommendations.</span>
        </div>
        <div className='d-flex justify-content-between mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span className='ms-3'>Showcase profile to top companies and consultants.</span>
        </div>
        <div className='d-flex justify-content-between mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span className='ms-3'>Know application status on applied jobs.
          </span>
        </div>
        <div className='d-flex justify-content-between mt-5'>
          <button onClick={navigateRegister} className='text-primary bg-white btn   border w-50 p-2  border-primary' >Register for Free</button>
        </div>
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQY3kRO9-yVxLT6ParUDJkZLEVjVVvj3SOZgeuIkFhtQHd3Uh9U" className=' w-25 d-flex mt-5 mx-auto' alt=""/>

      </div>
      
{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> */}


<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Forget Password</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <button className='btn shadow rounded-5 text-secondary fw-medium d-flex justify-content-around w-75 mx-auto mt-3' style={{backgroundColor:"white"}}>  <FcGoogle className='mt-1' style={{width:"30px"}} />Sign in with Google</button>
<form className='form  mt-5'>

<div className="col-md-12 ">
    <label htmlFor="validationDefault01" className="form-label"> Email</label>
    <input type="email" className="form-control text-center" id="validationDefault01" name="forgetEmail" placeholder="Enter Email ID" value={otpEmailValue}  onChange={(e)=>{setOtpEmailValue(e.target.value)}} required/>
  </div>
  <button disabled={otpEmailValue==="" ? true:false} onClick={handleForgetPassword}  className=' login-btn btn btn-primary  mt-4 w-50 '  style={{"backgroundColor":"#4A90E2"}}>Get OTP</button>


  
  
  <div className="col-md-12 mt-3">
    <label htmlFor="validationDefault02" className="form-label">OTP</label>
    <input type="number" className="form-control text-center" id="validationDefault02"  name="otp" value={otp} placeholder="Enter OTP" onChange={(e)=>{setOtp(e.target.value)}} required/>
  </div>
  <button   to="/"  className='btn d-flex justify-content-start btn-link  '>Resend OTP</button>
  <button disabled={otp=== "" ? true:false} type='submit' className=' login-btn btn btn-primary  mt-4 w-50 '  data-bs-dismiss="modal" style={{"backgroundColor":"#4A90E2"}}>Submit</button>

  
</form>
        
      </div>
      <div className="modal-footer">
      
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login

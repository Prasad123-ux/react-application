import React, { useState } from 'react'
import "../Styles/registration.css"
import { useNavigate } from 'react-router-dom'
import {  useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setTokenData } from './Redux/jobSlice'
import { useEffect } from 'react'




function Registration() {
  const [userData, setUserData]= useState({fullName:"", email:"", password:"", mobileNumber:"", city:"", workStatus:""})
  const navigate= useNavigate()
  const toast= useToast()
  const [loading, setLoading]= useState(false)  
  const dispatch= useDispatch() 
  const tokenValue= useSelector((state)=>state.jobs.token)
  
  
  useEffect(()=>{
    console.log(tokenValue)
  }, [tokenValue])

  const handleSubmitData=async(e)=>{
    e.preventDefault()  
    setLoading(true)
    try{
   const response= await   fetch('   http://localhost:5000/api/candidate/registerCandidate', {
        method:"POST",
        body:JSON.stringify({token:tokenValue, userData:userData}),
        headers:{
      "Content-type":"application/json"
        }
      }) 
      if(!response.ok){
        const errorText=await response.text()
        throw new Error(`Problem with status ${response.status}:${errorText}`)
      }else{
        const data = await response.json()
        window.localStorage.setItem('token',data.token)  
        console.log(data.token)
        dispatch(setTokenData(data.token))
        addToast("Registration Successful",data.message, "success") 
        navigate("/main")

      }
    }
      catch(err){ 
        addToast("Registration Failed",err.message, "error") 
      

      }finally{
        setLoading(false)

      }
      
      
  }
  const onchange=(e)=>{
  
    setUserData({...userData, [e.target.name]:e.target.value})
  } 




const addToast=(title,message, status)=>{
  toast({
    title: title,
    description: message,
    status: status,
    duration: 10000,
    isClosable: true,
  })
}





  return (
    <div className='registration' style={{"backgroundColor":"#F8F9FA"}}>
      <div className='registration-form mx-auto p-5' style={{"backgroundColor":"#FFFFFF"}}>
        <div className='fw-medium fs-3' >Create your Jobify Profile</div>
        <span className='text-secondary'>Search & apply to jobs from India's No.1 Job Site</span>
        <form onSubmit={handleSubmitData}>
        <div className="form-row mt-5">
    <div className="form-group col-md-12">
      <label htmlFor="inputFullName">Full Name <span className='text-danger'> *</span></label>
      <input type="name" className="form-control rounded-3" id="inputFullName" name="fullName" value={userData.fullName}  onChange={onchange} placeholder="FullName" required/>
    </div>
    <div className="form-group col-md-12">
      <label htmlFor="inputEmail">Email <span className='text-danger'> *</span></label>
      <input type="email" className="form-control rounded-3" id="inputEmail" name="email"  value={userData.email} onChange={onchange} placeholder="Email" required/>
    </div>
    <div className="form-group col-md-12">
      <label htmlFor="inputPassword">Password <span className='text-danger'> *</span></label>
      <input type="password" className="form-control rounded-3" id="inputPassword" name="password" value={userData.password} onChange={onchange} placeholder="Password" required/>
    </div>
    <div className="form-group col-md-12">
      <label htmlFor="mobileNumberInput">Mobile Number <span className='text-danger'> *</span></label>
      <input type="number" className="form-control" rounded-3 id="mobileNumberInput" name="mobileNumber"  value={userData.mobileNumber}   onChange={onchange} placeholder="Mobile Number" required/>
    </div>
    <div className="form-group col-md-12 ">
    <label htmlFor="cityInput">City <span className='text-danger'>*</span></label>
    <input type="text" className="form-control" id="cityInput" placeholder="Mention your city you live in" value={userData.city} name="city" onChange={onchange} required/>
  </div>


  <span className=' d-block ' > Work Status</span>
  <span className='text-secondary'>We will personalize your Jobify experience based on this</span>
  <div className='radio-button d-flex mt-3  mb-3'>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="workStatus" id="fresher"  value="Fresher"  onChange={onchange}  required/>
  <label className="form-check-label" htmlFor="fresher">
  I'm recently graduated !
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="workStatus" id="experienced" value="Experienced"  onChange={onchange} required/>
  <label className="form-check-label" htmlFor="experienced">
    I have Experience !
  </label>
</div>
</div>
  <div className="form-check">
      <input className="form-check-input " type="checkbox" value="" id="checkInput" required/>
      <label className="form-check-label" htmlFor="checkInput">
        Agree to terms and conditions
      </label>
      </div>
      </div>
      <div className='d-flex justify-content-between '>
    {  loading ? <div>Loading...</div>:<button type="submit" className='btn btn-primary  mt-5'> Submit</button>}
      <span className='text-center mt-5 ms-5' >Already Registered? <Link to="/login"  className='text-primary'>Login</Link> here</span>
      </div>
        </form>
      </div>
     
      
    </div>
  )
}

export default Registration

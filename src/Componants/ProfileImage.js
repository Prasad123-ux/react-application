import { Avatar, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react' 
import { useToast } from '@chakra-ui/react' 
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function ProfileImage() { 


    const [avatarUrl, setAvatarUrl]= useState('https://bit.ly/broken-link') 
    const [loading, setLoading]= useState(false)  
    const  toast = useToast() 
    const token = localStorage.getItem('token') 
    const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers)


    const handleFileChange=async(event)=>{
        const file=event.target.files[0]
        if(file){
            setLoading(true);
        }
        try{ 
            console.log(file)
            const formData= new FormData() 
            formData.append('image', file)  
            console.log(formData)

            const response=  await fetch('http://localhost:5000/api/candidate/profile/uploadProfileImage', {  
                method:"POST", 
                body:formData,  
                headers: {
                    Authorization: `Bearer ${token}`,
                      // Include the token for authenticated requests
                  },
                 
            
            })
            const data= await  response.json() 
            setLoading(false)
            
       console.log(data)
       addToast("Profile Photo uploaded Successfully", 'success')  
        }catch(err){  
            setLoading(false)
            addToast(err.message, 'error')

        }
    } 
  


    const addToast=(title,status)=>{
        toast({title: title,
          
          status: status,
          duration: 5000,
          isClosable: true})
       
      } 
      
  return (
    <div> 
      <Avatar src={jobSeekerData.extraFields?.profileImage && jobSeekerData.extraFields?.profileImage.length>=1 ?jobSeekerData.extraFields?.profileImage:"" }   size="2xl" cursor="pointer" onClick={()=>document.getElementById("avatar-input").click()}/> 
      {loading && <Spinner size="xl" /> } 

      <input type='file' id="avatar-input" accept="image/*" style={{display:"none"}} onChange={handleFileChange}/>
    </div>
  )
}

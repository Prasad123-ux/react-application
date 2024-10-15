import React, { useEffect, useState } from 'react'
import { Text, useStatStyles } from '@chakra-ui/react' 
import { CiMail } from "react-icons/ci"; 
import "../Styles/Profile.css"
import { useSelector } from 'react-redux'; 
import { Alert, AlertIcon } from '@chakra-ui/react'; 
import { CgProfile } from "react-icons/cg"; 
import { GrResume } from "react-icons/gr"; 
import { MdOutlineCastForEducation } from "react-icons/md"; 
import { HiOutlineOfficeBuilding } from "react-icons/hi"; 
import { GrCertificate } from "react-icons/gr"; 
import { LiaAwardSolid } from "react-icons/lia"; 
import { LiaProjectDiagramSolid } from "react-icons/lia";

 
export default function RemainingDetails() {   
  const [nameValue,setNameValue]= useState({resume:20, profileImage:20, education:10, experience:10, certification:10, project:10, accomplishment:10})
  const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers)   
  const [totalValue,setTotalValue]= useState()  
  const [score,setScore]= useState(0) 
  const [status, setStatus]= useState("error") 
  const [message, setMessage]= useState("what dfd")
  

  useEffect(() => {
    const value = getMessage(score);
    setMessage(value);
    // Change status based on the score
    if (score >= 100) {
      setStatus("success");
    } else if (score >= 50) {
      setStatus("info");
    } else {
      setStatus("warning");
    }
  }, [score]);  


  const getMessage = (score) => {
    switch (true) {
      case score === 0: 
      return "You haven't started building your profile.";
      case score <= 25:
        return "Your profile is just getting started. Add more details!";
      case score <= 50:
        return "You're halfway there! Keep going to improve your profile.";
      case score <= 75:
        return "Great progress! Just a few more steps to complete your profile.";
      case score < 100:
        return "Almost there! Complete the final details for a perfect profile.";
      case score === 100:
        return "Congratulations! Your profile is fully completed.";
      default:
        return "Invalid score";
    }
  };

 
  const handleTotalScore=(()=>{ 
    if(jobSeekerData.extraFields?.resume && jobSeekerData.extraFields?.resume.length>=1){   
      setScore((prevScore)=>prevScore+nameValue.resume)
      

    }
    if(jobSeekerData.extraFields?.profileImage && jobSeekerData.extraFields?.profileImage.length>=1){   
      setScore((prevScore)=>prevScore+nameValue.profileImage)
      

    }
    if(jobSeekerData.extraFields?.Education && jobSeekerData.extraFields?.Education.length>=1){   
      setScore((prevScore)=>prevScore+nameValue.education)
      

    }
    if(jobSeekerData.extraFields?.Experience && jobSeekerData.extraFields?.Experience.length>=1){   
      setScore((prevScore)=>prevScore+nameValue.experience)
      

    }
    if(jobSeekerData.extraFields?.Certification && jobSeekerData.extraFields?.Certification.length>=1){   
      setScore((prevScore)=>prevScore+nameValue.certification)
      

    }
    if(jobSeekerData.extraFields?.Projects && jobSeekerData.extraFields?.Projects.length>=1){   
      setScore((prevScore)=>prevScore+nameValue.project)
      

    }
    if(jobSeekerData.extraFields?.Accomplishment && jobSeekerData.extraFields?.Accomplishment.length>=1){   
      setScore((prevScore)=>prevScore+nameValue.accomplishment)
      

    }
  console.log(score)

  })
 
  return (
    <>
     
    <div  className='main-field'>
    


      { jobSeekerData.extraFields?.resume && jobSeekerData.extraFields?.resume.length>=1 ? "" :<div className='d-flex justify-content-between flex-row fields mx-auto' >
            <div className='d-block  '> 
              
            <Text className='d-flex justify-content-between text-secondary d- '><GrResume   style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add Resume</span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>{nameValue.resume}%</span>  </Text>


            </div>

           </div> }  
                  
                
           { jobSeekerData.extraFields?.profileImage && jobSeekerData.extraFields?.profileImage.length>=1 ? "":  <div className='d-flex justify-content-between flex-row fields mx-auto' >
            <div className='d-block  '> 
              
            <Text className='d-flex justify-content-between text-secondary d- '><CgProfile   style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add Profile Image</span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>{nameValue.profileImage}%</span>  </Text>


            </div>

           </div>
}
         {    jobSeekerData.extraFields?.Education && jobSeekerData.extraFields?.Education.length>=1 ? "":    <div className='d-flex justify-content-between flex-row fields mx-auto' >
            <div className='d-block  '> 
              
            <Text className='d-flex justify-content-between text-secondary d- '><MdOutlineCastForEducation    style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add Education</span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>{nameValue.education}%</span>  </Text>


            </div>

           </div> } 


            {    jobSeekerData.extraFields?.Certification && jobSeekerData.extraFields?.Certification.length>=1 ? "": <div className='d-flex justify-content-between flex-row fields mx-auto' >
            <div className='d-block  '> 
              
            <Text className='d-flex justify-content-between text-secondary d- '><GrCertificate    style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add Certification</span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>{nameValue.certification}%</span>  </Text>


            </div>

           </div> 
           }
               {  jobSeekerData.extraFields?.Experience && jobSeekerData.extraFields?.Experience.length>=1 ? "":   <div className='d-flex justify-content-between flex-row fields mx-auto' >
            <div className='d-block  '> 
              
            <Text className='d-flex justify-content-between text-secondary d- '><HiOutlineOfficeBuilding   style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add Experience </span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>{nameValue.experience}%</span>  </Text>


            </div>

           </div> 
           }
          {   jobSeekerData.extraFields?.Accomplishment && jobSeekerData.extraFields?.Accomplishment.length>=1 ? "":  <div className='d-flex justify-content-between flex-row fields mx-auto' >
            <div className='d-block  '> 
              
            <Text className='d-flex justify-content-between text-secondary d- '><LiaAwardSolid   style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add Accomplishment</span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>{nameValue.accomplishment}%</span>  </Text>


            </div>

           </div>  

           }
              {  jobSeekerData.extraFields?.Projects && jobSeekerData.extraFields?.Projects.length>=1 ? "": <div className='d-flex justify-content-between flex-row fields mx-auto' >
            <div className='d-block  '> 
              
            <Text className='d-flex justify-content-between text-secondary d- '><LiaProjectDiagramSolid  style={{"width":"40px" ,"height":"20px"}} className='d-inline bg-white rounded-circle' /><span className=' ms-3'>Add Projects</span>  </Text>


            </div>
            <div className=' w-25 text-success  rounded-circle' > 
                          <Text className='d-flex justify-content-between text-secondary text-success '> <span className=' ms-3'>{nameValue.project}%</span>  </Text>


            </div>

           </div> 
           }
                
                

                <Alert status={status}>
    <AlertIcon />
    {message}
  </Alert>
        
  
         </div>
    
    <button className='btn btn-primary     fields-btn mx-auto' style={{"backgroundColor":"#F05537"}} onClick={handleTotalScore}> {score === 0   ? " Profile Score is Low": "Profile Score    "   + score +"%"}  </button>
</>
  )
}

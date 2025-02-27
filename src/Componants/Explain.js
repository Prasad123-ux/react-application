// import { response } from 'express'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPersonWorkspace } from "react-icons/bs";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { CiLocationOn, } from "react-icons/ci";
import "../Styles/explain.css"
import { Text} from '@chakra-ui/react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import Footer from './Footer.js';
import { useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


function Explain() {

    const [jobData, setJobData]= useState([])
    const [companyData, setCompanyData]= useState([])
    const [similarJobData, setSimilarJobData]= useState([])
    const [saveValue, setSaveValue]= useState("Save")
     const {id}= useParams();
     const location= useLocation()
     const navigate= useNavigate()
     const [saved, setSaved]=useState(false)
    //  const tokenValue= useSelector((state)=>state.jobs.token) 
     const toast= useToast()
     const tokenValue=localStorage.getItem("token")
     const [loading, setLoading]=useState(false)    

     const { companyInfo } = location.state   || {}   




    
     


     const months=["jan", "Feb", "March", "April", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"]

     
    


    



useEffect(()=>{  
    window.scrollTo(0,0) 
    console.log(companyInfo)

const findJobExplainDetail= async ()=>{
    try{
        await fetch(`   https://jobnexus-backend.onrender.com/api/candidate/getJobByID/${id}`,{
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
            // console.log(data)
            setJobData(data.Data)
            

        }).catch((err)=>{
            // console.log("error at fetching data",err)

        })
    }catch(err){
        

    }
}

findJobExplainDetail()
              

},[id])






useEffect(()=>{
    if (jobData.CompanyEmail) {

    const findCompanyData= async ()=>{
         await fetch('   https://jobnexus-backend.onrender.com/api/company/getProfileData', {
            method:"POST",
            body:JSON.stringify({email:jobData.CompanyEmail}),
            headers:{
                "Content-type":"application/json"
            }
        }).then((response)=>{
            if(!response.ok){
                throw new Error(response.statusText)
            }else{
                return  response.json()
            }

        }).then((data)=>{
            console.log(data)
            setCompanyData(data.Data)

        }).catch((err)=>{
            console.log(err)
        })

    }

        findCompanyData()
    
    }

}, [jobData.CompanyEmail])


useEffect(()=>{

   
    if(jobData){
    const findSimilarJob=async ()=>{
       await fetch(`   https://jobnexus-backend.onrender.com/api/candidate/getSimilarJob?location=${encodeURIComponent(jobData.JobLocation)}&role=${encodeURIComponent(jobData.JobTitle)}`,{
            method:"get",
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
            console.log(data.data)
            setSimilarJobData(data.data)
            console.log(similarJobData)


        }).catch((err)=>{
            console.log(err)
            
        })
    }


    findSimilarJob()
    }
},[]) 




const handleSaveJob=async (id)=>{
    if(saved){
        addToast("Job Already Saved","jj","warning")
        return 
    }
    setLoading(true)
if(tokenValue){
try{
    const response= await fetch(`   https://jobnexus-backend.onrender.com/api/candidate/save_Job/${id}`, {
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({email:jobData.CompanyEmail, token:tokenValue, companyName:jobData.company_name, JobTitle:jobData.JobTitle, location:jobData.JobLocation})

    
        
    })
    const result = await response.json()
    if(!response.ok){
        
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }
    setSaved(true)
    addToast(result.message || "Job Saved Successfully", "", "success");
}catch(err){
    addToast(err.message || "An error occurred", "Job Not Saved", "error");
}
finally{
    setLoading(false)
}
}else{
    addToast("Please Login Yourself", "using login you can access more information about job and access to more content", "warning")
    return 
}
}



const handleApplyJobClick=(id)=>{ 
    if (tokenValue ){
        navigate("job_detail/job_application", {state  :  {jobData}});

    }else{
  addToast("Please Login Yourself", "using login you can access more information about job and access to more content", "warning")
  return 
        
    }
  
}



 







const handleButtonClick=(id)=>{
    navigate("/job_detail/job_application", {state  :  {jobData}});

  }


  const addToast=(title,message="", status)=>{
    toast({
      title: title,
      description: message,
      status: status,
      duration: 6000,
      isClosable: true,
    })
  }



  const handleReportJob=(id)=>{
    navigate(`/job_detail/reportJob/${id}`)
  }

  return (
   <> 

    <div className=' w-100   d-flex justify-content-center explain  flex-column flex-md-row ' style={{"backgroundColor":"#F8F9FA"}}>
        <div className='first-block me-0 me-lg-5 mt-5'>
        
        <div className='heading-name bg-white shadow  p-4   ' style={{"borderRadius":"10px"}}>
            <div className='d-flex justify-content-center align-items-center'>
            <div>
                <span className='d-block fw-bolder fs-5'>{jobData.JobTitle}</span>
                <span className='' style={{"color":"gray"}}>{companyData.CompanyName}</span>

            </div>
            <img className='d-block w-25 '  src="https://www.google.com/imgres?q=infosys%20company%20logo&imgurl=https%3A%2F%2Fzeevector.com%2Fwp-content%2Fuploads%2FInfosys-Logo-White-PNG.png&imgrefurl=https%3A%2F%2Fzeevector.com%2Finfosys-logo%2F&docid=6TSDUtKkj5M2UM&tbnid=ATguWA8acKlR0M&vet=12ahUKEwjj0v69yNSHAxW1zTgGHd-lMuMQM3oECF8QAA..i&w=532&h=287&hcb=2&ved=2ahUKEwjj0v69yNSHAxW1zTgGHd-lMuMQM3oECF8QAA" alt={jobData.company_name}/>
            {/* <do></do> */}
            </div>
            <div className=' d-flex justify-content-around align-items-center'>
<div className='mt-4'>
     <BsPersonWorkspace className=' d-inline mb-1'   style={{"width":"30px"}}/>  
    <span   >  { jobData.JobMinExperience && jobData.JobMaxExperience ? `${jobData.JobMinExperience}- ${jobData.JobMaxExperience} Years`:"0 Yrs"} </span>|
    <BsCurrencyRupee  className="d-inline ms-2 mb-1" style={{"width":"30px"}}/>
    <span   > {jobData.JobMaxSalary  && jobData.JobMinSalary ?`${jobData.JobMinSalary}-${jobData.JobMaxSalary} Lacs PA`: "Not Disclosed"}  </span>
    <div>
    <CiLocationOn className='d-inline mb-1  fs-5' style={{"width":"35px"}}/>
    <span >  { jobData.JobLocation? `${jobData.JobLocation}` :"Not Mentioned"}</span>
    </div>
    
</div>
<Link to="" className='text-primary  d-sm-block d-none' style={{"width":"200px"}}>Send  job like this</Link>
{/* <span href=""> Send me job like this </span> */}
            </div>
{/* <hr className='text-primary'></hr> */}
<hr className='fs-2'></hr>


<div className='mt-3 d-flex justify-content-between align-items-center '>
    <div className='footer-part  '>
        {/* <span className='posted'> Posted:</span> */}
      <span className='fw-light text-secondary ' >Posted:</span>  
       <span className='  me-5   pe-5 fw-medium '> {jobData.createdAt ? (`${months[new Date(jobData.createdAt ).getMonth()] } ${new Date(jobData.createdAt ).toUTCString().slice(5,7)}`):""}</span>

      <span className='fw-light text-secondary' > Applicant:</span> 
       <span className='application '> 502</span>
    </div>

    <div className='d-sm-flex justify-content-sm-end justify-content-end justify-content-md-around flex-md-row flex-column  '>
     { saveValue==="Save" && tokenValue!== null ? <button onClick={()=>{handleSaveJob(jobData._id)}} className='save-button  btn btn-outline-primary   rounded  '>
       {saveValue}
        </button>:<button disabled className=' save-button  btn btn-outline-primary   rounded '> {!saved ? "Save":"Saved"}</button>
}
        <button  onClick={()=>{handleApplyJobClick(jobData._id)}} className='apply-button btn-primary bg-primary  rounded'>Apply</button>
       
    </div>


</div>
        </div>


{ jobData.JobDescriptionSummary || jobData.JobKeyResponsibilities ? <div className='job-description heading-name shadow p-4 ' style={{"borderRadius":"10px"}}>
<Text className='fw-bold'> Job Description</Text>
<Text>{jobData.JobDescriptionSummary}</Text>
<ol type='i'>
    {jobData.JobKeyResponsibilities &&  jobData.JobKeyResponsibilities.length>1?


    jobData.JobKeyResponsibilities.split(".").map((item,index)=>{
        return <li key={index}>
         {item}
        </li>
    }):""
    }
  
</ol>
</div>:""
}
 {jobData.JobRequirements && jobData.JobRequirements.length>0 ? <div className='requirements heading-name shadow p-4 ' style={{"borderRadius":"10px"}}>
<Text className='fw-bold'> Job Requirements</Text>

    {/* <div className='experience-requirement'></div> */}

    { jobData.JobRequirements && jobData.JobRequirements.length>0 ? Object.entries(jobData.JobRequirements[0]).filter(([key,value])=>key!=="_id").map(([key, value],index)=>{
     return  ( value !==" " ?<div className='mt-2' key={value}> <span className='fw-bold text-secondary'>{key}:</span>   <span>  {typeof value === 'boolean' ?  (String(value)==="true" ? "Yes":"No"): value[0].toUpperCase()+value.slice(1)}</span>
                  </div>:"")
    }):"nothing"}

  
</div>:""}

{ jobData.JobCommonInfo && jobData.JobCommonInfo.length>0 ? <div className='jobCommonDetail heading-name shadow p-4 ' style={{"borderRadius":"10px"}} >
    <Text className='fw-bold '>Common Info</Text>

    {jobData.JobCommonInfo && jobData.JobCommonInfo.length>0 ? Object.entries(jobData.JobCommonInfo[0]).filter(([key, value])=>key !=='_id').map(([key,value], index)=>{
     return (  value.length>1 ? <div className='mt-1'> 
     <span className='fw-medium text-secondary mt-5'>{key}:</span>    <span className='ms-1'>{value[0].toUpperCase()+value.slice(1)}</span>
 </div>:"")
    }):""}
    
     
</div>:""
}
{ jobData.JobContact  ?<div className='social-info heading-name shadow p-4'>
    <Text className='fw-bold'>Contact Information</Text>
{jobData.JobContact && jobData.JobContact.length>0 ? Object.entries(jobData.JobContact[0]).filter(([key,value])=>key !=="_id").map(([key, value])=>{
return (value.length>1? <div> <span className=' fw-bold text-dark mt-3'>{key} :   </span>{value[0].toUpperCase()+value.slice(1)}</div>:"" )
}):""}
<div className='social-links  d-flex justify-content-start mt-4 d-flex justify-content-between'>
    
    <div className='d-flex justify-content-start'>
    <Link to ={companyData.CompanyFacebookProfile} style={{"width":"50px"}}  ><FaFacebookSquare className='text-primary fs-3'   style={{"width":"50px"}}/></Link>
    <Link to ={companyData.CompanyLinkedinProfile} style={{"width":"50px"}}><FaLinkedin className='text-primary fs-3'  style={{"width":"50px"}} /></Link>
    <Link to ={companyData.CompanyTwitterProfile} style={{"width":"50px"}}><FaTwitterSquare   className='text-primary fs-3'  style={{"width":"50px"}} /></Link>

    
    </div>
    <button className='text-primary fw-bold text-decoration-underline' onClick={()=>{handleReportJob(jobData._id)}}>Report This Job</button>
    

</div>
</div>:""
}


<div className='about-company heading-name shadow p-4 '>
<Text className='fw-bold'>About Company</Text>
<span>{companyInfo? companyInfo.CompanyDescription:''}</span>

<Text className='fw-bold mt-3'>Company Info</Text>
<div className='CompanyAddress'>
<span className='fw-bold text-secondary '>Address:</span><span>{companyInfo? companyInfo.CompanyAddress:""}</span>
</div>
        

</div>
<div className='about-company heading-name shadow p-4 '>
<Text className='fw-bold'>Beware of imposters!</Text>
<span>Jobify does not promise a job or an interview in exchange of money. Fraudsters may ask you to pay in the pretext of registration fee, Refundable Fee <Link to="" className='text-primary' >…Read more</Link></span>

</div>
{/* <Footer/> */}
    </div>
    <div className='similar-job  bg-white shadow  p-4 mt-5     style={{"borderRadius":"10px"}}'>
        <Text  className='fw-bolder'>Jobs you might be interested in </Text>
        { similarJobData && similarJobData.length>0  ? Object.entries(similarJobData).filter(([key,value])=>value._id !==jobData._id).map(([key,value])=>{
       return  <button className='similar-particular-job' onClick={()=>{handleButtonClick(value._id)}}>
 <div className='fw-bold'>{value.JobTitle}</div>
 <span>{value.CompanyEmail}</span>
 <div className='mt-2 d-flex justify-content-between'>
     <span className='location'><CiLocationOn className='d-inline' style={{"width":"25px"}}/>  { value.jobLocation && value.JobLocation.length>=1 ? value.JobLocation.slice(0,5) :""}... </span>
     <span className='posted '> Posted: {value.createdAt ? (`${months[new Date(value.createdAt ).getMonth()] } ${new Date(value.createdAt ).toUTCString().slice(5,7)}`):""}</span>
     
 </div>
 <hr></hr>
 </button>
        }):<button>FIND RELATED job</button>
       
            }
           
       
    </div>
  
    </div>
    <Footer/>
    </>

  )
}

export default Explain

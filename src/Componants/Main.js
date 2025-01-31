import React, {  useEffect, useState } from 'react';
import Job from './Job.js';
import { Box, Button, useDisclosure , } from '@chakra-ui/react';
import "../Styles/main.css"
import Loading from './Loading.js';
import Footer from './Footer.js';
import Heading from './Heading.js';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setFilteredJobs, setTokenData } from './Redux/jobSlice.js'; 
import { useToast } from '@chakra-ui/react';
import { CiCircleRemove } from "react-icons/ci";
// import { useDispatch } from 'react-redux';

// import { FaCircleArrowLeft } from "react-icons/fa6"; 
// import { FaCircleArrowRight } from "react-icons/fa6";

 

const Main = () => {
  

const toast= useToast()
const dispatch= useDispatch()
const [loading, setLoading]= useState(false)

  const [data, setData] = useState([]); // Initialize data as an object with a results property 
  const [page, setPage]= useState() 
  
  const allJobs = useSelector((state) => state.jobs.jobs);  
  const filteredJobs = useSelector((state) => state.jobs.filteredJobs);  
  const tokenValue=useSelector((state)=>state.jobs.token)
  const [filterLength, setFilterLength]= useState(0) 
  const [error, setError]= useState()

  


useEffect(()=>{ 
  window.scrollTo(0,0)

  const length=  filteredJobs && filteredJobs.length>=1 ? filteredJobs.length:0
  setFilterLength(length)
}, [filteredJobs])





   useEffect(() => {
    const fetchData = async () => {
      try {
       setLoading(true) 
      
        //  const response = await fetch(`https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=04e0dcfa&app_key=e3c1a3d7bebf84066e7a64f6d3a38dc1&results_per_page=100&salary_max=${maximumSalary}&part_time=${part}&full_time=${full}&salary_min=${minimumSalary}&max_days_old=${lastDays}&what_or=${job}&where=${location}`);
         const response=await fetch('   https://jobnexus-backend.onrender.com/api/candidate/getAllJobs')
         
         if(!response.ok){
            const errorText= await response.text() 
            throw new Error(`Request failed with status ${response.status}:${errorText}`)
         }else{
          // addToast("We are Finding jobs related to you ", "Please Wait" , "warning")
          const result = await response.json();
         
          
        
         setData(result.Data);   
        

         }
        
       

         
      
      } catch (error) {
        addToast(error.message, "error" , "error")
        setError(error.message)
        
        
      }finally{ 
        setLoading(false)

      }
    };

    fetchData();
  },[]);

  

  

  const  handleDeleteJob=(id)=>{
    console.log(data.results)
    const updatedJobs=data.filter( job=> job._id !== id); //this function is for "not interested" component  

    setData(updatedJobs)       

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


  const deleteFilter=()=>{
     dispatch(setFilteredJobs(""))   
          
    
  }

  return (
    
    <Box className='main-box ' backgroundColor={'#F8F9FA'}> 
    { filteredJobs && filteredJobs.length>=1 ?  <div className='w-75  ps-2 pe-2 pt-2 pb-2 mx-auto shadow d-flex justify-content-between'><span>Filter Applied </span><button  className='btn btn-danger icons fw-bold bg-danger' onClick={deleteFilter}> <CiCircleRemove  /></button></div>:""}
    {loading ? 
    <div> <Loading/> </div>
    
    :error ? 
    <div className="text-danger text-center">{error}</div>:
    filterLength===0 ?  
      <div className=' row  mx-auto'>
       <div className='col-lg-3 filters   d-none d-lg-block mx-auto mb-5'>
     <Heading/> 
     
     </div>   
     <div className='col-lg-8   col-12  mx-auto   jobs '> 
    {data && data.length>0 ?(
       data.map((job)=>{
          return <div key={job._id} className='mx-auto'>
            <Job id={job._id} title={job.JobTitle}  employment_type={job.JobCommonInfo.EmploymentType}  location={job.JobLocation} maxSalary={job.JobMaxSalary}  minSalary={job.JobMinSalary} description={job.JobDescriptionSummary} minExperience={job.JobMinExperience} maxExperience={job.JobMaxExperience}    requirement={job.JobRequirements}  onDelete={handleDeleteJob} neededSkills={job.JobRequirements.NeededSkillsAndTechnologies} company_name={job.company_name} postedDate={job.createdAt}  />
              </div>
        })
      )
      : 
      ("No jobs Available")   
    }      

    
 </div>    
    </div>
:



  


    <div className=' row mx-auto '>
      
      <div className='col-md-3 filters  col-12  d-none d-lg-block mx-auto '>
 <Heading/> 
 
 </div>  
 <div className='col-md-8  col-12  mx-auto jobs '> 
{ filteredJobs && filteredJobs.length>=1 ?(
  
  filteredJobs.map((job)=>{
      return <div key={job._id}>
        <Job id={job._id} title={job.JobTitle}  employment_type={job.JobCommonInfo.EmploymentType}  location={job.JobLocation} maxSalary={job.JobMaxSalary}  minSalary={job.JobMinSalary} description={job.JobDescriptionSummary} minExperience={job.JobMinExperience} maxExperience={job.JobMaxExperience}    requirement={job.JobRequirements}  onDelete={handleDeleteJob} neededSkills={job.JobRequirements.NeededSkillsAndTechnologies} company_name={job.company_name} postedDate={job.createdAt}  />
        
        
        </div>
    })
  ): 
  
  
  
  ("")
}     

</div>    
</div>



}  
<Footer/>

  </Box>
 
    
  );
};

export default Main;

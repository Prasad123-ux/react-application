import React, {  useEffect, useState } from 'react';
import Job from './Job.js';
import { Box, Button  } from '@chakra-ui/react';
import "../Styles/main.css"
import Loading from './Loading.js';
import Footer from './Footer.js';
import Heading from './Heading.js';

// import { FaCircleArrowLeft } from "react-icons/fa6"; 
// import { FaCircleArrowRight } from "react-icons/fa6";

 

const Main = () => {
  



const [loading, setLoading]= useState(false)

  const [data, setData] = useState([]); // Initialize data as an object with a results property 
  const [page, setPage]= useState()
  



  


  



  useEffect(() => {
    const fetchData = async () => {
      try {
       setLoading(true)
        //  const response = await fetch(`https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=04e0dcfa&app_key=e3c1a3d7bebf84066e7a64f6d3a38dc1&results_per_page=100&salary_max=${maximumSalary}&part_time=${part}&full_time=${full}&salary_min=${minimumSalary}&max_days_old=${lastDays}&what_or=${job}&where=${location}`);
         const response=await fetch('http://localhost:5000/api/candidate/getAllJobs')
         console.log(response)   
        setLoading(true)
        const result = await response.json();
         setLoading(false)

         setData(result.Data); 
      
      } catch (error) {  
         setLoading(true)
        console.error("Failed to fetch your data", error);
      }
    };

    fetchData();
  },[]);

  

  const  handleDeleteJob=(id)=>{
    console.log(data.results)
    const updatedJobs=data.filter( job=> job._id !== id); //this function is for "not interested" component
    setData(updatedJobs )

  }
 




   





  return (
    
    <Box className='main-box ' backgroundColor={'#F8F9FA'}> 
    dfjdkfjdjfjdj
    {loading ?  <Loading/>:
    <div className=' row mx-auto '>
      
      <div className='col-md-3 filters  col-12  d-none d-lg-block mx-auto mb-5'>
     <Heading/>
     </div>  
     <div className='col-md-8  col-12  mx-auto jobs '> 
    {data && data.length>0 ?(
      
      data.map((job)=>{
          return <div key={job._id}>
            <Job id={job._id} title={job.JobTitle}  employment_type={job.JobCommonInfo.EmploymentType}  location={job.JobLocation} maxSalary={job.JobMaxSalary}  minSalary={job.JobMinSalary} description={job.JobDescriptionSummary} minExperience={job.JobMinExperience} maxExperience={job.JobMaxExperience}    requirement={job.JobRequirements}  onDelete={handleDeleteJob} neededSkills={job.JobRequirements.NeededSkillsAndTechnologies} company_name={job.company_name} postedDate={job.createdAt}  />
            
            
            </div>
        })
      ): 
      
      
      
      ("")
    }     
    
    {/* <div className='pagination'>
    <Button isDisabled={page<=1 ? true : false }   colorScheme='teal' width={'150px'} variant={'outline'} size={{base:'xs', sm:'sm', md:'md',lg:'lg'}} letterSpacing={'10'}  ><FaCircleArrowLeft />Previous</Button>
  <Button variant={'outline'} colorScheme='teal' size={{base:'xs',sm:'sm', md:'md', lg:'lg'}} width={'150px'}>Next<FaCircleArrowRight /></Button>
  </div>  */}



    </div>
        



                     {/* This is our pagination section */}

      

  </div>
  }
    {/* <Footer />  */}

  </Box>
    
  );
};

export default Main;

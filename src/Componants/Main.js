import React, {  useEffect, useState } from 'react';
import Job from './Job.js';
import Heading from './Heading.js'
import { Button,Box  } from '@chakra-ui/react';
import './main.css'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
 import Loading from './Loading.js';
import Footer from './Footer.js';

 

const Main = (city, type) => {
  



const [loading, setLoading]= useState(false)
 const [buttonDisabled, setButtonDisabled]= useState(false)
 const [page, setPage]= useState(1)
 const [receivedData, setReceivedData]= useState('')
  const [data, setData] = useState({ results: [] }); // Initialize data as an object with a results property
  




  const days=['4','7','15','30'];
  const [lastDays, setLastDays]= useState('4')
  const jobType=['Accounts', 'Banking', 'Finance', 'Insurance', 'Data Analyst','Frontend Developer', 'Backend Developer','Full Stack Developer','Software Developer','Content Writer','Marketing','Cloud Computing','Customer Support','Software Developer','Administrator']
 const [job, setJob]= useState('')
const locations=["Delhi", "Pune", "Mumbai", "Hyderabad", "Bangalore","Indore","Lucknow","Chennai","Gurgaon","Noida","Kolkatta","Ahmadabad","Nasik","jaipur","Thane","Surat","Chandigarh","Vadodara","Mohali","Nagpur"]
 const [location, setLocation] =useState('');
 const maxSalary=['10000','20000','30000','40000','50000'];
const [maximumSalary, setMaximumSalary]= useState('60000000');
const minSalary=['9000','15000','25000','35000','45000']
const [minimumSalary, setMinimumSalary]=useState('12000')
const countrys=['in','ar','us','ca','gb','be','au','de','fr','nz','sg','pl','ru','za','mx','it','es','kr','er','kr','ar','sa','se','nz']
const [country, setCountry]= useState('in')
const fullTime=['1','0']
const [full, setFull]= useState('0')
const partTime= ['1','0']
const [part , setPart]=useState('0')




  const receivedDataFromChild=(data)=>{
  if(days.includes(data)){
      setLastDays(data)
  }
  else if(jobType.includes(data)){
    setJob(data)

  }
  else if(locations.includes(data)){
    setLocation(data)

  }
  else if( maxSalary.includes(data)){
    setMaximumSalary(data)

  }
  else if(minSalary.includes(data)){
     setMinimumSalary(data)
  }
  else if(countrys.includes(data)){
   setCountry(data)
  }
  else if(fullTime.includes(data)){
    setFull(data)
  }
  else if(partTime.includes(data)){
    setPart(data)
  }else{
    console.log('data not found')
  }


    
}

useEffect(()=>{
   

}, [city, type])





  useEffect(() => {
    const fetchData = async () => {
      try {
       setLoading(true)
        const response = await fetch(`https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=04e0dcfa&app_key=e3c1a3d7bebf84066e7a64f6d3a38dc1&results_per_page=100&salary_max=${maximumSalary}&part_time=${part}&full_time=${full}&salary_min=${minimumSalary}&max_days_old=${lastDays}&what_or=${job}&where=${location}`);
        setLoading(true)
        const result = await response.json();
         setLoading(false)
        console.log(result);
        

        if (result && result.results) {
          setData(result); // Set the entire result object 
        } else {
           setLoading(true)
          console.log("Data not found");
        }
      } catch (error) {  
         setLoading(true)
        console.error("Failed to fetch your data", error);
      }
    };

    fetchData();
  },[receivedData,lastDays,job, location,maximumSalary, minimumSalary, country, page, full, part]);



  const  handleDeleteJob=(id)=>{
    const updatedJobs=data.results.filter( job=> job.id !== id); //this function is for "not interested" component
    setData({results:updatedJobs })

  }
  
  const nextButton=()=>{
    setPage(page+1)
   }
   const previousButton=()=>{

    setPage(page-1)
   }




   





  return (
    <Box className='main-box' backgroundColor={'gray.300'}  pt={{base:'10', sm:'20', md:'20',lg:'20'}} pl={{base:'8', sm:'12',md:'0',lg:'0s'}}  >
    {loading ?  <Loading/>:
    <div>
      
  <Heading  onDataReceived={receivedDataFromChild}/>

      

      {/* Here we are mapping the data and passing to job component */}
      {
        data.results.map((job)=>{
          return <div key={job.key}>
            <Job key={job.id} title={job.title} company_name={job.company.display_name} employment_type={job.contract_time} country={job.location.area[0]} location={job.location.display_name} maxSalary={job.salary_max} minSalary={job.salary_min} description={job.description} experience={job.created} contract_type={job.contract_type} href={job.redirect_url} adref={job.adref} id={job.id} onDelete={handleDeleteJob}  />
            </div>
        })
      }
        



                     {/* This is our pagination section */}

        <div className='pagination'>
          <Button isDisabled={page<=1 ? true : false }  onClick={previousButton} colorScheme='teal' width={'150px'} variant={'outline'} size={{base:'xs', sm:'sm', md:'md',lg:'lg'}} letterSpacing={'10'}  ><ArrowLeftIcon/>Previous</Button>
        <Button onClick={nextButton} variant={'outline'} colorScheme='teal' size={{base:'xs',sm:'sm', md:'md', lg:'lg'}} width={'150px'}>Next<ArrowRightIcon/></Button>
        </div>

  </div>
  }
  <Footer/>
  </Box>
  );
};

export default Main;

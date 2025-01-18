import React, { useEffect, useState } from 'react' 
 import options from "../data.json"  
 import "../../Styles/allCompanies.css" 
 import { FcNext } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { response } from 'express';
import { setAllCompanies } from '../Redux/jobSlice';
import CompanyCard from './CompanyCard';
import { useToast } from '@chakra-ui/react';
export default function AllCompanies() { 
   const  [title,setTitle]= useState("Actively Hiring Companies ")  
   const [companyType, setCompanyType]= useState([])            
   const [heading, setHeading]=useState("Top Hiring Companies")
  //  const allJobs = useSelector((state) => state.jobs.jobs);   
   const allCompaniesData= useSelector((state)=>state.jobs.companies)

   const [findedCompany,setFindedCompany] = useState([])   
   const dispatch= useDispatch()
   const toast = useToast()



   useEffect(()=>{
    const  handleAllCompaniesData=async ()=>{

      try{ 
        const response= await  axios.get("http://localhost:5000/api/getAllCompanies")
          
          if(response.status !==200){ 
            addToast('Sorry Data Not Found ', "error")

            throw new Error(response.statusText)
          }else{
            dispatch(setAllCompanies(response.data.data))
            
          }

      }catch(err){  
        addToast(err.message, "error")

        console.log(err)

      }
    }


  handleAllCompaniesData()
   }, [])

   const findCompany=((industry)=>{      
    
    if(allCompaniesData && allCompaniesData.length>=1){ 
      
    const filterIndustry=allCompaniesData.filter((company)=>company.CompanyIndustry===industry ) 
    if(filterIndustry && filterIndustry.length>=1) {
    setFindedCompany(filterIndustry)  
    setHeading(industry)
    

    } else{  
      addToast(` Company not registered for ${industry} sector`, "warning")

      setFindedCompany("")  
      setHeading("Top Hiring Companies")

    }
   
    
    
    }else{
      console.log("we are finding")
    }



   }) 
   
     
   const addToast=(title,status)=>{
    toast({title: title,
      
      status: status,
      duration: 5000,
      isClosable: true})
  
  }
  
  
  

  return (  


    <div className=' row company-cards-page'>
        {/* <h1>{title}</h1> */}
        <div className='  company-slider col-sm-4 col-lg-3 col-12 '> { options.companyType && options.companyType.length>=1 ?
            options.companyType.map((item, index)=>{
                return <div className='  company-board mx-auto mt-2 shadow ' > <span className='company-type d-block'>{item} </span>    

                 <div onClick={()=>findCompany(item)}><span className='text-primary  company-number '> find Companies </span> <FcNext className='company-next d-inline' />  </div></div>  
            })
          :""  }

        </div> 

        <div className= 'col-sm-8 col-lg-9 col-12 row companies mx-auto'>  
          <h3 className='industry-heading'> {heading}</h3>
          { findedCompany && findedCompany.length>=1  ? 
        findedCompany.map((company, index)=>{
          return <div className='col-12 col-lg-6  company-main  col-md-12'> <CompanyCard name={company.CompanyName }       logo={company.CompanyLogo}/> </div>

        })
    : allCompaniesData && allCompaniesData.length>=1 ? allCompaniesData.map((company,index)=>{
      return <div className='col-12  col-lg-6 col-md-12'> <CompanyCard name={company.CompanyName }       logo={company.CompanyLogo} id={company._id}/> </div>
    }) :"" }

        </div>
      
    </div>
  )
}

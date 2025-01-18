import React, { useEffect,useState } from 'react' 
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom' 
import "../../Styles/companyProfile.css" 
import { FcRating } from "react-icons/fc";  
import axios from 'axios';
import ShowJobs from './ShowJobs';
import Job from '../Job';
import RecommendedJobs from './RecommendedJobs'; 
import { CiLocationOn, } from "react-icons/ci";
import Breadcumbs from './Breadcumbs'; 
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react' 
import { ChevronRightIcon } from '@chakra-ui/icons'; 
import { Link } from 'react-router-dom';
import OverView from './OverView';
import CompanyInfo from './CompanyInfo';




export default function CompanyProfile() {   
 
    const allCompany= useSelector((state)=>state.jobs.companies) 
    const {id}=useParams() 
    const [company,setCompany]= useState([]) 
    const [follow,setFollows]=useState("Follow") 
    const [followValue,setFollowValue]= useState(false) 
    const token= localStorage.getItem("token") 
    const [content, setContent]= useState(false)  
    const [breadcrumbs, setBreadcrumbs] = useState({
        "Home": "/",
        "top-Companies": "/companies",
        [company.CompanyName]:"/companis"

      });
         
    useEffect(()=>{  
        console.log(id)
        const particularCompany= allCompany.filter((item)=>item._id===id)  
        if(particularCompany&& particularCompany.length>=1){
            setCompany(particularCompany[0])  

        }
        

    }, [id]) 



    const handleFollow= async (id)=>{  
        if(followValue===false){
            setFollowValue(true)
            setFollows("Unfollow")  

}else{
    setFollowValue(false)
    setFollows("Follow")  


}

try{
    const response= await  axios.post('http://localhost:5000/api/candidate/companyProfile/followaction',{
        token:token ,
        follows:followValue ,
        id:id
        
  
    }) 
    if(response.status!==200){
        throw new Error(response.responseText)
    }else{
        return response.data
    }
}
catch(err){
    console.log(err)
}

    }  





  return (
    <div className='companyProfile-mainPage '>
        <div > { company.CompanyImage && company.CompanyImage.length>=1  ? <img src={ company.CompanyImage} className='companyProfile-side-img' alt="image-profile"/>:<div className='image-optional'></div>}  </div> 
    <div className='company-profile-data d-flex justify-content-around flex-sm-row flex-column'>   
        <div className='company-profile-detail row mx-auto '> 
        <img src={company.CompanyImage}  className="company-profile-logo col-2 " alt='logo'/>  

           <div className='col-12  col-sm-10 mx-auto '> <span className=' company-profile-name d-inline'> {company.CompanyName}</span> 
             <div className='d-inline'><FcRating className='rating-icon d-inline' />  <span className='rating d-inline'>3.8 | 14 reviews</span> </div> 
            <span className='d-block company-profile-tagline'>We transform SAP Solutions into Value</span>
            { company.CompanySectors && company.CompanySectors.length>=1 ? company.CompanySectors.map((item, index)=>{
                  return <div className='company-profile-sectors'>item   </div>
            }):<div className='company-profile-sectors'>item   </div>} </div>

        </div>
        <div className='follows mx-auto'>  <span className='followers-number'> 1.385k Followers</span> 
    <button  className='btn btn-outline-primary follow-btn' value={followValue} onClick={()=>{handleFollow(company._id)}}>{ follow}</button>  
    </div>
    </div> 
   
               <div className='next-section  d-flex justify-content-around mx-auto' > <span style={{textDecoration: content? 'underline':'none'}} onClick={()=>{setContent(true)}}  className='overView-button'> Overview</span> <span className='jobs-button' style={{textDecoration: content? 'none':'underline'}} onClick={()=>{setContent(false)}}> Jobs</span> </div>   
               {content===true  ? <div className='company-profile-overview  ' ><OverView/> <div className='company-showJobs mx-auto'><ShowJobs/></div><div className='company-profile-info'><CompanyInfo/></div> </div>:   
               <div className='company-profile-job mx-auto '> 
               
<ShowJobs/> 
                 <div className='company-jobs mx-auto mt-5   row'> 
                    <div className='company-allJObs  mx-auto col-12'> 
                         <span className='fs-6 fw-bold d-block'>Jobs by {company.CompanyName} </span> 
                         <span className=' fw-bold ms-5 text-secondary'>55154  </span> <span>  jobs by {company.CompanyName}</span>
                          <Job/>  </div>
                    <div className='company-recommended-jobs col-12'>
                        <span className='fs-6 fw-bold'>Recommended Jobs for your regarding company  </span> 
                        { 
                        <div className='d-flex justify-content-between'>
                            <div className='mt-3 mx-auto'> <span className='fs-6 fw-medium mx-auto'>jot title</span>  
                            <div><CiLocationOn className='d-inline' style={{"width":"25px"}}/> Hyderabad </div> 
                           
                            <div>  {company.CompanyName}  </div>    
                            <hr className='fw-bold'></hr> 
                            </div>  
                            <img src="" alt='company-logo' className='d-block w-100 mt-3'/>
                            </div>
                        }


                    </div>
                  
                      </div>
               
               </div>   
             
               }  
               <Breadcumbs breadCrumbs={breadcrumbs}/>   

               <div className='breadcrumbs'>
               <Breadcrumb fontWeight='medium' fontSize='sm' className='breadcrumbs'>
  <BreadcrumbItem>
    <Link to="/">Home</Link>

  </BreadcrumbItem>

  <BreadcrumbItem>
    {/* <BreadcrumbLink href='companies'>companies</BreadcrumbLink> */} 
    <Link to="companies"> Companies</Link>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrentPage>
  <Link to="/">current</Link>

  </BreadcrumbItem>
</Breadcrumb>
</div>
            
               
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaBuilding, FaBriefcase, FaHeart, FaShareAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import CompanyInfo from "./CompanyInfo";
import CompanyJobs from "./CompanyJobs";
import { useNavigate } from "react-router-dom";
import "../../Styles/companyProfile.css";
import Footer from "../Footer";

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const {id}= useParams()
  const [loading, setLoading]=useState(true) 
  const [error, setError]= useState()
  const [companyData, setCompanyData]= useState()
  const toast= useToast()
  const navigate= useNavigate()
  const [follow, setFollow]= useState(false)
   
useEffect(()=>{
  window.scrollTo(0,0)
  const fetchCompanyData=async()=>{

    try{
      const response= await fetch(`https://jobnexus-backend.onrender.com/api/company//getProfileData/${id}`, {
       method:"GET"
 
      })
      if(!response.ok){
        const errorText=await response.text
        throw new Error(`Problem around fetching data with status ${response.status}:${errorText}`)
      }else{
        const data = await response.json()
        setCompanyData(data.Data) 
        console.log(data)
        
      }



    }catch(err){
      addToast(err.message, 'Data not fetched Successfully', "error")
      
      

    }finally{

      setLoading(false)
    }

  }
fetchCompanyData()


},[id])


const handleButtonClick=(id)=>{
  navigate(`/job_detail/${id}`)

}

const handleFollow=()=>{
  if (!follow){
    setFollow(true)
    addToast("Followed Successfully", '', "success")
  }else{
    setFollow(false)
  }
}

 
const addToast=(title, message, status)=>{
toast(
  {
    title: title,
      description: message,
      status: status,
      duration: 2000,
      isClosable: true,



  }
)
}






  return (
    <>

    {loading   ? <div className="text-center">Loading...</div>:
    error ? <div className="text-center">error...</div>:
    companyData    ?


    
    <div className="company-profile container mt-5">
      {/* Header Section */}
      <div className="header-section text-center p-4">
        <img
          src={companyData.CompanyImage}
          alt={companyData.CompanyName}
          className="banner-image img-fluid"
        />
        <div className="overlay">
          <h1 className="company-name">{companyData.CompanyName}</h1>
        </div>
      </div>

      {/* Company Info */}
      <div className="company-info d-flex   justify-content-around flex-md-wrap flex-column align-items-center p-4">
        <div className="d-flex align-items-center">
          <img
            src={companyData.CompanyLogo}
            alt="Company Logo"
            className="company-logo me-3"
          />
          <div>
            <h2 className="mb-0">{companyData.CompanyName}</h2>
            <p className="text-muted mb-0">{companyData.CompanyIndustry}</p>
            <div className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-2 icons" style={{"width":"fit-content"}} />
              <span style={{"width":"fit-content"}} >{companyData.CompanyAddress}</span>
            </div>
          </div>
        </div>
        <div className="actions d-flex ">
          <Button variant="outline-primary" className="me-2" onClick={handleFollow}>
            { follow ?<FaHeart className="me-2 text-danger " />:<FaHeart className="me-2  text-transparent" />}
            {follow ? "Unfollow" :"Follow"}
          </Button>
          <Button variant="outline-secondary " className="mt-2">
            <FaShareAlt className="me-2" /> Share
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        id="company-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="overview" title={<span><FaBuilding className="me-2" /> Overview</span>}>
          <div className="p-3">
            <h3>About Us</h3>
            <p>
              {companyData.CompanyDescription}
            </p>
            <CompanyInfo size={companyData.CompanySize} year={companyData.CompanyEstablishmentYear} owner={companyData.CompanyOwner} mail={companyData.CompanyEmail} linkedin={companyData.CompanyLinkedinProfile} twitter={companyData.CompanyTwitterProfile} website={companyData.CompanyWebsite} facebook={companyData.CompanyFacebookProfile}/>
          </div>
        </Tab>
        <Tab eventKey="jobs" title={<span><FaBriefcase className="me-2" /> Jobs</span>}>
          <div className="p-3">
            <h3>Available Positions</h3>
           <CompanyJobs mail={companyData.CompanyEmail}/>
          </div>
        </Tab>
      </Tabs>
    </div>:<div className="text-center">Data Not Found</div>
}
<Footer/>
    </>
  );
};

export default CompanyProfile;
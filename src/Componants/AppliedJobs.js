import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/AppliedJob.css"; // Custom CSS file for additional styles
import { FaEllipsisV } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { FaArchive } from "react-icons/fa"; 
import { FaCircleMinus } from "react-icons/fa6"; 
import { useToast } from "@chakra-ui/react";
import Footer from "./Footer";





const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Navigation hook
  const toast= useToast()
  const [status, setStatus]= useState(["Interviewing", "offer Received", "Hired", "No longer Interested"])
  const [statusValue, setStatusValue]= useState('') 

  
  


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://jobnexus-backend.onrender.com/api/candidate/getAppliedJobs",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ token: token }),
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Data could not fetch with status ${response.status}: ${errorText}`
          ); 
        } else {
          const data = await response.json();
          if (Array.isArray(data.data)) {
            setJobs(data.data); // Corrected to use data.data
          } else {
            console.log("Unexpected data format received from API.");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    navigate(`/job_detail/${job}`) // Navigate with job details
  };








const handleStatus=async(id,e)=>{ 
  e.preventDefault();
  
  
  if(!statusValue){
    addToast("Please choose status of application")
    return
  }

  try{
    addToast("Request send for Update Status","warning" )
    const response= await fetch(`https://jobnexus-backend.onrender.com/api/candidate/getAppliedJobs/updateStatus/${id}`,{
      method:'PATCH',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({Status:statusValue, token:token})
    })
if(!response.ok){
  const errorText= await response.text() 
  throw new Error("Problem with status uploading", errorText)
}else{
  const data = await response.json() 
  addToast(data.message, "success")
}
  }catch(err){
    addToast(err.message, "error")

  }finally{

  }


}

const handleArchive=async(id)=>{ 
  console.log(id)
 

  try{
    addToast("Request send for Archive application","warning" )
    const response= await fetch(`https://jobnexus-backend.onrender.com/api/candidate/getAppliedJobs/handlearchieve/${id}`,{
      method:'DELETE',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({token:token})
      
    })
if(!response.ok){
  const errorText= await response.text() 
  throw new Error("Problem with Data Deleting", errorText)
}else{
  const data = await response.json() 
  addToast(data.message, "success")
}
  }catch(err){
    addToast(err.message, "error")

  }finally{

  }

}
const HandleWithDrawApplication=(id)=>{
  addToast("Request Send for Withdraw application", "warning")
  
}
const handleReportJob=(id)=>{
  navigate(`/job_detail/reportJob/${id}`)
}




const addToast=(title, status)=>{
  toast({
    title: title,
    // description: message,
    status: status,
    duration: 6000,
    isClosable: true,
  })
}




  return (
    <>
    <div className="container my-5 mx-auto">
      <h4 className="text-center mb-4 section-heading">Applied Jobs</h4>
      {loading ? (
        <div className="text-center loader">Loading...</div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <div className="row g-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                className="col-md-6 col-lg-4"
                key={job._id}
                // Navigate to job details on click
                style={{ cursor: "pointer" }} // Add pointer cursor to make it clickable
              >
                <div className="card job-card shadow-sm">
                  <div className="card-header text-center bg-primary text-white d-flex justify-content-between ">
                    <h6> {job.JobTitle}  </h6> 
                    <span className="ellipse-icon" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><FaEllipsisV /></span>
                   
                  
                  </div>
                  <div className="card-body" onClick={() => handleJobClick(job.JobID)} >
                    <p>
                      <strong>Organization:</strong> {job.CompanyName}
                    </p>
                    <p>
                      <strong>Status:</strong> {job.Status}
                    </p>
                    <p>
                      <strong>Applied On:</strong>{" "}
                      {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div> 
 <div class="modal" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Manage this application</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul style={{"list-style":"none"}}>
          <li> 
          <div className="text-center fw-medium  d-flex justify-content-start" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal1">
        <span className="ellipse-icon"><FaEdit /></span>
 <span className="">Update Status</span>
      </div>
          </li>
          <hr></hr>
          <li>
          <div className="text-center fw-medium   d-flex justify-content-start" data-bs-dismiss="modal" onClick={()=>{handleJobClick(job.JobID)}}>
        <span className="ellipse-icon"><TbListDetails /></span>
 <span className="">View and manage details</span>
      </div>
          </li>
          <hr></hr>
          <li>
          <div className="text-center fw-medium  d-flex justify-content-start" data-bs-dismiss="modal" onClick={()=>{handleArchive(job._id)}}>
        <span className="ellipse-icon" ><FaArchive /></span>
 <span className="">Archive</span>
      </div>
          </li>
          <hr>
      </hr>
      <li>
      <div className="text-center fw-medium   d-flex justify-content-start" data-bs-dismiss="modal" onClick={()=>{HandleWithDrawApplication(job.JobID)}}>
        <span className="ellipse-icon"><FaCircleMinus /></span>
 <span className="">Withdraw application</span>
      </div>
      </li>
      <hr>
      </hr>
      <li>
      <div className="text-center fw-medium  d-flex justify-content-start" data-bs-dismiss="modal"   onClick={()=>{handleReportJob(job.JobID)}}>
        <span className="ellipse-icon"><FaCircleMinus /></span>
 <span  className="">Report Job</span>
      </div>
      </li>
        </ul>
    
     
     
    </div>
  </div>
</div> 
</div>



<div class="modal" id="exampleModal1"  aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update your application status</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form onSubmit={(e) => handleStatus(job._id, e)}>
          <select className="form-select"   value={statusValue} onChange={(e) => setStatusValue(e.target.value)}>
            {
             status && status.length>=0?   status.map((item, index)=>{
                return <option key={index} value={item} name={item}  >{item}</option>
 
              })
            :""}
          </select>
          <div className="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="Submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
      </div>
        </form>
      </div>
     
     
    </div>
  </div>
</div> 








</div>

    
            ))
          ) : (
            <div className="text-center">Jobs Not Found</div>
          )}
        </div>
        
      )}











    </div>
    <Footer/>
    </>
    
  );
};

export default AppliedJobs;

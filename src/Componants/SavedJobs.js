import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaEllipsisV } from "react-icons/fa"; 
import { TbListDetails } from "react-icons/tb";
import { FaArchive } from "react-icons/fa"; 
import { FaCircleMinus } from "react-icons/fa6"; 

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate() 





  useEffect(() => {
    // Fetching jobs from backend
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://jobnexus-backend.onrender.com/api/candidate/savedJobs", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ token: token }),
        });
        const data = await response.json();
        setJobs(data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

const handleExplain = (id) => {
  navigate(`/job_detail/${id}`) // Navigate with job details
};


const handleReportJob=()=>{

}
const handleArchive=()=>{

}





  return (
    <>
    <div className="container py-5">
    <h4 className="text-center mb-4 section-heading">Saved Jobs</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {jobs.map((job) => (
          <div key={job.JobID} className="col">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                <h5 className="card-title text-primary"  onClick={()=>{handleExplain(job.JobID)}}>{job.JobTitle}</h5>
             <span className="ellipse-icon" type="button" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal"><FaEllipsisV /></span>
                </div>
                <p className="card-text">
                  {/* <strong>Company:</strong> {job.CompanyName} */}
                </p>
                <p className="card-text">
                  {/* <strong>Job ID:</strong> {job.JobID} */}
                </p>
                <p className="card-text">
                  <strong>Your Email:</strong> {job.UserEmail}
                </p>
                <p className="card-text text-muted">
                  <small>
                    Saved at: {new Date(job.createdAt).toLocaleDateString()} <br />
                  
                  </small>
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
       
          </li>
          <hr></hr>
          <li>
          <div className="text-center fw-medium   d-flex justify-content-start" data-bs-dismiss="modal" onClick={()=>{handleExplain(job.JobID)}}>
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





          </div>
        ))}
      </div>
    
    </div>
      <Footer/>
     </>
  );
};

export default SavedJobs;

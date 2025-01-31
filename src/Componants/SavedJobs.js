import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

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


  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {jobs.map((job) => (
          <div key={job.JobID} className="col">
            <div className="card shadow-lg border-0 rounded-3" onClick={()=>{handleExplain(job.JobID)}}>
              <div className="card-body">
                <h5 className="card-title text-primary">{job.JobTitle}</h5>
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
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default SavedJobs;

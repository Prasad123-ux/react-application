import React, { useState, useEffect } from "react";
import { useParams, } from "react-router-dom";
import "../../Styles/ReportJob.css"; 



export default function ReportJob  () {
  
  const [jobId, setJobId] = useState("");
  const [details, setDetails] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const {id}= useParams()

  useEffect(() => {
    window.scrollTo(0,0)
    
    if (id) {
      setJobId(id); // Automatically populate the job ID if provided
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId || !details.trim()) {
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://jobnexus-backend.onrender.com/api/reportJob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, details }),
      });

      if (response.ok) {
        setStatusMessage("Your report has been successfully submitted.");
        setJobId("");
        setDetails("");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit the report.");
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
    <div className="container  report-main p-4 rounded shadow-lg bg-light report-job-container">
      <h2 className="text-center text-primary mb-4">Report a Job</h2>
      <p className="text-muted mb-4">
        Found something wrong with a job posting? Please let us know by filling
        out the form below. Providing detailed information helps us take
        necessary actions.
      </p>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-3">
          <label htmlFor="jobId" className="form-label">
            Job ID <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="jobId"
            className="form-control"
            placeholder="Enter Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">
            Details <span className="text-danger">*</span>
          </label>
          <textarea
            id="details"
            className="form-control"
            placeholder="Provide detailed information about the issue"
            rows="5"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit Report
        </button>
        {statusMessage && (
          <div
            className={`alert mt-4 ${
              statusMessage.startsWith("Error") ? "alert-danger" : "alert-success"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </form>
      <div className="helpful-tips mt-5 p-3 bg-secondary text-light rounded">
        <h5 className="mb-3">Helpful Tips</h5>
        <ul>
          <li>
            <strong>Job ID:</strong> You can find the Job ID in the job details page or listing.
          </li>
          <li>
            <strong>Details:</strong> Be specific about what issue you're reporting, such as incorrect
            salary, fake posting, or other misleading information.
          </li>
          <li>
            <strong>Confidentiality:</strong> Your report is anonymous, and your identity will not be
            shared.
          </li>
          <li>
            <strong>Follow-up:</strong> If required, we may contact you via the registered email for
            more details.
          </li>
        </ul>
      </div>
    </div>
  
    </>
  );
};

;

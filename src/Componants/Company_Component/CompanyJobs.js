import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function CompanyJobs({ mail }) {
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const navigate= useNavigate()

  useEffect(() => {
    if (!mail) return; // Avoid unnecessary fetch calls if mail is not provided

    const fetchJobs = async () => {
      console.log("Fetching jobs for:", mail);
      setLoading(true);
      setError(null); // Reset error state

      try {
        const response = await fetch(
          `https://jobnexus-backend.onrender.com/api/company/getCompanyJob/${mail}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          // addToast("Error", "Problem with fetching jobs", "error");
          throw new Error(
            `Error fetching jobs. Status: ${response.status}. ${errorText}`
          );
        }

        const data = await response.json();
        setCompanyJobs(data.Data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [mail]);

  const addToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 6000,
      isClosable: true,
    });
  };


  const handleButtonClick=(id)=>{
    navigate(`/job_detail/${id}`)

  }

  return (
    <div>
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
          <p>Loading jobs...</p>
        </div>
      )}

      {error && (
        <div className="text-center my-3 text-danger">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && companyJobs.length === 0 && (
        <div className="text-center my-3">Jobs Not Found</div>
      )}

      {!loading && !error && companyJobs.length > 0 && (
        <div className="d-flex flex-wrap justify-content-center">
          {companyJobs.map((job, index) => (
            <Card key={index} className="job-card m-2" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{job.JobTitle || "Job Title"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job && job.length>=0  ? job.JObCommonInfo.EmploymentType :"" || "Full-Time"}
                </Card.Subtitle>
                <Card.Text>
                  {job.JobDescriptionSummary ||
                    "No description provided for this job. Apply now to learn more!"}
                </Card.Text>
                <Button variant="primary" style={{"width":"fit-content"}} onClick={()=>{handleButtonClick(job._id)}}>View Details</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

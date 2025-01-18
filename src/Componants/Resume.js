import React, { useEffect, useState } from 'react';
import { CiSaveDown2 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Styles/resume.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Resume({ resumeData }) {
  const [resume, setResume] = useState(null);
  const toast = useToast();
  const token= localStorage.getItem('token')
  const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers)

  const handleFileChange = (e) => {
     const file = e.target.files[0]; 
    // setResume(e.target.files[0])

    // Check file size (2MB limit)
    if (file && file.size > 10 * 1024 * 1024) {
      addToast("File too large", "Please upload a file smaller than 2MB.", "error");
      setResume(null);  // Reset the file state if file is too large
    } else {
      setResume(file);  // Capture the actual file object
    }
  };
 

 

  const handleResumeUpdate = async (e) => { 
    e.preventDefault()
    if (!navigator.onLine) {
      addToast("You are offline!", "Please check your internet connection!", "warning");
      return;
    }

    if (!resume) {
      addToast("No file selected!", "Please select a file to upload.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);  
    
    

    try {
      const response = await fetch("   https://jobnexus-backend.onrender.com/api/candidate/profile/add_resume",{
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
            // Include the token for authenticated requests
        },
        
        body:formData
       
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        addToast("Resume Not Uploaded", errorMessage, "error");
        throw new Error(errorMessage);
      }

      const data = await response.json();
      addToast("Updated Successfully", "Resume updated successfully", "success");
      console.log(data);
    } catch (err) {
      console.error(err);
      addToast("Error", err.message, "error");
    }
  };

  const addToast = (title, message = "", status) => {
    toast({
      title: title,
      description: message,
      status: status,
      duration: 5000,
      isClosable: true
    });
  };

  const handleResumeDownload = () => {
    if (jobSeekerData.extraFields?.resume && jobSeekerData.extraFields?.resume.length>=1) {
      window.open(jobSeekerData.extraFields.resume, "_blank");
    } else {
      addToast("No Resume Found", "Please upload a resume first.", "error");
    }
  };

  const handleResumeDelete = () => {
    addToast("Feature Coming Soon", "Resume delete functionality will be implemented soon.", "info");
    // You can add your API call for deleting the resume here.
  };
 




  return (
    <div className='bg-light rounded-3 mx-auto p-3 p-sm-3 p-md-3 p-lg-5 shadow resume'>
      <div className='d-flex justify-content-between resume-header'>
        {jobSeekerData.extraFields?.resume  && jobSeekerData.extraFields?.resume.length>=1 ? (  
          //  <embed  src={jobSeekerData.extraFields.resume} target="/blank" className='fw-bold' type="application/pdf"/>
          // <iframe src={jobSeekerData.extraFields.resume} title=''>data</iframe>
            <iframe src={jobSeekerData.extraFields.resume}    title="PDF Preview" className='mx-auto  resume-img'></iframe>
          

          // <Link to={jobSeekerData.extraFields.resume} target="_blank" className='fw-bold' type='application/pdf'> Your resume</Link>
          
        ) : (
          <span>No resume uploaded</span>
        )}
        {/* <div className='d-flex justify-content-end'>
          <span className='text-primary btn download-btn rounded-circle' onClick={handleResumeDownload}>
            <CiSaveDown2 className='mt-1 fs-5' />
          </span>
          <span className='text-primary btn delete-btn rounded-circle' onClick={handleResumeDelete}>
            <RiDeleteBin6Line className='mt-1 fs-5' />
          </span>
        </div> */}
      </div>
      <div className='resume-content p-5 mx-auto d-flex justify-content-center flex-column'> 
        <form onSubmit={handleResumeUpdate}>
        <input type='file' onChange={handleFileChange} accept='application/pdf' className='upload-resume mx-auto' />
        <span className='text-secondary resume-placeholder mx-auto'>Supported Formats: PDF, up to 2 MB</span>
        <button  

        type='submit' 

          className='btn btn-outline-primary upload-btn mx-auto mt-4 d-flex justify-content-around'
          
          disabled={!resume}   >
          <FaCloudUploadAlt className='mt-1' />
          <span className='ms-2'>Upload</span>
        </button>
        </form>
      </div>
    </div>
  );
}

export default Resume;

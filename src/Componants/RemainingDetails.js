import React, { useEffect, useState } from 'react';
import { Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { CiMail } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GrResume, GrCertificate } from "react-icons/gr";
import { MdOutlineCastForEducation } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { LiaAwardSolid, LiaProjectDiagramSolid } from "react-icons/lia";
import { setProfileScore } from './Redux/jobSlice';
import '../Styles/Profile.css';

export default function RemainingDetails() {
  const [nameValue, setNameValue] = useState({
    resume: 20,
    ProfileImage: 20,
    Education: 10,
    Experience: 10,
    Certification: 10,
    Projects: 10,
    Accomplishment: 10,
  });

  const jobSeekerData = useSelector((state) => state.jobs.jobSeekers);
  const scoreValue = useSelector((state) => state.jobs.score);
  const dispatch = useDispatch();

  const [status, setStatus] = useState("error");
  const [message, setMessage] = useState("You haven't started building your profile.");

  useEffect(() => {
    handleTotalScore()
    console.log(jobSeekerData)
    const value = getMessage(scoreValue);
    setMessage(value);
    // Update status based on score
    if (scoreValue >= 100) {
      setStatus("success");
    } else if (scoreValue >= 50) {
      setStatus("info");
    } else {
      setStatus("warning");
    }
  }, [scoreValue]);

  const getMessage = (score) => {
    switch (true) {
      case score === 0:
        return "You haven't started building your profile.";
      case score <= 25:
        return "Your profile is just getting started. Add more details!";
      case score <= 50:
        return "You're halfway there! Keep going to improve your profile.";
      case score <= 75:
        return "Great progress! Just a few more steps to complete your profile.";
      case score < 100:
        return "Almost there! Complete the final details for a perfect profile.";
      case score === 100:
        return "Congratulations! Your profile is fully completed.";
      default:
        return "Invalid score.";
    }
  };

  const handleTotalScore = () => {
    const fields = Object.keys(nameValue);
    let totalScore = 0;

    fields.forEach((field) => {
      if (jobSeekerData.extraFields?.[field] && jobSeekerData.extraFields[field].length >= 1) {
        totalScore += nameValue[field];
      }
    });

    dispatch(setProfileScore(totalScore));
  };

  const renderField = (fieldName, icon, label) => {
    return jobSeekerData.extraFields?.[fieldName] && jobSeekerData.extraFields[fieldName].length >= 1 ? null : (
      <div className="d-flex justify-content-between flex-row fields mx-auto">
        <div className="d-block">  
          <Text className="d-flex justify-content-between text-secondary">
            {icon}
            <span className="ms-3">{label}</span>
          </Text>
        </div>
        <div className="w-25 text-success rounded-circle">
          <Text className="d-flex justify-content-between text-secondary text-success">
            <span className="ms-3">{nameValue[fieldName]}%</span>
          </Text>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="main-field">
        {renderField("resume", <GrResume style={{ width: "40px", height: "20px" }} className="d-inline bg-white rounded-circle" />, "Add Resume")}
        {renderField("ProfileImage", <CgProfile style={{ width: "40px", height: "20px" }} className="d-inline bg-white rounded-circle" />, "Add Profile Image")}
        {renderField("Education", <MdOutlineCastForEducation style={{ width: "40px", height: "20px" }} className="d-inline bg-white rounded-circle" />, "Add Education")}
        {renderField("Certification", <GrCertificate style={{ width: "40px", height: "20px" }} className="d-inline bg-white rounded-circle" />, "Add Certification")}
        {renderField("Experience", <HiOutlineOfficeBuilding style={{ width: "40px", height: "20px" }} className="d-inline bg-white rounded-circle" />, "Add Experience")}
        {renderField("Accomplishment", <LiaAwardSolid style={{ width: "40px", height: "20px" }} className="d-inline bg-white rounded-circle" />, "Add Accomplishment")}
        {renderField("Projects", <LiaProjectDiagramSolid style={{ width: "40px", height: "20px" }} className="d-inline bg-white rounded-circle" />, "Add Projects")}

        <Alert status={status}>
          <AlertIcon />
          {message}
        </Alert>
      </div>

      <button
        className="btn btn-primary fields-btn mx-auto"
        style={{ backgroundColor: "#F05555" }}
        onClick={handleTotalScore}
      >
        Calculate Score  {scoreValue}
      </button>
    </>
  );
}

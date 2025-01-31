import React, { useEffect, useState } from "react";
import { Accordion, Form, Button, Modal } from "react-bootstrap";
import { FaQuestionCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/HelpComponent.css";
import Footer from "./Footer";
import { useToast } from "@chakra-ui/react";

const HelpComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const toast= useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [faqExpanded, setFaqExpanded] = useState(null);
const [loading, setLoading]= useState(false)


  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));  


  };

  const handleDataChange=(e)=>{
    setLoading(true)
    const {name, value}=e.target;
    setFormData((prevDetails)=>({...prevDetails, [name]:value}))
  
  }
  const handleSubmit= async(e)=>{
    
    e.preventDefault()
    const { prevDetails, ...formDataWithoutPrevDetail } = formData;
  
  
    try{
      const response =await fetch('https://formspree.io/f/xzbnpgno',{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify(formDataWithoutPrevDetail),
      })
      if(response.ok){
        
        setFormData({ name: '', email: '', message: '' });
        addToast("Thank You ! We will react you soon", "success")
        // setUserEmail("")
         
          
      }else{
      
        addToast("Sorry there is some problem , Please contact us through  other platform", "error")
        console.error('Error submitting form');
          
  
  
          
      }
    }catch(error){
      
      console.error('Error:', error);
      addToast("Sorry there is some problem , Please contact us through  other platform", "error")
      
  
          
    }finally{
      setLoading(false)
    }
  
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
  

  const faqs = [
    {
      question: "What is this platform for job seekers?",
      answer:
        "This platform helps job seekers find suitable job opportunities, create a professional profile, and apply for jobs directly.",
    },
    {
      question: "How can I create a job seeker profile?",
      answer:
        "Click on the 'Register' button on the homepage, fill out your details including resume, skills, and experience, and submit the form to create your profile.",
    },
    {
      question: "What industries are covered on this platform?",
      answer:
        "We cover a wide range of industries including IT, healthcare, finance, education, and many more.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "Search for a job using filters like industry, location, or salary. Click on the job to view details and then click 'Apply' to submit your application.",
    },
    {
      question: "How can I track my applications?",
      answer:
        "Log in to your account, go to the 'My Applications' section, and view the status of all your job applications.",
    },
    {
      question: "What should I do if I face issues?",
      answer:
        "Reach out to our support team via the contact form below or use the contact details provided in the support section.",
    },
  ];




  return (
    <>
    <div className="help-component container mt-5">
      <h2 className="text-center text-primary mb-4 animated-heading">
        Job Seeker Help Center
      </h2>

      {/* FAQ Section */}
      <Accordion defaultActiveKey="0" className="mb-4">
        {faqs.map((faq, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={index}
            onClick={() => setFaqExpanded(faqExpanded === index ? null : index)}
          >
            <Accordion.Header>
              <FaQuestionCircle className="icons" /> {faq.question}
            </Accordion.Header>
            <Accordion.Body className="">{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Contact Form */}
      <div className="contact-form-section p-4 shadow-lg rounded">
        <h4 className="text-center text-secondary mb-3">
          Still have questions? Ask us directly!
        </h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formQuery">
            <Form.Label>Your Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe your issue or question"
              name="query"
              value={formData.query}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="submit-button">
              {!loading ?"Submit":"Loading..."}
            </Button>
          </div>
        </Form>
      </div>

      {/* Contact Information Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Support</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <FaEnvelope className="me-2" /> Email: support@jobportal.com
          </p>
          <p>
            <FaPhone className="me-2" /> Phone: +91 98765 43210
          </p>
          <p>
            <FaMapMarkerAlt className="me-2" /> Address: 1234 Career Lane, Hyderabad, Telangana, India
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="text-center mt-3">
        <Button variant="info" onClick={() => setShowModal(true)} className="support-button">
          Contact Support
        </Button>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default HelpComponent;

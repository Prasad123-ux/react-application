import React, { useState } from 'react'
import "../Styles/footer.css"
import { HStack , Box, VStack, Input, Button, Text, Stack, Heading, Textarea} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaPaperPlane, FaTwitter, FaWhatsapp } from 'react-icons/fa' 
import { useToast } from '@chakra-ui/react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import {Link } from 'react-router-dom'

export default function Footer() {
  const [loading, setLoading]= useState(false)
  const [userEmail,setUserEmail]= useState()
  const toast= useToast()

const [formData, setFormData]=useState({
  name:'',
  email:"",
  message:''
})


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
    }else{
      addToast("Sorry there is some problem , Please contact us through  other platform", "error")
   }
  }catch(error){
  addToast("Sorry there is some problem , Please contact us through  other platform", "error")
    }finally{
    setLoading(false)
  }

}





const handleEmail=()=>{
  if(!userEmail){
    addToast("Please enter your Email address", "warning")

    return 
  }
  else{
    addToast("Thank You ! We will react you soon", "success")
    // setUserEmail("")

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

  
  return (
    <Box className='footer '  width={'full'}>



{/* we are Checking here  condition after sending message */}
<>
      <Box >
        <HStack flexDirection={{ base: 'column',sm:'column' , md:'column', lg:'column', xl:'row'}}>
<Box> 

<VStack spacing={''} justifyContent={'space-around'}>

  <Text fontSize={{base:'1.5rem', sm:'1.5rem', md:'1.5rem',lg:'1.8rem', xl:'1.5rem'}} color={'yellow'} fontWeight={{base:'600', sm:'600', md:'700',lg:'700', xl:'700'}}> Subscribe to our NewsLetter</Text>
  <HStack justifyContent={'center'}>
  <Input variant={'solid'} value={userEmail} type={'email'} onChange={(e)=>{setUserEmail(e.target.value)}} h={{base:'7' ,sm:'10',md:'10',lg:'10',xl:'10'}} fontSize={{base:'0.8rem', sm:'0.8rem',md:'1rem'}} borderRadius={{base:'50px', sm:'50px', md:'30px', lg:'30px', xl:'30px'}}  placeholder='Enter Your Email address'  color={'grey'} w={{base:'15rem',sm:'',md:'', lg:'300px'}}  required/>
  <Button bgColor={'yellow'} w={{base:'50px', sm:'60px', md:'70px', lg:'70px', xl:'70px'}}  height={{base:'7',sm:'8',md:'9', lg:'9',xl:'9'}}  color={'white'} fontSize={'2rem'} onClick={handleEmail}> <FaPaperPlane  className='paperPlane' /></Button>
  </HStack>
</VStack>
</Box>



<Box mt={'5'}>
  <VStack>
<Text color={'yellow'} fontSize={{base:'1.5rem',sm:'1.5rem',md:'1.5rem',lg:'1.8rem',xl:'1.5rem'}} fontWeight={{base:'600', sm:'600', md:'700',lg:'700', xl:'700'}} >Follow us on </Text>
<HStack  justifyContent={'center'} >
 <a  className="social-site" href="https://www.linkedin.com/in/prasad-metkar/" ><FaLinkedinIn className='footer-icon'/></a>
 <a className='social-site' href=" https://github.com/Prasad123-ux"> <FaGithub  className='footer-icon' /></a>
<a className='social-site' href=" https://www.instagram.com/prasad.metkar.925/"><FaInstagram className='footer-icon' /></a>
  <a className='social-site' href="https://twitter.com/PrasadMetkar5" ><FaTwitter className='footer-icon' /></a>
 <a className='social-site' href=" https://www.facebook.com/prasad.metkar.925/"> <FaFacebook className='footer-icon' /></a>
 <a className='social-site' href="https://wa.me/919307173845?text=Hello%20there!"><FaWhatsapp className='footer-icon'/></a>

</HStack> 



  </VStack>
</Box>





<Box mt={'5'}>
   <VStack>
  <Text color={'yellow'} fontSize={{base:'1.5rem',sm:'1.5rem',md:'1.5rem',lg:'1.8rem',xl:'1.5rem'}} fontWeight={{base:'600', sm:'600', md:'700',lg:'700', xl:'700'}}> Need Help</Text>
 <Stack spacing={'0'} >
  <Text className='d-flex justify-content-center' fontSize={{base:'0.8rem', sm:'1rem', md:'1rem',lg:'1rem', xl:'1rem'}} color={'white'} fontWeight={'500'}> <FaPhoneAlt className='icons mt-3'/> <Text className='icons mt-1 ms-2'>+919307173845</Text></Text>
  <Text  className='d-flex justify-content-center'  fontSize={{base:'0.8rem', sm:'1rem', md:'1rem',lg:'1rem', xl:'1rem'}} color={'white'} fontWeight={'500'}> <IoMail className='icons mt-3' /><Text className='icons mt-2 ms-2'> prasadmetkar333@gmail.com</Text></Text>
 </Stack>
  </VStack>
  </Box>
</HStack>


         </Box>
         
         <hr className='line'/>



<div className='footer-second'>
        <HStack justifyContent={'space-evenly'} flexDirection={{ base: 'column',sm:'column',  md: 'column', lg:'column', xl:'row' }} height={'120%'} >
           <VStack justifyContent={'space-around'}  >
          
          <Heading  color={'orange'}>JOBIFY</Heading>
          <Text  fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9',xl:'0.9rem'}} color={'white'} fontWeight={'600'}>Our job listing application is a user-friendly platform designed to connect job seekers with exciting employment opportunities. With a sleek and intuitive interface, users can effortlessly create profiles, explore a diverse range of job listings, and apply for positions that match their skills and aspirations.</Text> 
        


        </VStack>
        <VStack mt={3}>
          <span className='newsLetter'> Information</span>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0rem'}} fontWeight={'700'} >About us</Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.8rem'}} fontWeight={'700'}  > <Link to ="candidate/help">Help Desk</Link></Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} ><Link to ="candidate/support">Support</Link></Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} ><Link to ="candidate/privacy_policy">Privacy Policy</Link></Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} ><Link to ="/candidate/report">Report issues</Link></Text>
         
        </VStack>
        <VStack mt={'3'} display={{base:'none', sm:'block', md:'block', lg:'block', xl:'block'}} >
          <Text className='newsLetter' >Useful Links</Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'}><Link to="/">Homepage</Link></Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} ><Link to ="/companies">Top Companies</Link></Text>

          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} ><Link to ="/main">Find Jobs</Link></Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'}> <Link to ="/profile">Profiles</Link></Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} > <Link to="/main">Latest Job</Link></Text>
          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} > <Link to="/job_detail/savedJobs">Saved Jobs</Link></Text>

          <Text color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'0.9rem',lg:'0.9rem',xl:'0.9rem'}} fontWeight={'700'} > <Link to ="/registration">Register</Link></Text>

        </VStack>
        <VStack mt={5}>
        <span className='newsLetter'>Get In touch</span>
        <form onSubmit={handleSubmit}>

          <Input placeholder='Name'  name="name" value={formData.name} onChange={handleDataChange} borderRadius={'0'} color={'white'} w={'300px'} height={'51px'} required />
          <Input placeholder='Email' name="email" value={formData.email} onChange={handleDataChange}  borderRadius={'0'}  w={'300px'} color={'white'} height={'50px'} required />
          <Textarea placeholder='message' borderRadius={'0'}  w={'300px'}  name="message" value={formData.message} onChange={handleDataChange}color={'white'}  required ></Textarea>
          <Button type='submit' bgColor={'yellow'} w={'100px'}   borderRadius={'0'} color={'white'} fontSize={'1.5rem'}>{!loading ? <FaPaperPlane  className='paperPlane' />:"Loading..."}</Button>

          </form>
        </VStack>
          </HStack> 

          </div>
          

        
          <Text mt={5} color={'white'} fontSize={{base:'0.8rem', sm:'0.8rem', md:'1rem', xl:'1rem', lg:'1rem'}} fontWeight={'600'}> copyright @ 2023 All Rights Reserved</Text>
          </>


        
          
        

    </Box>
  )
}

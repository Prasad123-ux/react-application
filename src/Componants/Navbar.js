import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import {Drawer, Button, Avatar, Input, HStack, Text, Box, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, VStack, Divider, UnorderedList, ListItem, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter,AlertDialogHeader, AlertDialogOverlay} from '@chakra-ui/react'

import {Link } from 'react-router-dom'
import "../Styles/navbar.css"
import Heading from './Heading';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredJobs, setTokenData } from './Redux/jobSlice'; 
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineFindInPage } from "react-icons/md";
import { SiAwsorganizations } from "react-icons/si";
import { MdRecommend } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { TfiSaveAlt } from "react-icons/tfi";
import { CiSettings } from "react-icons/ci";
import { MdReportGmailerrorred } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";



export default function Navbar({users, onDelete, getCity, getRole, color}) {
const [loading, setLoading]= useState()
const {isOpen:isLogOpen, onOpen:onLogOpen, onClose:onLogClose}= useDisclosure() 
const {isOpen, onOpen, onClose}=useDisclosure()
const [loginButton, setLoginButton]= useState()

  
  
  const navigate= useNavigate()
  const locationPath = useLocation() 
  const [userData, setUserData]=useState()

   
   const [location, setLocation]= useState()
   const [role, setRole]= useState()
    const cancelRef = React.useRef();
    const tokenValue=localStorage.getItem("token")
    const dispatch= useDispatch() 
    // const allJobs= useSelector((state)=>state.jobs.jobs)
    // const filteredJobs = useSelector((state) => state.jobs.filteredJobs); 
    const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers) 
    const toast= useToast() 
    

    const showSearchBar = locationPath.pathname === "/main";
   


    const handleSearchData=async ()=>{  
      if (!showSearchBar){
        addToast("Please  be Formal", '', "warning") 
        return 
      }
      
      if( !tokenValue){
        addToast("Please Login Yourself", 'Please Register', "warning") 
        return
      }
      try{
    const response = await fetch(`https://jobnexus-backend.onrender.com/api/candidate/searchData?location=${encodeURIComponent(location)}&role=${encodeURIComponent(role)}`, {
      method:'GET',
      headers:{"content-type":"application/json"}
    })
   if(!response.ok){
    throw new Error(response.statusText)
    
   }else{
    const data = await response.json() 
    console.log(data.jobs)
    if( data.job && data.job.length>=1){
     data.jobs && data.jobs.length>0 ? console.log(data.jobs[0]):console.log("data not found")
      dispatch(setFilteredJobs(data.job[0]))   
      }
      addToast("We are landed jobs for you","data finded", 'success')
      onClose()
    }
    
  }catch(err){
    console.log(err)
    addToast("Jobs not found for your requirements", "error")
    onClose()

  }finally{
    setLoading(false)
  }
    }


    

const handleGetUserData = async () => {
    
    
    await fetch('https://jobnexus-backend.onrender.com/api/candidate/getProfileData', {
        method: "POST",
        body: JSON.stringify({ token: tokenValue }),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then((response)=>{
        if(!response.ok){
          throw new Error(response.statusText)
        }else{
          return response.json()
        }

      }).then((data)=>{ 
        console.log(data)
        setUserData(data.Data) 
      
})
.catch((err)=>{ 
  console.log(err.message)

})
  
    
  };




 
 useEffect(()=>{
  handleGetUserData()
 },[])


     

    const onLogOutDelete=async()=>{
     localStorage.removeItem('token')
     dispatch(setTokenData(null))
     
     onLogClose()
     onClose()
      
    }



     
    const addToast=(title,message="", status)=>{
      toast({
        title: title,
        description: message,
        status: status,
        duration: 2000,
        isClosable: true,
      })
    }
    const handleHomeNavigate=()=>{
      navigate("/")
    }
  const handleLoginNavigate=()=>{
    navigate("/login")
  }

const handleRegisterNavigation=()=>{
  navigate("/registration")
}





const handleNavigation=(path)=>{
  navigate(`/${path}`)
  onClose()

}
  return (  


 <Box   className='navbar fixed'   >
      <HStack justifyContent={"space-around"} >
        
      
          <Text  width={"fit-content"} className='jobify-name' fontSize={{base:'2.5rem',sm:'2.5rem',md:'3rem',lg:'3rem' }} color={'yellow'} fontWeight={'800'}  onClick={handleHomeNavigate}  > Jobify</Text>
        
       <Input textAlign={'center'}  spellCheck="true"  onChange={((e)=>{ setRole(e.target.value)})} display={{ base:'none' ,md:'block ' ,sm:'none' ,lg:'block' }}fontSize={{base:'1rem',md:'1rem'}}  fontWeight={'700'} placeholder ='Search for your role' />

       <Input   textAlign={'center'} spellCheck="true" onChange={((e)=>{ setLocation(e.target.value)})} fontSize={{base:'1rem',md:'1rem'}} display={{  base:'none', md:'none ' ,sm:'none' ,lg:'block' }} fontWeight={'700'} placeholder='Search your Location'/> 

        { location &&  location.length>1   && role && role.length>1 ?
        <Button isDisabled={false}  onClick={handleSearchData} width={'200px'} variant={'solid'} colorScheme='teal' display={{base:'none', md:'none', lg:'block'}} mr={'20'}><FaPaperPlane/></Button>
      :            <Button  isDisabled={true} onClick={handleSearchData} width={'200px'} variant={'solid'} colorScheme='teal' display={{base:'none', md:'none', lg:'block'}} mr={'20'}><FaPaperPlane/></Button>
}
       


{/* <div className='d-flex justify-content-end'> */}
     {/* { tokenValue? <Button  borderRadius={'full'}   width={{base:'50px',md:'50px' ,sm:'50px' , lg:'50px'}} backgroundColor='white' mr={"10px"}  size={{base:'md', sm:'md',md:'md',lg:'md'}}  onClick={onOpen}   ><BiMenuAltLeft  size={'lg'}/></Button>:""}  */}
     <div className='d-flex justify-content-end'>
       {  tokenValue?<Text width={'50px'} mr={{base:'px',md:'2', lg:'2'}} className='mr-3 mr-sm-5' ><Link to='/profile'> <Avatar cursor={'pointer'} src={jobSeekerData.extraFields?.profileImage && jobSeekerData.extraFields?.profileImage.length>=1 ?jobSeekerData.extraFields?.profileImage:"" } size={{base:'md' , sm:'md',md:'md',lg:'md'}}  /></Link></Text>:""} 
       {/* </div> */}
       { tokenValue? <Button  borderRadius={'full'}   width={{base:'50px',md:'50px' ,sm:'50px' , lg:'50px'}} backgroundColor='white'   onClick={onOpen}   ><GiHamburgerMenu  size={{base:'md' , sm:'md',md:'md',lg:'md'}}   /></Button>:""} 
       </div>
       
        <Box width={{ base:'10px' ,sm:'300px',md:'500px' ,lg:'500px'}}  mr={{base:'5' , sm:'5', md:'2',lg:'2'}}>     
         

         { !tokenValue ?  

  <Box  display={'flex'} justifyContent={"space-around"} flexDirection={'row'}>
  <Button  onClick={handleLoginNavigate}  >Log in</Button>
 <Button  onClick={handleRegisterNavigation} ml={'10px'} display={{base:'none', sm:'block', md:'flex', lg:'flex'}} borderRadius={'full'}>Register</Button>
  <Link to='/profile'>
      
    </Link>
  </Box>:""
      
}
    <Box className='d-flex auth-box'>
</Box>
        </Box>
        
        
    
        </HStack>
   

   <Drawer onClose={onClose} isOpen={isOpen} size={{base:'xs', sm:'xs', md:'xs', lg:'md', xl:'xs'}}>
    <DrawerOverlay/>
    <DrawerContent>
      <DrawerHeader></DrawerHeader>
      <DrawerCloseButton/>
      <DrawerBody>
      <HStack justifyContent={'space-between'}>
<Avatar size={'md'}/>
<VStack ml={'25px'}>
<div className=' userName fw-bold'>{userData && userData.FullName?.length>=0  ? userData.FullName :"Not Mentioned" }</div>  
<span className='user-email'>{userData && userData.Email?.length>=0  ? userData.Email:"Not Mentioned" }</span>  

 <Link to='/profile'> <Text color={'blue'} fontSize={'0.8rem'} onClick={onClose}>View & Update Profile</Text></Link>
</VStack>
</HStack>

<div className='w-100 d-block d-lg-none'>
<Divider mt={'8'}/>
<Input textAlign={'center'}  spellCheck="true"  onChange={((e)=>{ setRole(e.target.value)})} fontSize={{base:'1rem',md:'1rem'}}  fontWeight={'700'} placeholder ='Search for your role' />

<Input   textAlign={'center'} spellCheck="true" onChange={((e)=>{ setLocation(e.target.value)})} fontSize={{base:'1rem',md:'1rem'}}  fontWeight={'700'} placeholder='Search your Location'/> 
<div className='d-flex justify-content-between mt-3'>

{ location&&  location.length>1   && role && role.length>1 ?
        <Button isDisabled={false}  onClick={handleSearchData} width={'100px'} variant={'solid'} colorScheme='teal'  className='mx-auto' ><FaPaperPlane/></Button>
      :            <Button  isDisabled={true} onClick={handleSearchData} width={'100px'} variant={'solid'} colorScheme='teal' mr={'20'} className='mx-auto '><FaPaperPlane/></Button>
}
 <div className='d-block d-lg-none filter-button'><Heading/></div>
 </div>
 </div>
<Divider mt={'8'}/>
<UnorderedList spacing={'6'} style={{"listStyle":"none"}}>
  <ListItem  style={{"height":"fitContent"}}>
    
  
  <Text className='side-text  d-flex justify-content-between'  style={{"height":"fitContent"}} onClick={()=>{handleNavigation("")}}  ><IoHomeOutline className='icons fw-bolder fs-3' /> <Text className='ms-3 mt-1'>Home</Text></Text>
   
  </ListItem>
  <ListItem>
  <Text className='side-text d-flex justify-content-between ' onClick={()=>{handleNavigation("main")}}  > <MdOutlineFindInPage className='icons fw-bolder fs-3' /> <Text className='ms-3 mt-1'>Find Jobs </Text></Text>

  </ListItem>
  <ListItem>
  <Text className='side-text d-flex justify-content-between ' onClick={()=>{handleNavigation("companies")}}> <SiAwsorganizations  className='icons fw-bolder fs-3'  /> <Text className='ms-3 mt-1'> Top Companies </Text></Text>

  </ListItem> 
  <ListItem>
  <Text className='side-text text-primary d-flex justify-content-between'  onClick={()=>{handleNavigation("suggested")}}> <MdRecommend className='icons fw-bolder fs-3' /> <Text  className='ms-3 mt-1'> Suggested Jobs</Text></Text>

  </ListItem> 
 
  <ListItem>
  <Text className="side-text d-flex justify-content-between" onClick={()=>{handleNavigation("job_detail/appliedJobs")}} > <MdPendingActions className='icons fw-bolder fs-3' /><Text className='ms-3 mt-1'>My Applications</Text></Text>

  
  </ListItem>
  
  
  <ListItem>
  <Text className="side-text  d-flex justify-content-between" onClick={()=>{handleNavigation("job_detail/savedJobs")}} >   <TfiSaveAlt  className='icons fw-bolder fs-3'/><Text className='ms-3 mt-1' >Saved Jobs</Text></Text>

  </ListItem>

  <ListItem>
  <Text className='side-text  d-flex justify-content-between'  onClick={()=>{handleNavigation("settings")}}> <CiSettings   className='icons fw-bolder fs-2'/> <Text className='ms-3 mt-1'>Settings</Text></Text>

  </ListItem> 
  <ListItem>
  <Text className='side-text   d-flex justify-content-between'  onClick={()=>{handleNavigation("job_detail/reportJob")}} > <MdReportGmailerrorred   className='icons fw-bolder fs-2' /> <Text className='ms-3 mt-1'>Report job</Text></Text>

  </ListItem> 
  
 

  
  <ListItem>
  <Text className="side-text   d-flex justify-content-between" onClick={()=>{handleNavigation("candidate/help")}}  > <RiFeedbackLine className='icons fw-bolder fs-2' /> <Text className='ms-3 mt-1'>Help and Feedback</Text></Text>

  </ListItem>
  {/* <ListItem>
  <Text className='side-text d-flex justify-content-between' onClick={onClose}>FAQ</Text>

  </ListItem> */}
  { loginButton ? <Text className="side-text"  onClick={()=>{handleNavigation("login")}}   >
     
     <Link >Log in </Link>   
     
      </Text> :
      <Text className='side-text d-flex justify-content-between' onClick={onLogOpen}  ><IoMdLogOut className='icons fw-bolder fs-2' /> <Text className='ms-3 mt-1'  >Log Out </Text>   
     
      </Text>
}
</UnorderedList>
      </DrawerBody>

    </DrawerContent>
   </Drawer>



   

      <AlertDialog
        isOpen={isLogOpen}
          leastDestructiveRef={cancelRef}
        onClose={onLogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Are you sure you want to log out?
            </AlertDialogHeader>

            <AlertDialogBody>
            "Every morning brings new potential, but only if you choose to take it. Seize the day with enthusiasm and courage, for you never know where the path may lead. Your future is created by what you do today, not tomorrow." — Unknown

            </AlertDialogBody>

            <AlertDialogFooter>
              <Button  onClick={onLogClose}>
                Cancel
              </Button>
              <Button colorScheme='red' ref={cancelRef}  onClick={onLogOutDelete} ml={3}>
                Log Out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

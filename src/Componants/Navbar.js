import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from "react-icons/fa";

import {Drawer, Button, Avatar, Input, HStack, Text, Box, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, VStack, Divider, UnorderedList, ListItem, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter,AlertDialogHeader, AlertDialogOverlay} from '@chakra-ui/react'

import {Link } from 'react-router-dom'
import { BiMenuAltLeft } from 'react-icons/bi'
import "../Styles/navbar.css"
import Heading from './Heading';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredJobs, setTokenData } from './Redux/jobSlice'; 
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';




export default function Navbar({users, onDelete, getCity, getRole, color}) {

const {isOpen:isLogOpen, onOpen:onLogOpen, onClose:onLogClose}= useDisclosure() 
const [loginButton,setLoginButton]= useState(false)
  const {isOpen, onOpen, onClose}=useDisclosure()
  const [userName, setUserName]= useState('Your Name')
  const [email,setEmail]= useState('Email') 
  const [loading,setLoading]= useState(false)
  const navigate= useNavigate()
   
   const [location, setLocation]= useState()
   const [role, setRole]= useState()
    const cancelRef = React.useRef();
    const tokenValue= useSelector((state)=>state.jobs.token)
    const dispatch= useDispatch() 
    const allJobs= useSelector((state)=>state.jobs.jobs)
    const filteredJobs = useSelector((state) => state.jobs.filteredJobs); 
    const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers) 
    const toast= useToast() 
    


    useEffect(() => {
      console.log(tokenValue)
    }, [tokenValue]);
    

   



    const handleSearchData=async ()=>{  
      
      if( !tokenValue){
        addToast("Please Login Yourself", 'Please Register', "warning") 
        return
      }
      try{
    const response = await fetch(`   https://jobnexus-backend.onrender.com/api/candidate/searchData?location=${encodeURIComponent(location)}&role=${encodeURIComponent(role)}`, {
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
    }
    
  }catch(err){
    console.log(err)
    

  }finally{
    setLoading(false)
  }
    }


    






 
 


     

    const onLogOutDelete=async()=>{
     localStorage.removeItem('token')
     dispatch(setTokenData(null))
     
     onLogClose()
      
    }



     
    const addToast=(title,message="", status)=>{
      toast({
        title: title,
        description: message,
        status: status,
        duration: 6000,
        isClosable: true,
      })
    }
    const handleHomeNavigate=()=>{
      navigate("/")
    }
  const handleLoginNavigate=()=>{
    navigate("/login")
  }

  return (  


 <Box   className='navbar fixed mb-5'   >
      <HStack justifyContent={'space-between'} >
        
      
          <Text  width={"fit-content"} fontSize={{base:'2rem',sm:'2.5rem',md:'3rem',lg:'3rem' }} color={'yellow'} fontWeight={'800'}  onClick={handleHomeNavigate}  > Jobify</Text>
        
        <Input textAlign={'center'}  spellCheck="true"  onChange={((e)=>{ setRole(e.target.value)})} display={{ base:'none' ,md:'block ' ,sm:'none' ,lg:'block' }}fontSize={{base:'1rem',md:'1rem'}}  fontWeight={'700'} placeholder ='Search for your role' />

        <Input   textAlign={'center'} spellCheck="true" onChange={((e)=>{ setLocation(e.target.value)})} fontSize={{base:'1rem',md:'1rem'}} display={{  base:'none', md:'none ' ,sm:'none' ,lg:'block' }} fontWeight={'700'} placeholder='Search your Location'/>  

        { location&&  location.length>1   && role && role.length>1 ?
        <Button isDisabled={false}  onClick={handleSearchData} width={'200px'} variant={'solid'} colorScheme='teal' display={{base:'none', md:'none', lg:'block'}} mr={'20'}><FaPaperPlane/></Button>
      :            <Button  isDisabled={true} onClick={handleSearchData} width={'200px'} variant={'solid'} colorScheme='teal' display={{base:'none', md:'none', lg:'block'}} mr={'20'}><FaPaperPlane/></Button>
}
        {/* <div className='d-block d-lg-none'><Heading/></div> */}


       { tokenValue? <Button  borderRadius={'full'}   width={{base:'25px',md:'50px' ,sm:'50px' , lg:'50px'}} backgroundColor='white'  size={{base:'xs', sm:'md',md:'md'}} mr={{base:'10px',}}    onClick={onOpen}   ><BiMenuAltLeft  size={'lg'}/></Button>:"not"}
       {  tokenValue?<Text width={'50px'} mr={{base:'px',md:'2', lg:'2'}} ><Link to='/profile'> <Avatar cursor={'pointer'} src={jobSeekerData.extraFields?.profileImage && jobSeekerData.extraFields?.profileImage.length>=1 ?jobSeekerData.extraFields?.profileImage:"" } size={{base:'xs' , sm:'xs',md:'md',lg:'md'}}  /></Link></Text>:""}

        <Box width={{ base:'10px' ,sm:'300px',md:'500px' ,lg:'500px'}}  mr={{base:'5' , sm:'5', md:'2',lg:'2'}}>     
         

         { !tokenValue ?  

  <Box  display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
  <Text  ><Button  onClick={handleLoginNavigate} backgroundColor={'white'} borderRadius={"100px"}   >Log in</Button></Text>
 <Link to="/registration"> <Button  ml={'10px'} display={{base:'none', sm:'block', md:'flex', lg:'flex'}} backgroundColor={'white'}  borderRadius={'full'}>Register</Button></Link>
  <Link to='/profile'>
      
    </Link>
  </Box>:""
      
}
    


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
  <span className='username'>{userName}</span>
  <span className='user-email'> {email}</span>
 <Link to='/profile'> <Text color={'blue'} fontSize={'0.8rem'} onClick={onClose}>View & Update Profile</Text></Link>
</VStack>
</HStack>
<Divider mt={'8'}/>
<UnorderedList spacing={'6'}>
  <ListItem>
    
  
    <Text className='side-text'  onClick={onClose} ><Link to="/">Home</Link></Text>
  </ListItem>
  <ListItem>
  <Text className='side-text' onClick={onClose} ><Link to="/main">Find Jobs </Link></Text>

  </ListItem>
  <ListItem>
  <Text  className='side-text'  onClick={onClose} ><Link to="/profile">Profile</Link></Text>

  </ListItem>
  <ListItem>
   
   
  { loginButton ? <Text className="side-text" onClick={onClose} >
     
     <Link >Log in </Link>   
     
      </Text> :
      <Text className='side-text' onClick={onClose} >
     
     <Link >Log Out </Link>   
     
      </Text>
}
  </ListItem>
  <ListItem>
  <Text className="side-text" onClick={onClose} ><Link to ="/signin">Sign in </Link></Text>

  </ListItem>
  <ListItem>
  <Text className='side-text' onClick={onClose} ><Link to ="/registration">Register</Link></Text>

  </ListItem>
  <ListItem>
  <Text className='side-text'  onClick={onClose}   _>Settings</Text>

  </ListItem> 
  <ListItem>
  <Text className='side-text' onClick={onClose}> <Link to="/companies">Companies </Link></Text>

  </ListItem> 
  <ListItem>
  <Text className='side-text' onClick={onClose} > <Link to="/companies/skeleton">Companies skeleton </Link></Text>

  </ListItem>


  
  <ListItem>
  <Text className="side-text" onClick={onClose} >Help</Text>

  </ListItem>
  <ListItem>
  <Text className='side-text' onClick={onClose}>FAQ</Text>

  </ListItem>
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

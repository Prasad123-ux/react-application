import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from "react-icons/fa";

import {Drawer, Button, Avatar, Input, HStack, Text, Box, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, VStack, Divider, UnorderedList, ListItem, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter,AlertDialogHeader, AlertDialogOverlay} from '@chakra-ui/react'

import {Link } from 'react-router-dom'
import { BiMenuAltLeft } from 'react-icons/bi'
import "../Styles/navbar.css"
import Heading from './Heading';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredJobs } from './Redux/jobSlice';



export default function Navbar({users, onDelete, getCity, getRole, color}) {

const {isOpen:isLogOpen, onOpen:onLogOpen, onClose:onLogClose}= useDisclosure()
  const {isOpen, onOpen, onClose}=useDisclosure()
  const [userName, setUserName]= useState('UserName')
  const [email,setEmail]= useState('Email')
   
   const [location, setLocation]= useState()
   const [role, setRole]= useState()
    const cancelRef = React.useRef();
    const [disable, setDisable]= useState(true)
    const [isScrolling,setIsScrolling]= useState(false)  
    const [tokenValue,setTokenValue]= useState()
    const dispatch= useDispatch() 
    const allJobs= useSelector((state)=>state.jobs.jobs)
    const filteredJobs = useSelector((state) => state.jobs.filteredJobs); 
    const jobSeekerData= useSelector((state)=>state.jobs.jobSeekers)


    useEffect(() => {
      console.log("Filtered Jobs updated:", filteredJobs);
    }, [filteredJobs]);
    

    useEffect(()=>{
      const token= localStorage.getItem('token')
      setTokenValue(token)


    }, [])
   



    const handleSearchData=async ()=>{ 
      try{
    const response = await fetch(`   http://localhost:5000/api/candidate/searchData?location=${encodeURIComponent(location)}&role=${encodeURIComponent(role)}`, {
      method:'GET',
      headers:{"content-type":"application/json"}
    })
   
    const data = await response.json() 
    console.log(data.jobs)
    if( data.job && data.job.length>=1){
     data.jobs && data.jobs.length>0 ? console.log(data.jobs[0]):console.log("data not found")
      dispatch(setFilteredJobs(data.job[0]))   
      }
    
  }catch(err){
    console.log(err)
    

  }
    }


    console.log(filteredJobs)






 
 


     

    const onLogOutDelete=async()=>{
     localStorage.removeItem('token')
     setTokenValue('')
     
     onLogClose()
      
    }



     console.log(location, role)


  return (  


 <Box  width={'full'} className='navbar fixed mb-5'   >
      <HStack justifyContent={'space-evenly'} >
        
      
        <Link to="/" className='link'>  <Text fontSize={{base:'2rem',sm:'2.5rem',md:'3rem',lg:'3rem' }} color={'yellow'} fontWeight={'800'}> Jobify</Text></Link>
        
        <Input textAlign={'center'}  spellCheck="true"  onChange={((e)=>{ setRole(e.target.value)})} display={{ base:'none' ,md:'block ' ,sm:'none' ,lg:'block' }}fontSize={{base:'1rem',md:'1rem'}}  fontWeight={'700'} placeholder ='Search for your role' />

        <Input   textAlign={'center'} spellCheck="true" onChange={((e)=>{ setLocation(e.target.value)})} fontSize={{base:'1rem',md:'1rem'}} display={{  base:'none', md:'none ' ,sm:'none' ,lg:'block' }} fontWeight={'700'} placeholder='Search your Location'/>  

        { location&&  location.length>1   && role && role.length>1 ?
        <Button isDisabled={false}  onClick={handleSearchData} width={'200px'} variant={'solid'} colorScheme='teal' display={{base:'none', md:'none', lg:'block'}} mr={'20'}><FaPaperPlane/></Button>
      :            <Button  isDisabled={true} onClick={handleSearchData} width={'200px'} variant={'solid'} colorScheme='teal' display={{base:'none', md:'none', lg:'block'}} mr={'20'}><FaPaperPlane/></Button>
}
        <div className='d-block d-lg-none'><Heading/></div>


        <Button  borderRadius={'full'}   width={{base:'25px',md:'50px' ,sm:'50px' , lg:'50px'}} backgroundColor='white'  size={{base:'xs', sm:'md',md:'md'}} mr={{base:'10px',}}    onClick={onOpen}   ><BiMenuAltLeft  size={'lg'}/></Button>
        <Text width={'50px'} mr={{base:'px',md:'2', lg:'2'}} ><Link to='/profile'> <Avatar cursor={'pointer'} src={jobSeekerData.extraFields?.profileImage && jobSeekerData.extraFields?.profileImage.length>=1 ?jobSeekerData.extraFields?.profileImage:"" } size={{base:'xs' , sm:'xs',md:'md',lg:'md'}}  /></Link></Text>

        <Box width={{ base:'10px' ,sm:'300px',md:'500px' ,lg:'500px'}}  mr={{base:'5' , sm:'5', md:'2',lg:'2'}}>     
         

         { tokenValue && tokenValue.length >= 1 ? (
  // <Box > <Button  backgroundColor={'white'} display={{base:'none', sm:'block',md:'block',lg:'block'}}  size={{base:'xs', sm:'xs', md:'md'}} borderRadius={'100px'}  onClick={onLogOpen}>Log out</Button></Box>
  <></>
):(
  <Box  display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
  <Text ><Link to  ="/login"><Button width={'100px'} display={{base:'none', sm:'block', md:'block', lg:'block'}} backgroundColor={'white'}  borderRadius={'50px'}padding={''} >Log in</Button></Link></Text>
 <Link to="/registration"> <Button  ml={'10px'} display={{base:'none', sm:'none', md:'flex', lg:'flex'}} backgroundColor={'white'}  borderRadius={'full'}>Register</Button></Link>
  <Link to='/profile'>
      
    </Link>
  </Box>
      
)}
    


        </Box>
        
        
    
        </HStack>
   

   <Drawer onClose={onClose} isOpen={isOpen} size={{base:'full', sm:'xs', md:'xs', lg:'md', xl:'md'}}>
    <DrawerOverlay/>
    <DrawerContent>
      <DrawerHeader></DrawerHeader>
      <DrawerCloseButton/>
      <DrawerBody>
      <HStack justifyContent={'space-between'}>
<Avatar size={'xl'}/>
<VStack ml={'25px'}>
  <Text fontSize={'1.7rem'} fontWeight={'500'}>{userName}</Text>
  <Text fontWeight={'400'} fontSize={'1.3rem'}> {email}</Text>
 <Link to='/profile'> <Text color={'blue'} fontSize={'1.2rem'} onClick={onClose}>View & Update Profile</Text></Link>
</VStack>
</HStack>
<Divider mt={'8'}/>
<UnorderedList spacing={'6'}>
  <ListItem>
    
  
    <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'} _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s" cursor={'pointer'}><Link to="/">Home</Link></Text>
  </ListItem>
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s"><Link to="/main">Find Jobs </Link></Text>

  </ListItem>
  <ListItem>
  <Text fontSize={'1.3rem'}onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s"><Link to="/profile">Profile</Link></Text>

  </ListItem>
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s"><Link to ="/login">Log In </Link></Text>

  </ListItem>
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s"><Link to ="/signin">Sign in </Link></Text>

  </ListItem>
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'} _hover={{color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s"><Link to ="/registration">Register</Link></Text>

  </ListItem>
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s">Settings</Text>

  </ListItem> 
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s"> <Link to="/companies">Companies </Link></Text>

  </ListItem> 
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s"> <Link to="/companies/skeleton">Companies skeleton </Link></Text>

  </ListItem>


  
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s">Help</Text>

  </ListItem>
  <ListItem>
  <Text fontSize={'1.3rem'} onClick={onClose} fontWeight={'500'}  _hover={{ color: 'teal.200', cursor: 'pointer' }}
    transition="background-color 0.3s">FAQ</Text>

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

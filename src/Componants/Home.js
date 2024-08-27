import React from 'react'

import "../Styles/Home.css"
import { Button , Card, Image, CardBody, Stack, Heading,CardFooter, Text,Link as ChakraLink, HStack, ChakraProvider} from '@chakra-ui/react'
import Footer from './Footer'
import {Link} from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'






export default function Home() {

  let image= ['https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/january/HN5y7hp89MHcEWgrSi9haJG4iDYWE3DHH0RvvEau.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/july/yynMGMz9qDDEqNQPLmijAa0FqfdmRuUNrI1icveZ.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/march/QEzey8P9T3AkU5VMMm2LRXyyUXhH5JxA75GVWiK8.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2022/april/Mp2fRLKl9YmxG7YBxanGbRYdkzMayIcwhiEe8HyD.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/october/YReWYFMk24w9ourRJ2RxQf1k81sJU14UyDHrvKgU.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/august/KKEOlTBrWIHzBibtGxek5VkyUxa2QeNgX9vPe8qh.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/august/yTKoftvbNtE2p1x5VqUo5NDOUfwnH2SSOL0BolFB.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/october/jgrsZbv93knv0ZbfyrVRjuGactExcDQZ7L31k4nf.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/september/15WS2PQ92d4ic3bvZcKPVBpvR7OwXuTdjW94riUL.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/february/Zw3suPwERv1Pb9pmRxKGti1T1SNRqyS7caf3j3Uq.jpeg','https://media.foundit.in/trex/prod-cdn/media/promotedemployer/2023/january/Dd5e9M2ngHQkAEP9s2Hu6agZh9EvDYHZQBaPs5xy.jpeg']
 let link = ['https://freshersindia.in/wp-content/uploads/2021/01/ICICI-BANK.png','https://nickrileyarchitect.files.wordpress.com/2015/10/google-workplace3.jpg','https://1.bp.blogspot.com/-gxRkmXsVQUc/XupV7u0pEcI/AAAAAAAAAOQ/cjNxMFY1B2Y_7dKI1sESY4vzG1VKsPPfgCK4BGAsYHg/s780/01282017_MicrosoftImmigrati-780x469.jpg','https://i2.wp.com/www.formtrends.com/wp-content/uploads/2015/10/new-mobility-world_iaa2015_113.jpg?ssl=1','https://officesnapshots.com/wp-content/uploads/2020/06/aurecon-offices-brisbane-6.jpg','https://th.bing.com/th/id/OIP.Luaubjuv2IZf9m0ED79sygHaE8?pid=ImgDet&w=1024&h=683&rs=1','https://th.bing.com/th/id/OIP.X-c5kV6AuIX4VBWD7a6bsQHaE7?pid=ImgDet&w=2048&h=1365&rs=1','https://i.pinimg.com/originals/d8/d9/d2/d8d9d2b30958772a3e39841566b366d2.jpg']
  let name=['ICICI Bank', 'Google','Microsoft','IBM','Facebook','Amazon','Apple', 'Uber']
  
  return (
    <div className='home'>
      <HStack>
    
      <Text fontSize={{base:'2rem',sm:'4rem', md:'5rem', lg:'5rem'}} fontWeight={'700'} color={'yellow'} >Jobify</Text>
    
    
      <ChakraLink
          href="https://api.whatsapp.com/send?phone=9307173845&text=Hi%20I%20am%20on%20your%20application"
          isExternal
          position="fixed"
           top={{base:'14', lg:'20'}}
          right="4"
          p="2"
          bgColor=""
          color="white"
          borderRadius="full"
          width={'100px'}
          display={{ base: 'display', md: 'block' }}
          _hover={{ bgColor: 'green.600' }}
        >
          <FaWhatsapp color='green' fontSize={'2rem'} position={'fixed'} />
        </ChakraLink>
</HStack>
      <div className='main-class'>
        <Text fontSize={{base:'1.8rem', sm:'2rem', md:'3rem',lg:'3rem'}} fontWeight={'700'}>Find you dream job now</Text><br></br>
        <Text fontSize={{base:'1.2rem', sm:'1.4rem',md:'1.6rem', lg:'1.8rem' }} fontWeight={'500'}>5 lakh+ jobs for you to explore</Text>
        <div className='buttons'>
        <ChakraProvider>
  
   <Button  as={Link} to="/login" _hover={{color:'cyan', bgColor:'aliceblue'}} width={{base:'150px',sm:'200px', md:'400px', lg:'500px' }} mt={{base:'10',sm:'40px', md:'50px', lg:'60px'}} p={1} colorScheme='teal' variant={'outline'} fontSize={{base:'1rem', sm:'1.5rem',md:'1.2rem', lg:'1.8rem'}}  > Log In</Button> 
   
    <Button  as={Link} to="/login" width={{base:'150px',sm:'200px', md:'400px', lg:'500px' }} _hover={{color:'cyan', bgColor:'aliceblue'}} mt={{base:'10',sm:'40px', md:'50px', lg:'60px'}} p={1} colorScheme='teal' variant={'outline'} fontSize={{base:'1rem', sm:'1.5rem',md:'1.2rem', lg:'1.8rem'}} > Sign In</Button>
        
        </ChakraProvider>
    
        </div>
       <Text mt={'10'}> Don't have an account ? <Link to="/registration">Register Here.</Link></Text><br></br>
        
       <Link to='/main'> <Button  w={'200px'} mt={'5'} colorScheme='red'  variant={'solid'} fontSize={'15'}>Continue as a Guest</Button></Link>

      </div>
      <div className='company'>
      <Text fontSize={{base:'1.8rem' , sm:'2.2rem', md:'2.8rem', lg:'3rem'}} fontWeight={'700'} letterSpacing={'2px'} >Cool Places to Work</Text>
      <div className='cards'>

         {
 
        name.map((item, index)=>(
           <div>
         <Card   width={{base:'175px', sm:'175px',md:'180px',lg:'250px'}} height={{base:'150px',sm:'190px',md:'220',lg:'230'}}  mt={'5'}>
  <CardBody>
    <Image
      src={link[index]}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    /> 
    <Stack mt='1' spacing='3'>
      <Heading size='md' ml='2'>{item}</Heading>
      
    </Stack>
  </CardBody>
  <CardFooter>
  </CardFooter>
  </Card> 
 </div>
        ))
      
}  

      </div>
    </div>
    <div className='company-info'>
    <Text  fontSize={{base:'1.8rem' , sm:'2.2rem', md:'2.8rem', lg:'3rem'}} fontWeight={'700'} letterSpacing={'2px'}> Sponsored Companies</Text>

<div className='logo'>

{
  image.map((item, index)=>{

 return <Image width={{base:'800px', sm:'600px'}} height={{base:'5vh', sm:'5vh' , md:'5vh', lg:'7vh'}} key={index}   src={item}  alt='company' />


  })
}
</div>

    </div>
  <Footer/>


    </div>

    
  )
}
  
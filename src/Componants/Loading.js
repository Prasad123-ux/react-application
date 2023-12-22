import React from 'react'
// import  loader from './loader2.gif'
import loader from '../Componants/loader2.gif'; // Adjust the relative path if needed
// import loader2 from '../Componants/animation.gif'

import {Box, SkeletonCircle, SkeletonText, VStack,Image, HStack, Avatar, Text, Button, Center, } from '@chakra-ui/react'

export default function Loading() {
  
  const skeArray=[1,2,3,4,5]
  
  return (
     <div>
      
    

<Center>
  <VStack>
    {skeArray.map(()=>{
      return<Box paddingRight={{ base:'20px', md:'50px',lg:'50px'}} mt={'5'} borderRadius={'10'} mr={'7'} paddingLeft={{ base:'20px', md:'10px',lg:'50px'}} pt={'20px'} boxShadow='lg' width={{base:'full', md:'full', lg:'800px'}} height={{ base:'40vh', md:'60vh',lg:'60vh'}} bg='white'>
  <SkeletonCircle size='7' />
  <SkeletonText mt='4' noOfLines={{base:4, lg:8}} spacing='4' skeletonHeight='2' />

</Box>
    })
}

  <Image src={loader} width={'200px'} mb={'50px'} borderRadius={'px'} bgColor={'grey'} backgroundColor='transparent' alt="Loader"/> 

</VStack>
</Center>
{/* <Image src={loader} width={'200px'} mb={'50px'} borderRadius={'px'} bgColor={'grey'} backgroundColor='transparent' alt="Loader"/>  */}
 </div>
  )
}
  
import React from 'react'
import { useState } from 'react'

import { Box, Avatar, VStack, FormControl, Input, Button, Text, Center, Alert, AlertDescription, AlertTitle, AlertIcon,CloseButton} from '@chakra-ui/react'
import {Link} from 'react-router-dom'


export default function Signin({users}) {

  
  const [preMail, setPreMail]= useState()
  const [preName, setPreName]= useState()
  const [success, setSuccess]= useState(false)
  const [dataNotFound, setDataNotFound]= useState(false)
  


  const getLoggedIN=()=>{

    const userExist=users.find((u)=>u.email===preMail && u.password===preName);

    if(userExist){
      setSuccess(true)
  
    }
    else{
      setDataNotFound(true)
    }
  }


  return (
    
      <Center>
       { !success && !dataNotFound && (<Box mt={{base:'150px',md:'200px',lg:'100px'}} className='login'  borderRadius={'20'} backgroundColor={'blue.200'} width={{base:'500px', md:'600px',lg:'800px'}} height={{ base:'35rem',md:'35rem',lg:'35rem'}}> 
 <VStack justifyContent={'start'}>
 <Text fontSize={{base:'2rem', md:'3rem', lg:'2rem'}} fontWeight={'500'} color={'blue.500'} textAlign={'center'} mb={'5'}> User Sign in </Text>
<Avatar size={{base:'sm',sm:'md', md:'md', lg:'lg'}} mb={'10'}/>
<FormControl>
  <VStack spacing={'5'}>
<Input  onChange={(e)=>{setPreMail(e.target.value)}} color={'white'} type='email' width={{ base:'250px',md:' ',lg:'400px'}} textAlign={'center'} fontWeight={'700'}  focusBorderColor='pink.400' placeholder='Email'  />
<Input  onChange={(e)=>{setPreName(e.target.value)}} color={'white'} width={{ base:'250px',md:'300px ',lg:'400px'}} type='password' size='lg' textAlign={'center'} fontWeight={'700'} focusBorderColor='pink.400'  placeholder='Password'/>
 <Button onClick={getLoggedIN} colorScheme='teal'  variant={'solid'} size={{base:'sm',sm:'sm', md:'md', lg:'lg', xl:'lg'}} type='submit' w={{base:'100px',md:'150px',lg:'200px'}}> Submit</Button>
</VStack>
</FormControl>
<Text  textAlign={'center'} fontSize={{base:'1rem', md:'1rem', lg:'1rem'}} mt={'5'}> <a href='/'>Forget Password ?</a> </Text>

<Text textAlign={'center'} fontSize={{base:'1rem', md:'1rem', lg:'1rem'}}> Don't have an account ? <Link to='/registration'>Register Here.</Link> </Text>

</VStack>

    </Box>)}



    { success &&(
  <Alert  alignItems={'center'} status="success" mt={20} variant="solid" flexDirection="column" justifyContent="center" textAlign="center">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Sign in Successful!
            </AlertTitle>
            <AlertDescription>Enjoy your job search and discover exciting opportunities. Remember: "Success is not final, failure is not fatal: It is the courage to continue that counts."</AlertDescription>
            <Button size={'sm'} width={'200px'}><Link to ="/main">Let's get Job</Link></Button>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccess(false)} />
          </Alert>)}




          { dataNotFound &&(
  <Alert  alignItems={'center'} status="warning" mt={20} variant="solid" flexDirection="column" justifyContent="center" textAlign="center">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Oops ! Data not Found
            </AlertTitle>
            <AlertDescription>It seems like there's no data available. Don't be discouraged. Keep looking, and you'll find the right opportunity. "The only limit to our realization of tomorrow will be our doubts of today."
          </AlertDescription>
            
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setDataNotFound(false)} />
          </Alert>)}

    
  
      </Center>
  
    
  )
}

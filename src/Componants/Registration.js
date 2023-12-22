import React, { useState } from 'react'
import {Box, Grid, Text, Input, VStack,Alert ,AlertIcon, AlertTitle,AlertDescription, CloseButton,Button, useDisclosure, Center} from '@chakra-ui/react'
 import {Link} from 'react-router-dom'


export default function Registration({addUser,users}) {


  
   const {isOpen, onClose, onOpen}= useDisclosure({defaultIsOpen:false})
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [valid, setValid]=useState(false)
    const [register, setRegister]= useState(true)
    const [succeed, setSucceed]= useState(true);
    const [registeredEmail, setRegisteredEmail]= useState(true)

    


    const getData=()=>{
      if(users && users.length){
      for(let i =0; i<users.length; i++){
        if(users[i].email===email){
          setRegisteredEmail(false)
           return false
        }
      }
      return false
    }
         return true
    
  }
  console.log(users.length)



    const submitAction = () => {
      const user = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
        

      if((!user.email)||(!user.name)||(!user.password)){
          setRegister(false)
      }
      
      else if(user.password!==user.confirmPassword){
  setRegister(false)
  console.log(users)
    }
      else if(!getData()){
       setRegister(false)

      }
      else{
        addUser(user)
         setEmail('');
         setName('');
         setPassword('');
         setConfirmPassword('');
         setSucceed(false)
          
           
      }

    }
    
    
   


  return (
    <div>
      <Center>
        {register && succeed && registeredEmail &&(<Box    mt={{base:'100px', md:'100px', lg:'100px'}}  textAlign={'center'}  >
        
        <Text fontSize={{ base:'1.7rem',md:'2rem',lg:'2.5rem'}} color={'cyan'} fontWeight={'700'} >Registration Form</Text>
      
        <Grid   templateColumns={{base:'repeat(1,1fr)', md:'repeat(2,1fr)'}} gap={'10'} height={'200px'} marginTop={'20'}  padding={{base:'5', sm:'50px',lg:'50px', xl:'10px'}} fontSize={{base:'0.8rem', md:'1rem', lg:'1.5rem'}} >
           <Input     textAlign={'center'} onChange={(e)=>{setName(e.target.value)}} value={name}  fontWeight={'700'} type='name' placeholder='FullName' variant={'filled'} borderRadius={'50'}/>
            <Input   textAlign={'center'} onChange={(e)=>{setEmail(e.target.value)}} value={email}  fontWeight={'700'} type='email' placeholder='Email' variant={'filled'} borderRadius={'50'} />
            <Input   textAlign={'center'} isInvalid={valid} onChange={(e)=>{setPassword(e.target.value)}} value={password} fontWeight={'700'} type='password' placeholder='Password' variant={'filled'} borderRadius={'50'} />
            <Input   textAlign={'center'} isInvalid={valid} onChange={(e)=>{setConfirmPassword(e.target.value)}} fontWeight={'700'} type='password' placeholder='Confirm Password' variant={'filled'} borderRadius={'50'} />

        </Grid>
      
        <VStack>
        
         <Button mt={{ base:'200px', md:'50px'}} onClick={submitAction} colorScheme='teal' size={{base:'xs',sm:'sm', md:'md', lg:'lg', xl:'lg'}} width={{base:"100px",lg:'200px'}}>Register</Button><br/>
         <span className='register' > Already have an account ? <Link to='/login'>Log In</Link> </span>
</VStack>


      </Box>)}

      { !succeed && ((<Alert  alignItems={'center'} status="success" mt={20} variant="solid" flexDirection="column" justifyContent="center" textAlign="center">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
            Congratulations! You have successfully registered.
            </AlertTitle>
            <AlertDescription>  Welcome aboard to a world of new opportunities. "Your journey begins now. Welcome to a world of possibilities and endless opportunities."</AlertDescription>
            <Button size={'sm'} width={'200px'}><Link to ="/main">Let's get Job</Link></Button>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSucceed(true)} />
          </Alert>))

      }
      { !register && ((<Alert  alignItems={'center'} status="warning" mt={20} variant="solid" flexDirection="column" justifyContent="center" textAlign="center">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
            Oops! It seems like there are validation errors.
            </AlertTitle>
            <AlertDescription> "Mistakes are the portals of discovery. Double-check, correct, and embark on your registration journey once again."</AlertDescription>
            
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setRegister(true)} />
          </Alert>))

      }
       { !registeredEmail && ((<Alert  alignItems={'center'} status="warning" mt={20} variant="solid" flexDirection="column" justifyContent="center" textAlign="center">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
            Oops! It seems like the provided email is already registered.
            </AlertTitle>
            <AlertDescription>"Your enthusiasm to join us is appreciated! It seems you've already taken the first step. If you have an account, let's reunite. If not, consider using a different email for your adventure."</AlertDescription>
          
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setRegisteredEmail(true)} />
          </Alert>))

      }
</Center>
    </div>
  )
}

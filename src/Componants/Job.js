import React, { createContext, useState } from 'react'
import {Box, HStack, Avatar, VStack,Text, Button} from '@chakra-ui/react'
import './job.css'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { FaCalendar, FaSave} from 'react-icons/fa'

const UserContext =createContext()

  export default function Job({href, contract_type,category,company_name, title,logo, location, country, employment_type, description,experience,maxSalary,minSalary,qualification , id, onDelete}) {


 let date= experience.slice(0,10)

let monthMaxSalary
let monthMinSalary

if(maxSalary>0 && minSalary>0){
  monthMaxSalary=(maxSalary/12);
  monthMinSalary=minSalary/12;

}
 const [rupee, setRupee] =useState('₹')
 const [save, setSave]=useState('save')
 const [values, setValues] =useState([])
  





 if(maxSalary===' '){
  setRupee('')
 }

 const handleDelete=()=>{

 onDelete(id)

}


const copied = () => {
  

  setSave('saved');

   const newObject = [company_name,title, location, employment_type, date,maxSalary,minSalary,contract_type,description ];
   setValues([...values, newObject]);
   console.log(values);
};

 if(description.length>450){
   description.slice(0,400)
 }

  


    
  return (
  <>
    <UserContext.Provider value={{values, setValues}}>
    <Box className='box' >
      
      <VStack justifyContent={'center'}>
    <HStack justifyContent={{base:'start',md:'start', sm:'start'}}>
    <Avatar className='avatar' size={{base:'sm', sm:'md', md:'md', lg:'md',xl:'md'}}  name={company_name} />
    <Text className='title'>{title}</Text>
    </HStack >
    <Text className='companyName'>{company_name}</Text>
    <HStack spacing={'px'} justifyContent={'space-between'} >
      <Text className='location'> Location:{location}, {country}</Text>
    <Text className='employment-type'>{employment_type}</Text>
    <Text className='experience' alignItems={'center'}><FaCalendar className='icon' color='green'/> Posted:{date}</Text>
    </HStack>        
    <HStack className='salary' justifyContent={'space-evenly'}>
    <Text className='maxSalary'> salary:{rupee}{monthMinSalary}-{monthMaxSalary}/Month</Text>
      <Text className='contract'> Type:{contract_type}</Text>
    </HStack>
    <Text className='description' >{description}</Text>
    <HStack justifyContent={{base:'end',sm:'space-evenly',md:'space-evenly'}} mt={{base:'2', sm:'7',md:'10', lg:'10', xl:'10'}}  ml={{base:'4',sm:'0', md:'0', lg:'0', xl:'0'}}>
      <Button width={{base:'100px',sm:'',md:'200px', lg:'200px'}}  backgroundColor={'transparent'} fontSize={{base:'0.5rem',md:'0.8rem'}} className='not-interested' onClick={handleDelete}>Not interested</Button>
    <a href={href}><Button className='button' width={{base:'20', sm:'35', md:'40', lg:'40', xl:'40'}}  fontSize={{base:'10',md:'18'}} height={{base:'8'}} colorScheme='messenger'><ExternalLinkIcon/>Apply</Button></a>
   <Button width={{base:'40', sm:'30',md:'200px'}} backgroundColor={'gray.300'} onClick={copied} height={{base:'7', sm:'', md:'', lg:'', xl:''}} className='save' fontSize={{base:'0.7rem', sm:'0.9rem', md:'1rem', lg:'1rem', xl:'1.2rem'}}  mr={'10'}> <FaSave className='icon' fontSize={'1rem'}/> {save}</Button>
   
  

   </HStack>
   </VStack>
   
    
      </Box>
        </UserContext.Provider>
        </>
    
  )
} 
export {UserContext};
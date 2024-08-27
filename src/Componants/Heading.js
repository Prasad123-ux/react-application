import { Button , Drawer , DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, Checkbox, Box, Flex, AccordionProvider, DrawerFooter} from '@chakra-ui/react'
import React  from 'react'
import { useState } from 'react'
 import './heading.css'
import {Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Alert, AlertIcon} from '@chakra-ui/react'

 


   export default function Heading({onDataReceived}) {

    const sendDataToParent=(value)=>{
      const data=value
      onDataReceived(data)

    }

  const [isChecked, setIsChecked]= useState(true)
  const {isOpen, onClose, onOpen}=useDisclosure()
  
  const handleCheckboxChange=(e, value)=>{

  

    
    setIsChecked(e.target.checked)
    

  if(e.target.checked){
    setIsChecked(true)
    sendDataToParent(value)
  }
  else{
    sendDataToParent(null)
    setIsChecked(false)
  }
   
}



 


  const accordionSize=[
{
heading:'Qualification',
content:(
  <>
        <Flex gap={'12'}> 
          <Checkbox onChange={(e)=>handleCheckboxChange(e,'12')}   checked={isChecked} colorScheme='green'>10th</Checkbox>
          <Checkbox onChange={(e)=>handleCheckboxChange(e,'12')}   checked={isChecked} value='true' colorScheme='green'>12th</Checkbox>
          </Flex>
          <Flex gap={'12'}>
          <Checkbox onChange={(e)=>handleCheckboxChange(e,'12')}  checked={isChecked} colorScheme='green'>Graduation</Checkbox>
          <Checkbox onChange={(e)=>handleCheckboxChange(e,'12')}   checked={isChecked} colorScheme='green'>PostGraduation</Checkbox>
       </Flex>
  </>
)

},
{
  heading:'Freshness',
  content:(
    <>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'15')}  checked={isChecked}  >Last 14 Days</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'30')}  checked={isChecked} >Last 30 Days</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'4')}  checked={isChecked} >Last 4 Days</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'7')}  checked={isChecked} >Last 7 Days</Checkbox>

    </>
  )

},
{
  heading:'Job category',
  content:(
    <>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Accounts')}  checked={isChecked} >Accounts</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Banking')}  checked={isChecked} >Banking</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Insurance')} checked={isChecked} >Insurance</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Finance')} checked={isChecked} >Finance</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Data Analyst')}  checked={isChecked} >Data Analyst</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Frontend developer')}  checked={isChecked} >Frontend developer</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Backend developer')}  checked={isChecked} >Backend developer</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Full Stack Developer')}  checked={isChecked} >full stack developer</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Software Developer')}  checked={isChecked} >Software developer</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Content Writer')}  checked={isChecked} >Content Writer</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Marketing')}  checked={isChecked} >Marketing/sales</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Cloud Computing')}  checked={isChecked} >Cloud Computing</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Customer Support')}  checked={isChecked} >customer support</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'software developer')}  checked={isChecked} >Software developer</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Administrator')}  checked={isChecked} >Administrator</Checkbox>





    </>

  )
},
{
  heading:'Job-type', 
  content:(
    <>
  <Checkbox onChange={(e)=>handleCheckboxChange(e,'1')}  checked={isChecked} >Full Time Job</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'1')}  checked={isChecked} >Part Time Job</Checkbox>

  </>
  )
}
,
{
  heading:'Location',
  content:(<>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Delhi')}  checked={isChecked} >Delhi</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Pune')}  checked={isChecked} >Pune</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Mumbai')}  checked={isChecked} >Mumbai</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Hyderabad')}  checked={isChecked} >Hyderabad</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Bangalore')}  checked={isChecked} >Bangalore</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Indore')}  checked={isChecked} >Indore</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Lucknow')}  checked={isChecked} >Lucknow</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Chennai')}  checked={isChecked} >Chennai</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Gurgaon')}  checked={isChecked} >Gurgaon</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Noida')}  checked={isChecked} >Noida</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Kolkata')}  checked={isChecked} >Kolkata</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Ahmadabad')}  checked={isChecked} >Ahmadabad</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Nashik')}  checked={isChecked} >Nashik</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Jaipur')}  checked={isChecked} >Jaipur</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Thane')}  checked={isChecked} >Thane</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Surat')}  checked={isChecked} >Surat</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Chandigarh')}  checked={isChecked} >Chandigarh</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Vadodara')}  checked={isChecked} >Vadodara</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Mohali')}  checked={isChecked} >Mohali</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Nagpur')}  checked={isChecked} >Nagpur</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'Goa')}  checked={isChecked} >Goa</Checkbox>



  </>)
},
{
  heading:'MaxSalary',
  content:(
    <>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'10000')}  checked={isChecked} >10000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'20000')}  checked={isChecked} >20000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'30000')}  checked={isChecked} >30000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'50000')}  checked={isChecked} >40000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'60000')}  checked={isChecked} >50000+</Checkbox>
    </>
  )
}, 
{
  heading:'MinSalary',
  content:(
    <>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'10000')}  checked={isChecked} >10000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'20000')}  checked={isChecked} >20000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'30000')}  checked={isChecked} >30000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'50000')}  checked={isChecked} >40000</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'60000')}  checked={isChecked} >50000-</Checkbox>
    </>
  )
}, 
{
  heading:'Country',
  content:(
    <>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'in')}  checked={isChecked} >India</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'us')}   checked={isChecked}>United-States</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'ca')}  checked={isChecked} >Canada</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'gb')}  checked={isChecked} >United Kingdom</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'au')}  checked={isChecked} >Australia  </Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'de')}  checked={isChecked} >Germany  </Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'fr')}  checked={isChecked} >France</Checkbox>

<Checkbox onChange={(e)=>handleCheckboxChange(e,'nz')}  checked={isChecked} >New Zealand</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'sg')}  checked={isChecked} >Singapore</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'be')}  checked={isChecked} >Belgium</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'pl')}  checked={isChecked} >Poland</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'za')}  checked={isChecked} >South Africa</Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'it')}  checked={isChecked} >Italy  </Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'es')}  checked={isChecked} >Spain </Checkbox>
<Checkbox onChange={(e)=>handleCheckboxChange(e,'sk')}  checked={isChecked} >South Korea</Checkbox>

<Checkbox onChange={(e)=>handleCheckboxChange(e,'mx')}  checked={isChecked} >Mexico</Checkbox>

    </>
  )
}
  ]

  

  
  



  




  return (
  
    <div>
    

      <Button pos={'fixed'}  mt={{base:'2rem',sm:'3rem',md:'4rem',lg:'5rem'}}  top={'6'} colorScheme='whatsapp' width={{base:'100px', md:'200px',lg:'200px'}} height={'40px'} variant={'solid'}  onClick={onOpen} fontSize={'20'} size={{base:'sm', sm:'sm', md:'md', lg:'lg', xl:'xl'}} > Apply Filters</Button>

      <Drawer isOpen={isOpen} placement='left'  onClose={onClose}  size={'xs'}> 

    <DrawerOverlay/>

    <DrawerContent>
   <DrawerCloseButton/>
  <DrawerHeader color={'yellow'}>Jobify</DrawerHeader>
  <DrawerBody >
     <div className='main'>
      <div className='main-head'>
        <span className="filter">Filter Job</span>
        
        <Alert status='info'>
    <AlertIcon />
    Please select only one filter at a time. If the page is unresponsive, please refresh it.
  </Alert>
      </div>
      <Accordion  mt={'10'}  allowMultiple >
        {
          accordionSize.map((item, index)=>{
       return <AccordionItem key={index}>
         
         <AccordionButton>
          
          <Box as='span' textAlign={'left'} flex={'1'} fontSize={'20'} fontWeight={'500'}>{item.heading}</Box>

          <AccordionIcon/>
         </AccordionButton>
         <AccordionPanel fontSize={'25'} fontWeight={'500'}>
          {item.content}
         </AccordionPanel>
         </AccordionItem>
         
          })
        }
        
      </Accordion>

    </div>
     </DrawerBody>
     <DrawerFooter><Button fontSize={'20'} width={'100px'} alignItems={'center'} border={'1px solid gray'} onClick={onClose}>Submit</Button></DrawerFooter>
    </DrawerContent>


      </Drawer>

    </div>
    

  )
}

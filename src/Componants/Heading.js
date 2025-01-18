import { Button , Drawer , DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, Checkbox, Box, Flex, AccordionProvider, DrawerFooter} from '@chakra-ui/react'
import React  from 'react'
import { useState } from 'react'
import "../Styles/heading.css"
import { FaPaperPlane } from "react-icons/fa";
import {Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Alert, AlertIcon} from '@chakra-ui/react'
import options from './data.json'
import { MdClear } from "react-icons/md"; 
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredJobs } from './Redux/jobSlice';
// import e from 'express';

 


   export default function Heading() {
    const [filteredValue, setFilteredValue]= useState({})   
     const [checkedValue, setIsCheckedValue]= useState() 
     const [isChecked, setIsChecked]= useState(true)
  const {isOpen, onClose, onOpen}=useDisclosure()
  const dispatch= useDispatch();
  const allJobs= useSelector((state)=>state.jobs.jobs)   
  const filteredJobs = useSelector((state) => state.jobs.filteredJobs);

   const [filter, setFilter]= useState({})   




     const onchange=(name, value)=>{    
      
        //checking for the value is in array

        if (name in filteredValue && filteredValue[name].includes(value))  {

         console.log("value find") 
         console.log(filteredValue[name]) 
         if (Array.isArray(filteredValue[name])){
         const updatedArray=filteredValue[name].filter((item)=>item!==value)  
         console.log(updatedArray) 
             
         if (updatedArray.length === 0) {
          const { [name]: removed, ...newFilteredValue } = filteredValue;
          setFilteredValue(newFilteredValue);
        } else {
          setFilteredValue({ ...filteredValue, [name]: updatedArray });
        }
         }else{
          
          delete filteredValue[name]
          
         }
        
    }else{
      if(name in filteredValue) { 
        setFilteredValue({...filteredValue, [name]: [...filteredValue[name], value]})
        //checking for the name is in array
      }else{

      
       setFilteredValue({...filteredValue,  [name]:[value]})   
      }


    }



    }
  


    
     
     
     

   

  
  
  

     const onFilterSubmit=async ()=>{
      const params= new URLSearchParams();


      for (const key in filteredValue){
        const value=filteredValue[key] 

        if(Array.isArray(value)){
          value.forEach((item)=>params.append(key, item))
        }else{
          params.append(key, value)
        }
      }
    const queryString= params.toString()
         
    const response= await  fetch(`   http://localhost:5000/api/candidate/filterData?${queryString}`, {
      method:"GET",
    headers:{
        "Content-type":"application/json"
      }
    })  

     const data= await response.json()
     console.log(data.jobs)  
     if( data.jobs && data.jobs.length>=1){
     dispatch(setFilteredJobs(data.jobs[0]))   
     }

     }



    
  const handleAllclear=()=>{
      setFilteredValue({})
      dispatch(setFilteredJobs(""))
  }



     
  
  return (
  <>
    <Box className='landscape-filter'  display={{ base: 'none', sm: 'none', md: 'none', lg: 'block' }}>
    
       


{/* <Button pos={'fixed'}  mt={{base:'2rem',sm:'3rem',md:'4rem',lg:'5rem'}}  top={'6'} colorScheme='whatsapp' width={{base:'100px', md:'200px',lg:'200px'}} height={'40px'} variant={'solid'}  onClick={onOpen} fontSize={'20'} size={{base:'sm', sm:'sm', md:'md', lg:'lg', xl:'xl'}} > Apply Filters</Button>  */}
{/* <Drawer className="heading-drawer" isOpen={isOpen} placement='left'  onClose={onClose}  size={'xs'}>   */}
        
{/* <DrawerOverlay/>  */}

     {/* <DrawerContent>  */}
    {/* <DrawerCloseButton/>  */}
   {/* <DrawerHeader color={'yellow'}>Jobify</DrawerHeader>  */}
   {/* <DrawerBody >  */}  




     
     <div className='main-heading '>
      <div className='main-head'>
        <span className="filter">Filter Job</span>
        
   
      </div>
      <Accordion    mt={'5'} allowMultiple  className='accord'>
        {
         options.accordionSize.map((item, index)=>{
       return <AccordionItem className='' key={index}>
         
         <AccordionButton >
          
          <Box className='' fontWeight={'600'} fontSize={'15'} as='span' textAlign={'left'} flex={'1'} > {item.heading}  </Box>

          <AccordionIcon className="ms-2"/>    
         </AccordionButton>
         <AccordionPanel  className=''>    
          {item.value.map((values)=>{
            return <Checkbox    value={values} name={values}  isChecked={filteredValue[item.heading]?.includes(values)}   onChange={(e)=>{onchange(item.heading, e.target.name)}} >{values}</Checkbox>
          })}
         </AccordionPanel>
         </AccordionItem>
         
          })
        }
        <div className='d-flex justify-content-between'>
              <button className='btn btn-outline-primary icons mt-3 ' onClick={onFilterSubmit}><FaPaperPlane/></button>
            {filteredJobs && filteredJobs.length>=1  ? <button className='btn btn-danger icons  mt-3 ' onClick={handleAllclear}><MdClear /></button> :"" }
              </div>


      </Accordion>
    </div>
     {/* </DrawerBody>  */} 
    {/* <DrawerFooter>  */}
      {/* <Button fontSize={'20'} width={'100px'} alignItems={'center'} border={'1px solid gray'} onClick={onClose}>Submit</Button> */}  
   
       {/* </DrawerFooter>  */}
     {/* </Drawer/</>Content>  */}


       {/* </Drawer>  */}

    </Box>
    <Box  display={{ base: 'block', sm: 'block', md: 'block', lg: 'none' }}>
    

       <Button className=" filter-button btn btn-outline-primary" onClick={onOpen} >fil</Button> 

     <Drawer className="heading-drawer" isOpen={isOpen} placement='left'  onClose={onClose}  size={'xs'}>  
        

     <DrawerOverlay/> 

     <DrawerContent> 
    <DrawerCloseButton/> 
   <DrawerHeader color={'yellow'}>Jobify</DrawerHeader> 
   <DrawerBody > 
     <div className='main-heading ' >
      <div className='main-head'>
        <span className="filter">Filter Job</span>
        
   
      </div>
      <Accordion    mt={'5'} allowMultiple  className='accord'>
        {
         options.accordionSize.map((item, index)=>{
       return <AccordionItem className='' key={index}>
         
         <AccordionButton >
          
          <Box className='' fontWeight={'600'} fontSize={'15'} as='span' textAlign={'left'} flex={'1'} >{item.heading}</Box>

          <AccordionIcon className="ms-2"/>
         </AccordionButton>
         <AccordionPanel  className=''>
        {item.value.map((values)=>{
             return <Checkbox   checked={isChecked} >{values}</Checkbox>
        })}
         </AccordionPanel>
         </AccordionItem>
         
          })
        }
        
      </Accordion>

    </div>
     </DrawerBody> 
    <DrawerFooter > 
      <div className='d-flex justify-content-around'>
      {/* <Button fontSize={'20'} width={'100px'} alignItems={'center'} border={'1px solid gray'} onClick={onClose}>Submit</Button>   */}
      {/* <button disable className='btn btn-outline-primary'><FaPaperPlane/> submit</button> */}
      </div>
       </DrawerFooter> 
     </DrawerContent> 


       </Drawer> 

    </Box>

    
    </>
    

  )
}

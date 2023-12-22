import React, { useState } from 'react'
import { HStack , Box, VStack, Input, Button, Text, Stack, Heading, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, ModalFooter, FormControl, FormLabel, Radio, RadioGroup, Select} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa';
import Projects from './Projects';





export default function Education() {
   
  const {isOpen:isDoctorateModalOpen , onOpen:onDoctorateModalOpen, onClose:onDoctorateModalClose }= useDisclosure();
  const {isOpen:isPostGraduationOpen , onOPen:onPostGraduationOpen, onClose:onPostGraduationClose }= useDisclosure()
  const {isOpen:isGraduationOpen , onOPen:onGraduationOpen, onClose:onGraduationClose }= useDisclosure()
  const {isOpen:isXIIOpen , onOPen:onXIIOpen, onClose:onXIIClose }= useDisclosure()
  const {isOpen:isXIOpen , onOPen:onXIOpen, onClose:onXIClose }= useDisclosure()
  const year=['2024','2023','2022','2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009'];




  const initialEducationState={

  education: '',
  university: '',
  course: '',
  specialization: '',
  percentage:'',
  startYear: '',
  endYear: '',
  courseType: '',
  marksObtained: '',

  }


  const [doctorate, setDoctorate]= useState([ ])

  const [currentInput, setCurrentInput]= useState(initialEducationState)

  

  const getInput=(field, value)=>{

    setCurrentInput((prevInput)=>({
      ...prevInput,[field]:value
    }))
    

  }
  const saveDoctorate=()=>{
    setDoctorate([...doctorate,currentInput])
   onDoctorateModalClose();
   setCurrentInput(initialEducationState)

}
const [value, setValue]= useState()


  
const onDelete=(indexToDelete)=>{
  const updatedDoctorate = [...doctorate];
  const deletedEducationState = updatedDoctorate[indexToDelete];

  // Iterate over the keys of the deletedEducationState
  for (const key in deletedEducationState) {
    if (deletedEducationState.hasOwnProperty(key)) {
      deletedEducationState[key] = '';
    }
  }

  // Set the updated doctorate array
  setDoctorate(updatedDoctorate);

  // Reset the current input to the initial state
  setCurrentInput(initialEducationState);
  // onOPen()
  onDoctorateModalOpen()
};
  




  return (
    <div>
      {/* <Box> */}
      <Box  backgroundColor={'white'}   mt={'10'} padding={'5'} borderRadius={'20px'}>

      {/* <VStack> */}
      <HStack>
      <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'} >Education</Text>
       <Button width={{base:'75px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}   colorScheme={'teal'} onClick={onDoctorateModalOpen}>Add Education</Button>
         <Modal 
         isOpen={isDoctorateModalOpen}
         onClose={onDoctorateModalClose}
         size='5xl'
         >
          <ModalOverlay/>
          <ModalContent>
          <ModalHeader>Add Doctorate/Phd</ModalHeader>
          <ModalCloseButton/>
          <Text textAlign={'center'} fontSize={{base:'0.7rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'} color='grey' >Mention your employment details including your current and previous company work experience.</Text>

          <ModalBody>
            <FormControl>
           <FormLabel>Education</FormLabel>
           <Input value={currentInput.Degree} onChange={((e)=>{getInput('Degree',e.target.value)})} placeholder='Doctorate/PhD'/>
           <FormLabel>University/Institute</FormLabel>
           <Input value={currentInput.university} onChange={((e)=>{getInput('university',e.target.value)})} placeholder='Select University/Institute'/>
           <FormLabel>Course</FormLabel>
           <Input  value={currentInput.course} onChange={((e)=>{getInput('course',e.target.value)})}placeholder='select Course'/>
           <FormLabel>Specialization</FormLabel>
           <Input  value={currentInput.specialization} onChange={((e)=>{getInput('specialization',e.target.value)})} placeholder='select Specialization'/>
           <FormLabel>Course Duration</FormLabel>
           <HStack>
           
  <Select placeholder='starting year' value={currentInput.startYear} onChange={(e)=>{getInput('startYear',e.target.value)}}>
            
            {
              year.map((item, index)=>{
             return <option key={index} value={item}>{item}</option>
              })
            }
        </Select>
          <Select placeholder='Ending year' value={currentInput.endYear} onChange={(e)=>{getInput('endYear', e.target.value)}}  >
            {
              year.map((item, index)=>{           
             return <option key={index} value={item}>{item}</option>
              })
            }
         
        
          </Select>
          </HStack>

          <FormLabel>Course Type</FormLabel>
                   <RadioGroup value={value} onChange={(e)=>{getInput('courseType',e)}} >
              <Stack direction='row'>
                <Radio value='Full Time' >Full Time</Radio>
                <Radio value='PartTime' >PartTime</Radio>
                <Radio value='correspondence'>Correspondence/Distance Learning</Radio>
              </Stack>
            </RadioGroup>
   =
     <FormLabel>Marks Obtained in percentage</FormLabel>
    <Input value={currentInput.percentage} onChange={((e)=>{getInput('percentage', e.target.value)})}  type='number' placeholder='Marks in percentage'/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' width={'500px'} onClick={saveDoctorate}> Save</Button>
            <Button width={'500px'} onClick={onDoctorateModalClose}> Cancel</Button>
          </ModalFooter>
          </ModalContent>
         </Modal>
       
  
</HStack>
                <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'}>Mention your employment details including your current and previous company work experience.</Text>


{doctorate.length > 0 ? (<Box mt={'25px'}> {
        doctorate.map((item, index)=>{
          return <Box textAlign={'center'} display={'flex'} justifyContent={'center'} key={index}> 
            <VStack  justifyContent={'start'}>
             <Text fontSize={{base:'0.9rem ',md:'1.2rem',lg:'1.7rem'}} fontWeight={'700'}>{item.Degree}</Text>
          <Text fontSize={{base:'0.8rem ',md:'1.1rem',lg:'1.6rem'}} fontWeight={'600'}>{item.course} {item.specialization}</Text>
          <Text fontSize={{base:'0.7rem ',md:'1rem',lg:'1rem'}} fontWeight={'500'}>{item.university}</Text>
          <Text fontSize={{base:'0.7rem ',md:'1rem',lg:'1rem'}} fontWeight={'500'}>{item.startYear}{item.endYear}           {item.courseType}</Text>
         
          </VStack>
          <Button width={{base:'10px', md:'20px', lg:'30px'}} onClick={()=>onDelete(index)}><FaEdit  fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}}/></Button>
        
          </Box>
        })
      }
      </Box>):(
      <Text textAlign={'center'} colorScheme='grey'  fontWeight={'500'}></Text>)
    }
    {/* <Projects/> */}
    </Box>
    </div>
  )
}


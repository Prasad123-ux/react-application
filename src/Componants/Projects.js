import React, { useState } from 'react'
import {Box, Text, Button, Modal,ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Input,ModalBody, ModalFooter, HStack, useDisclosure, FormControl, FormLabel, Textarea} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa';

export default function Projects() {
     const {onClose, onOpen, isOpen}= useDisclosure();
     const {onClose:onSummaryClose, onOpen:onSummaryOpen, isOpen:isSummaryOpen}= useDisclosure();

const [name, setName]=useState([]);
const [link, setLink]= useState([]);
const [desc, setDesc]= useState([]);

const [currentNameValue, setCurrentNameValue]= useState();
const [currentLinkValue, setCurrentLinkValue]= useState();
const [currentDescValue, setCurrentDescValue]= useState();

const handleSaveButton=()=>{
   
setName([...name, currentNameValue])
setLink([...link, currentLinkValue])
setDesc([...desc, currentDescValue])


    onClose();
}
 const handleDelete = (index) => {
     setName((prevNames) => prevNames.filter((_, i) => i !== index));
      setLink((prevLinks) => prevLinks.filter((_, i) => i !== index));
      setDesc((prevDesc) => prevDesc.filter((_, i) => i !== index));
      onOpen()
    };

const [summary, setSummary]=useState([])
const [sum, setSum]= useState()

const handleSummary=()=>{
  summary.push(sum)
  onSummaryClose();

  
}
const handleSummaryDelete =(indexToDelete)=>{
  const deleteItem= summary.filter((_,index)=>index!==indexToDelete)
  setSummary(deleteItem)
  onSummaryOpen()
  
  
    }

  return (
    <div>
      
      <Box  backgroundColor={'white'}   mt={'10'} padding={'5'} borderRadius={'20px'}>

        <HStack>
      <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}  >Projects</Text>
        <Button  width={{base:'75px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}} onClick={onOpen} colorScheme={'teal'}   fontWeight={'600'}>Add Projects</Button>
        
        <Modal 
         onClose={onClose}
         isOpen={isOpen}
        size='xl'
        
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add Projects</ModalHeader>
                <ModalCloseButton/>
                <Text textAlign={'center'} colorScheme='grey' fontSize={{base:'0.7rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Add links to your projects (e.g. Linkedin, Github, etc).</Text>

                <ModalBody>
            <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input onChange={((e)=>{setCurrentNameValue(e.target.value)})} placeholder='Enter Your Project Name'/>
                <FormLabel>Project Link</FormLabel>
                <Input onChange={((e)=>{setCurrentLinkValue(e.target.value)})} placeholder='enter your project Link'/>
                <FormLabel>Description</FormLabel>
                <Textarea onChange={((e)=>{setCurrentDescValue(e.target.value)})}/>
            </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='teal' onClick={handleSaveButton}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </HStack>
        <Text textAlign={'center'} fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} color='grey' >Add links to your projects (e.g. Linkedin, Github, etc).</Text>

       {
        name.map((item, index)=>{
    return  <Box key={index} mt={'20px'} textAlign={'center'} >
        <HStack>
        <Box>
      <Text  fontSize={{base:'1rem', md:'1.1rem',lg:'1.5rem'}} fontWeight={'700'}><li> <a href={link[index]}>{item}</a></li></Text>
      <Text fontSize={{base:'0.6rem', md:'0.8rem', lg:'1rem'}} fontWeight={'500'} color={'blue'}>{desc[index]}</Text>
      </Box>
       <Button width={{base:'10px', md:'20px', lg:'30px'}} onClick={()=>handleDelete(index)} ><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'1rem'}}/></Button>
       
       </HStack>
</Box>
        })
       }
 
      </Box>


      {/* <Box > */}
      <Box  backgroundColor={'white'}   mt={'10'} padding={'5'} borderRadius={'20px'}>

        <HStack>
        <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Summary</Text>
        <Button width={{base:'75px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}   colorScheme='teal' onClick={onSummaryOpen} >Add Summary</Button>

        <Modal  size='4xl'
        isOpen={isSummaryOpen}
        onClose={onSummaryClose}
        >
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton/>
              <Text textAlign={'center'} fontSize={{base:'0.7rem',  md:'0.8rem',lg:'em'}} fontWeight={'600'} color='grey' >Add links to your projects (e.g. Linkedin, Github, etc).</Text>

              <ModalBody>
<FormControl>
  <FormLabel>Summary</FormLabel>
  <Textarea onChange={((e)=>{setSum(e.target.value)})} placeholder=' Enter About Yourself'/>

  
</FormControl>
              </ModalBody>
              <ModalFooter>
<Button colorScheme='teal' onClick={handleSummary} width={'200px'}>Save</Button>
<Button width={'200px'}onClick={onSummaryClose}>Cancel</Button>
              </ModalFooter>
            </ModalHeader>
          </ModalContent>
        </Modal>
        </HStack>
        <Text textAlign={'center'} color='grey' fontSize={{base:'0.7rem',  md:'0.8em',lg:'0.9rem'}} fontWeight={'600'} >Add links to your projects (e.g. Linkedin, Github, etc).</Text>

      {/* </Box> */}

      <Box>
        {

          summary.map((item, index)=>{
          return <Box mt={'5'}>
            <HStack>
            <Text textAlign={'center'} fontSize={{base:'0.6rem', md:'0.9rem',lg:'1rem'}} fontWeight={'600'}>{item}</Text>
            <Button width={{base:'10px', md:'20px', lg:'30px'}}  backgroundColor={'white'} onClick={()=>handleSummaryDelete(index)}><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}}/></Button>
            </HStack>
            </Box>
          
          })
        }
      </Box>
      </Box>
    </div>
  )
}

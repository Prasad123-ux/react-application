import React, { useState } from 'react'
import { Box,Text,Button, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Input, Link, Textarea, Divider } from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa';
export default function Accomplishment() {

const {isOpen: isProfileOpen, onClose: onProfileClose, onOpen: onProfileOpen}= useDisclosure();
const [profileNames, setProfileNames]=useState([]);
const [linkNames, setLinkNames]= useState([]);
const [profileName, setProfileName]= useState();
const [linkName, setLinkName]= useState();

 const handleProfile=()=>{
    setProfileNames([...profileNames, profileName])
    setLinkNames([...linkNames, linkName])

    onProfileClose();

}

 const handleDelete=(indextoDelete)=>{
    const deleteProfile= profileNames.filter((_,index)=>index !== indextoDelete)
    const deleteLink = linkNames.filter((_,index)=>index!==indextoDelete)
    setProfileNames(deleteProfile)
    setLinkNames(deleteLink)
    onProfileOpen()
}

// up to here all logic about online Profiles



const {isOpen: isWorkOpen, onClose: onWorkClose, onOpen: onWorkOpen}= useDisclosure();
const [workNames, setWorkNames]=useState([]);
const [urlNames, setUrlNames]= useState([]);
const [starts, setStarts]= useState([])
const [ends , setEnds] = useState([])
const [workName, setWorkName]= useState('');
const [urlName, setUrlName]= useState();
const [start, setStart]=useState('')
const [end, setEnd]=useState()

 const handleWork=()=>{
    setWorkNames([...workNames, workName])
    setUrlNames([...workNames, urlName])
    setStarts([...starts, start])
    setEnds([...ends, end])

    onWorkClose();

}

 const handleWorkDelete=(indextoDelete)=>{
    const deleteWork= workNames.filter((_,index)=>index !== indextoDelete)
    const deleteUrl = urlNames.filter((_,index)=>index!==indextoDelete)
    setWorkNames(deleteWork)
    setUrlNames(deleteUrl)
    onWorkOpen()
}



//  fom here all about  projects
const {isOpen: isPaperOpen, onClose: onPaperClose, onOpen: onPaperOpen}= useDisclosure();
const [paperNames, setPaperNames]=useState([]);
const [publicNames, setPublicNames]= useState([]);
const [paperStarts, setPaperStarts]= useState([])
const [paperEnds , setPaperEnds] = useState([])
const [paperName, setPaperName]= useState('');
const [publicName, setPublicName]= useState();
const [paperStart, setPaperStart]=useState('')
const [paperEnd, setPaperEnd]=useState()

 const handlePaper=()=>{
    setPaperNames([...paperNames, paperName])
    setPublicNames([...publicNames, publicName])
    setPaperStarts([...paperStarts,paperStart])
    setPaperEnds([...paperEnds, paperEnd])

    onWorkClose();

}

 const handlePaperDelete=(indextoDelete)=>{
    const deletePaper= paperNames.filter((_,index)=>index !== indextoDelete)
    const deletePublic = publicNames.filter((_,index)=>index!==indextoDelete)
    setPaperNames(deletePaper)
    setPublicNames(deletePublic)
    onPaperOpen()
}


// up to here all about white paper
const {isOpen: isPresentationOpen, onClose: onPresentationClose, onOpen: onPresentationOpen}= useDisclosure();
const [presentationNames, setPresentationNames]=useState([]);
const [presentationLinkNames, setPresentationLinkNames]= useState([]);
const [presentationStarts, setPresentationStarts]= useState([])
const [presentationName, setPresentationName]= useState('');
const [presentationLinkName, setPresentationLinkName]= useState();
const [presentationStart, setPresentationStart]=useState('')

 const handlePresentation=()=>{
    setPresentationNames([...presentationNames, presentationName])
    setPresentationLinkNames([...presentationLinkNames, presentationLinkName])
    setPresentationStarts([...presentationStarts,presentationStart])

    onPresentationClose();

}

 const handlePresentationDelete=(indextoDelete)=>{
    const deletePresentation= presentationNames.filter((_,index)=>index !== indextoDelete)
    const deletePresentationLink = presentationLinkNames.filter((_,index)=>index!==indextoDelete)
    setPresentationNames(deletePresentation)
    setPresentationNames(deletePresentationLink)
    onPresentationOpen()
}




  return (
    <div>
      <Box backgroundColor={'white'} heigh={'100vh'} mt={'10'} padding={'5'} borderRadius={'20px'}>
      <Box >

        <Text fontSize={{base:'1.3rem', md:'1.5rem', lg:'1.7rem'}} fontWeight={'600'}>Accomplishment</Text>
        <Box mt={'5'}>
            <HStack>
            <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Online Profiles</Text>
            <Button colorScheme='teal' onClick={onProfileOpen} width={{base:'75px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}  > Add Profile</Button>
            <Modal  size='2xl'
            
            isOpen={isProfileOpen}
            onClose={onProfileClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Online Profiles</ModalHeader>
                    <Text textAlign={'center'} colorScheme='grey' fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Add link to online profiles (e.g. Linkedin, Github, etc).</Text>
                    <ModalCloseButton/>
                    <ModalBody>
                 <FormControl isRequired>
                    <FormLabel>Social Profile</FormLabel>
                    <Input placeholder='Social Profile' onChange={((e)=>{setProfileName(e.target.value)})} />
                    <FormLabel mt={'5'}>URL</FormLabel>
                    <Input onChange={((e)=>{setLinkName(e.target.value)})} placeholder='Enter URL' />
                    
                    
                 </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' onClick={handleProfile} colorScheme='teal'>Save</Button>
                        <Button  >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </HStack>
            <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'} >Add link to online profiles (e.g. Linkedin, Github, etc).</Text>
          {
            profileNames.map((item,index)=>{
                return <Box mt={'20px'} textAlign={'center'}>
 <Text fontSize={{ base:' 1rem',md:'1.2',lg:'1.4rem'}} colorScheme={'grey'} fontWeight={'500'}>{item}</Text>
            <Link fontSize={{ base:'0.6rem',md:'0.7rem',lg:'0.8rem'}} color={'blue'} isExternal href={linkNames[index]}>{linkNames[index]}</Link>
            

            <Button width={{base:'10px', md:'20px', lg:'30px'}}  backgroundColor={'white'} onClick={()=>handleDelete(index)} ><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}} /></Button>
            </Box>
            
        })
    }
        </Box>
  


                       {/*     FROM HERE ALL ABOUT WORK SAMPLES */}










      </Box>
      <Divider/>
      <Box mt={'10'}>
        
            <HStack>
            <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Work Samples</Text>
            <Button colorScheme='teal' onClick={onWorkOpen} width={{base:'75px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}  > Add Work</Button>
            <Modal  size='2xl'
            
            isOpen={isWorkOpen}
            onClose={onWorkClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Work Samples</ModalHeader>
                    <Text textAlign={'center'} colorScheme='grey' fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Add links to your projects (e.g. Linkedin, Github, etc).</Text>
                    <ModalCloseButton/>
                    <ModalBody>
                 <FormControl isRequired>
                    <FormLabel>Work Title</FormLabel>
                    <Input placeholder='Enter work/Title' onChange={((e)=>{setWorkName(e.target.value)})} />
                    <FormLabel mt={'5'}>URL</FormLabel>
                    <Input onChange={((e)=>{setUrlName(e.target.value)})} placeholder='Enter URL' />
                    <FormLabel>Start Date</FormLabel>
                    <Input onChange={((e)=>{setStart(e.target.value)})} type='date'/>
                    <FormLabel>End Date</FormLabel>
                    <Input onChange={((e)=>{setEnd(e.target.value)})} type='date'/>
                    
                 </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' onClick={handleWork} colorScheme='teal'>Save</Button>
                        <Button  >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </HStack>
            <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'} >Add links to your projects (e.g. Linkedin, Github, etc).</Text>
          {
            workNames.map((item,index)=>{
                return <Box mt={'50px'} textAlign={'center'}>
 <Text fontSize={{ base:' 1rem',md:'1.2',lg:'1.4rem'}} colorScheme={'grey'} fontWeight={'700'}>{item}</Text>
            <Link fontSize={{ base:'0.6rem',md:'0.7rem',lg:'0.8rem'}} color={'blue'} isExternal href={urlNames[index]}>{urlNames[index]}</Link>
            <HStack justifyContent={'start'}>
            <Text fontSize={{base:'0.8rem', md:'1rem', lg:'1.2rem'}} color={'grey'} fontWeight={'400'}>{starts[index]}</Text>
            <Text fontSize={{base:'0.8rem', md:'1rem', lg:'1.2rem'}} fontWeight={'400'}>{ends[index]}</Text>
            </HStack>
            <Button width={{base:'10px', md:'20px', lg:'30px'}}  backgroundColor={'white'}  onClick={()=>handleWorkDelete(index)} ><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}}/></Button>
            </Box>
            
        })
    }
</Box>


{/* from here all about Publication */}
<Divider />


        <Box mt={'10'}>
        
            <HStack>
            <Text  fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}}  fontWeight={'600'}>White paper / Research publication </Text>
            <Button colorScheme='teal' onClick={onPaperOpen} width={{base:'100px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}  > Add Publications</Button>
            <Modal  size='2xl'
            
            isOpen={isPaperOpen}
            onClose={onPaperClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>White paper / Research publication / Journal entry</ModalHeader>
                    <Text textAlign={'center'} colorScheme='grey' fontWeight={'500'}>Add links to your Online Publications.</Text>
                    <ModalCloseButton/>
                    <ModalBody>
                 <FormControl isRequired>
                    <FormLabel>Work Title</FormLabel>
                    <Input placeholder='Enter work/Title' onChange={((e)=>{setPaperName(e.target.value)})} />
                    <FormLabel mt={'5'}>URL</FormLabel>
                    <Input onChange={((e)=>{setPublicName(e.target.value)})} placeholder='Enter URL' />
                    <FormLabel>Published On</FormLabel>
                    <Input onChange={((e)=>{setPaperStart(e.target.value)})} type='date'/>
                    <FormLabel>Description</FormLabel>
                    <Textarea onChange={((e)=>{setPaperEnd(e.target.value)})}type='text'/>
                    
                 </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' onClick={handlePaper} colorScheme='teal'>Save</Button>
                        <Button  >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </HStack>
            <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'} >Add links to your online Publications.</Text>
          {
            paperNames.map((item,index)=>{
                return <Box mt={'50px'} textAlign={'center'}>
 <Text fontSize={{ base:' 1rem',md:'1.2',lg:'1.4rem'}} colorScheme={'grey'} fontWeight={'700'}>{item}</Text>
            <Link fontSize={{ base:'0.6rem',md:'0.7rem',lg:'0.8rem'}} color={'blue'} isExternal href={publicNames[index]}>{publicNames[index]}</Link>
            {/* <HStack justifyContent={'start'}> */}
            <Text fontSize={{base:'0.8rem', md:'1rem', lg:'1.2rem'}} color={'grey'} fontWeight={'400'}>{paperStarts[index]}</Text>
            <Text fontSize={{base:'0.8rem', md:'1rem', lg:'1.2rem'}} color={'grey'} fontWeight={'500'}>{paperEnds[index]}</Text>
            {/* </HStack> */}
            <Button width={{base:'10px', md:'20px', lg:'30px'}} onClick={()=>handlePaperDelete(index)} ><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}}/></Button>
            </Box>
            
        })
    }
        </Box>

<Divider/>


        <Box mt={'10'}>
        
        <HStack>
        <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Presentation</Text>
        <Button colorScheme='teal' onClick={onPresentationOpen} width={{base:'100px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}  > Add Presentation</Button>
        <Modal  size='2xl'
        
        isOpen={isPresentationOpen}
        onClose={onPresentationClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Presentation</ModalHeader>
                <Text textAlign={'center'} colorScheme='grey' fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'}>Add links to your online presentations (e.g. Slideshare presentation links etc.).</Text>
                <ModalCloseButton/>
                <ModalBody>
             <FormControl isRequired>
                <FormLabel>Work Title</FormLabel>
                <Input placeholder='Enter work/Title' onChange={((e)=>{setPresentationName(e.target.value)})} />
                <FormLabel mt={'5'}>URL</FormLabel>
                <Input onChange={((e)=>{setPresentationLinkName(e.target.value)})} placeholder='Enter URL' />
                <FormLabel>Description</FormLabel>
                <Textarea onChange={((e)=>{setPresentationStart(e.target.value)})} type='text'/>

                
             </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' onClick={handlePresentation} colorScheme='teal'>Save</Button>
                    <Button  >Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </HStack>
        <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'} >Add links to your online presentations (e.g. Slideshare presentation links etc.).</Text>
      {
        presentationNames.map((item,index)=>{
            return <Box mt={'50px'} textAlign={'center'}>
<Text fontSize={{ base:' 1rem',md:'1.2',lg:'1.4rem'}} colorScheme={'grey'} fontWeight={'500'}>{item}</Text>
        <Link fontSize={{ base:'0.6rem',md:'0.7rem',lg:'0.8rem'}} color={'blue'} isExternal href={presentationLinkNames[index]}>{presentationNames[index]}</Link>
        <Text  fontSize={{base:'0.8rem', md:'1rem', lg:'1.2rem'}} color={'grey'} fontWeight={'400'}>{presentationStarts[index]}</Text>
        
        <Button width={{base:'10px', md:'20px', lg:'30px'}} onClick={()=>handlePresentationDelete(index)} ><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}}/></Button>
        </Box>
        
    })
}
    </Box>
</Box>
      
    </div>
  )
}

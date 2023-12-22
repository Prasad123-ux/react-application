import { Avatar , Box, Divider, HStack, Text,Stack ,VStack, Grid, GridItem, Input,Button, FormControl, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Textarea, ModalFooter} from '@chakra-ui/react'
import React, { useState , useEffect, useCallback} from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import {  FaEdit,} from 'react-icons/fa'
import Education from './Education';
import Accomplishment from './Accomplishment';
import Footer from './Footer'
import Projects from './Projects';
import {useDropzone} from 'react-dropzone'





export default function Profile({users}) {
 

    const {isOpen:isInfoModalOpen, onOpen:onInfoModalOpen, onClose:onInfoModalClose}= useDisclosure()
  const { isOpen: isSkillModalOpen, onOpen: onSkillModalOpen, onClose: onSkillModalClose } = useDisclosure();
  const { isOpen: isEmploymentModalOpen, onOpen: onEmploymentModalOpen, onClose: onEmploymentModalClose } = useDisclosure();
  const [avatarUrl, setAvatarUrl]=useState('')
  const [name, setName]= useState('User Name');

  const initialRef = React.useRef(null);
    
  const finalRef = React.useRef(null)

const [skill,setSkill]= useState()
 const [skills, setSkills]=useState([])
 const [disabledValue, setDisabledValue] =useState(true)




const onDrop= useCallback(acceptedFiles=>{
  const file= acceptedFiles[0]


  const render= new FileReader();
  render.onload=()=>{
    setAvatarUrl(render.result)
  }
  render.readAsDataURL(file)
}, []);
const {getRootProps, getInputProps}=useDropzone({accept:'image/*',onDrop})


 useEffect(()=>{
  if( users && users.length>0 && users[0]?.email ){
  // setMail(users[0].email)
  setName(users[0].name)
  }
 }, [users])

const addValue=()=>{
  if(skill){
     
   skills.push(skill.toUpperCase())
  onSkillModalClose();
  
  }
  
}
const onInputChange=(e)=>{
 const value= e.target.value
 value.toUpperCase()
 setSkill(value)
if(e.target.value){
  setDisabledValue(false)
}else{
  setDisabledValue(true)
}

}
const [userInfo, setUserInfo]= useState({
  'entry1':{
    Location:"",
    Level:'',
    Email:'',
    Mobile:'',
    Linkedin:'',
    Github:'',

  }
})
const handleGetChange=(field, value)=>{
  setUserInfo((prevDetails)=>({...prevDetails, entry1:{...prevDetails.entry1,[field]:value,},}))
}

const [employmentDetails , setEmploymentDetails]=useState({
    'entry1':{
        company:'',
        designation:'',
        location:'',
        startDate:'',
        currentSalary:'',
        noticePeriod:''
    }
})

const handleInputChange = (field, value) => {
  setEmploymentDetails((prevDetails) => ({ ...prevDetails, entry1: { ...prevDetails.entry1,[field]: value, }, }));};



const onObjectDelete=(index)=>{
  const updatedObject ={...employmentDetails}
delete updatedObject[index]
setEmploymentDetails(updatedObject)
onEmploymentModalOpen()
}

const onDelete=(indexToDelete)=>{
  const deleteItem= skills.filter(( _,index)=> index!== indexToDelete)
setSkills(deleteItem)
onSkillModalOpen()
}









  return (
    
    <Box backgroundColor={'#eaeaff'}  p={{base:'5', sm:'20', md:'20', lg:'20', xl:'20'}}  pt={{base:'75px'}} border={'1px solid white '}  borderRadius={'10'}>
        <Box textAlign={'center'} bg={'grey.50'} mt={{base:'100px', sm:'0',md:'0', lg:'0',xl:'0',xxl:'0' }}>
          <div {...getRootProps()}>
            <input {...getInputProps()}/>
      <Avatar size={{base:"md", sm:'lg',lg:'xl',xxl:'2xl'}} border={'2px solid green'} cursor={'pointer'} src={avatarUrl} alt="Profile Photo"/>
      </div>
      
    
      <Text fontSize={{base:'1rem', md:'1.8rem', lg:'2rem'}} color={'gray.400'} fontWeight={'700'}>{name}</Text>
      <Divider orientation='horizontal' color={'green'}/>
      <HStack>
      <Box shadow={'100px'} mt={'3'} backgroundColor={'white'} borderRadius={'20'}>

    
    <Button width={{base:'10px', md:'20px', lg:'45px'}}  float={'right'} backgroundColor={'white'}  onClick={onInfoModalOpen}><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'1rem'}}/></Button>
    <Modal  size={{base:'xs',md:'md',lg:'lg', xl:'2xl'}}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
       isOpen={isInfoModalOpen}
       onClose= {onInfoModalClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add Personal Information</ModalHeader>
                <ModalCloseButton/>
                <Text textAlign={'center'} fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'} color='grey' >Add your all personal information , which help you to get your dream job.</Text>

                <ModalBody> 
                <FormControl isRequired>
                  <FormLabel>Add Location</FormLabel>
                   <Input  onChange={((e)=>handleGetChange("Location", e.target.value))} required type='text' placeholder='Enter Location' />
                   <FormLabel>Enter your Proficiency level </FormLabel>
                   <Input  onChange={((e)=>handleGetChange("Level", e.target.value))} required type='text' placeholder='Enter your Proficiency level ' />
                   <FormLabel>Enter Email</FormLabel>
                   <Input  onChange={((e)=>handleGetChange("Email", e.target.value))} required type='mail' placeholder='Enter Your Mail' />
                   <FormLabel>Enter Mobile Number</FormLabel>
                   <Input  onChange={((e)=>handleGetChange("Mobile", e.target.value))} required type='number' placeholder='Enter Your Mobile Number' />
                   <FormLabel>Enter Linkedin link</FormLabel>
                   <Input  onChange={((e)=>handleGetChange("Linkedin", e.target.value))}  placeholder='Enter Your Linkedin Profile Link' />
                   <FormLabel>Enter Profile Link</FormLabel>
                   <Input  onChange={((e)=>handleGetChange("Github", e.target.value))}  placeholder='Enter Your Github Profile Link' />
                  
                </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button  onClick={onInfoModalClose} colorScheme='teal' width={'200px'}> save</Button>
                    <Button onClick={onInfoModalClose} width={'202px'}>Cancel</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
  
  
   <Grid gridTemplateColumns={{ base:'repeat(1,1fr)',sm:'repeat(1,2fr)', md:'repeat(2,2fr)',lg:'repeat(2,2fr)', xl:'repeat(2,2fr)'}} gap={'2'}  fontSize={{base:'0.9rem', md:'1rem',lg:'1.2rem'}} p={'5'} >

   { userInfo.entry1.Location ? (<GridItem  fontWeight={'500'}>{userInfo.entry1.Location}</GridItem>):(<GridItem  color={'gray'} fontWeight={'500'}> Your Location</GridItem>)}
   { userInfo.entry1.Email ? (<GridItem  fontWeight={'500'}>{userInfo.entry1.Email}</GridItem>):(<GridItem color={'grey'} fontWeight={'500'}>Your Email</GridItem>)}
   { userInfo.entry1.Level ? (<GridItem  fontWeight={'500'}>{userInfo.entry1.Level}</GridItem>):(<GridItem  color={'gray'} fontWeight={'500'}>your Level</GridItem>)}
   { userInfo.entry1.Mobile ? (<GridItem  fontWeight={'500'}>{userInfo.entry1.Mobile}</GridItem>):(<GridItem  color={'gray'} fontWeight={'500'}>Your Mobile Number</GridItem>)}
   { userInfo.entry1.Linkedin ? (<GridItem  fontWeight={'500'}><a href={userInfo.entry1.Linkedin}>Linkedin</a></GridItem>):(<GridItem color={'gray'} fontWeight={'500'}> Your Linkedin Profile</GridItem>)}
   { userInfo.entry1.Github ? (<GridItem  fontWeight={'500'}>{userInfo.entry1.Github}</GridItem>):(<GridItem  color={'gray'} fontWeight={'500'}>Your Github Profile</GridItem>)}


  </Grid>
  

</Box>
</HStack>

      </Box>




{/* {/* from upto all about Personal info of user=====================================================} */}


      <Box backgroundColor={'white'} borderRadius={'20px'} mt={'10'} p={'5'}>
        <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'} >Resume</Text>
        <Box textAlign={'center'} >
            <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'}>Resume is the most important document recruiter looks for. Recruiters generally do not look at profiles without resumes. </Text>
            
  

  <VStack color={'purple.500'} h={"full"} justifyContent={"center"} mt={'5'}> 

  <AiOutlineCloudUpload   width={{base:'200px', md:'200px', lg:'500px'}}  />
  <FormControl  marginBottom={'10'} justifyContent={'center'} >
    <Stack display={'flex'} flexDirection={{base:'column', md:'row'}} justifyContent={'center'}>
      
      <Input  required type={'file'}  placeholder='update your resume' width={{base:'175px',md:'250px',lg:'250px'}} fontSize={{base:'0.7rem', md:'0.9rem', lg:'1rem'}}/>
      <Button  colorScheme={'purple'} size={{base:'xs',lg:'md', md:'md'}} width={{base:'50px', md:'100px',lg:'100px'}} type={'submit'} fontSize={{base:'0.7rem', md:'0.9rem', lg:'1rem'}}>Upload</Button>
    </Stack>

  </FormControl>
  </VStack>
   
          </Box>
      </Box>
      <Box  backgroundColor={'white'}   mt={'10'} padding={'5'} borderRadius={'20px'}>
        <HStack spacing={'4'} align={'center'}>
        <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}}  fontWeight={'600'} >Key Skills </Text>

        <Button onClick={onSkillModalOpen} width={{base:'75px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}   colorScheme='teal'  fontWeight={'600'} >Add skills</Button>

        <Modal  size={{base:'xs',md:'md',lg:'lg', xl:'2xl'}}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
       isOpen={isSkillModalOpen}
       onClose= {onSkillModalClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add Skills</ModalHeader>
                <ModalCloseButton/>
                <Text textAlign={'center'} fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'} color='grey' >Add your acquired all skill here (e.g. HTML, CSS, JAVASCRIPT).</Text>

                <ModalBody> 
                <FormControl isRequired>
                  <FormLabel>Enter skill</FormLabel>
                   <Input  onChange={onInputChange} required type='text' placeholder='Enter skill' />
                </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button isDisabled={disabledValue} onClick={addValue} colorScheme='teal' width={'200px'}> save</Button>
                    <Button onClick={onSkillModalClose} width={'202px'}>Cancel</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
        </HStack>
        <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'}>Add your acquired all skill here (e.g. HTML, CSS, JAVASCRIPT).</Text>

        <Grid templateColumns={{base:'repeat(3,2fr)',md:'repeat(4,5fr)',lg:'repeat(7,5fr)'}} gap={{base:'2',md:'5', lg:'10'}}>
        {skills.map((item, index)=>{
         return <GridItem key={index} GridItem marginBottom={'5'}>
          <Text  display='flex' justifyContent={'start'} textAlign='center' fontSize={{base:'0.6rem', md:'1rem', lg:'1.1rem'}} fontWeight={'500'} border={'1px solid white'} backgroundColor={'white'} borderRadius={'70px'}>{item} <Button width={{base:'10px', md:'20px', lg:'30px'}}  backgroundColor={'white'}  onClick={(()=>{onDelete(index)})}><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}}/></Button></Text>
         </GridItem >

        
        
  })
}
</Grid>
</Box>
        
        
        <Box  backgroundColor={'white'}   mt={'10'} padding={'5'} borderRadius={'20px'}>

            <HStack>
        <Text fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'} >Employment</Text>
        <Button  onClick={onEmploymentModalOpen} width={{base:'100px',md:'150px',lg:'200px'}}  height={{base:'2vh',md:'4vh', lg:'5vh'}} fontSize={{base:'0.6rem', md:'1rem', lg:'1rem'}}   colorScheme='teal' fontWeight={'600'}  >Add Employment</Button>
        <Modal 
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen= {isEmploymentModalOpen}
        onClose={onEmploymentModalClose}
        
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add Employment</ModalHeader>
                <ModalCloseButton/>
                <Text textAlign={'center'} fontSize={{base:'1rem',  md:'1.2rem',lg:'1.5rem'}} fontWeight={'600'} color='grey' >Mention your employment details including your current and previous company work experience.</Text>

                <ModalBody pb={'6'}> 
                <FormControl>
                    <FormLabel>Current Company name</FormLabel>
                    <Input onChange={((e)=>handleInputChange('company',e.target.value))}  required ref={initialRef} placeholder='Company name'/>
                    <FormLabel>Current Designation</FormLabel>
                 <Input onChange={((e)=>{handleInputChange('designation',e.target.value)})} required ref={initialRef} placeholder='Current Designation'/>
                 <FormLabel> Total Experience</FormLabel>
                 <Input onChange={((e)=>{handleInputChange('experience',e.target.value)})} type='number' max={'10'} min={'0'} placeholder='experience'/>
                 <FormLabel>Joining Date</FormLabel>
                 <Input onChange={((e)=>{handleInputChange('startDate', e.target.value)})} required type='date' placeholder='startDate' />
                 <FormLabel>Current Salary</FormLabel>
                 <Input onChange={((e)=>handleInputChange('lastDate',e.target.value))} type='date' placeholder=''/>
                 <FormLabel>Job Profile</FormLabel>
                 <Textarea onChange={((e)=>{handleInputChange('Role',e.target.value)})} required placeholder='explain your role'></Textarea>
                 <FormLabel>Notice period</FormLabel>
                 <Input onChange={((e)=>{handleInputChange('noticePeriod', e.target.value)})}  required type='number' min='15' max={'365'} placeholder='notice period in days' />
                  
                </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button onClick={onEmploymentModalClose} colorScheme='teal' width={'200px'}> save</Button>
                    <Button onClick={onEmploymentModalClose} width={'202px'}>Cancel</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
        </HStack>
        <Text fontSize={{base:'0.7rem',  md:'0.8rem',lg:'0.9rem'}} fontWeight={'600'} textAlign={'center'} color={'grey'}>Mention your employment details including your current and previous company work experience.</Text>



        <Box textAlign={'center'}>
        {Object.entries(employmentDetails).map(([key, value], index)=>{
        return <Box display='flex' justifyContent={'center'} key={index} mt={'5'}>
          <VStack justifyContent={'start'}>
       
       <Text fontSize={{base:'1rem', md:'1.2rem', lg:'1.7rem'}} fontWeight={'700'}>{value.company}</Text>
       <Text  fontSize={{base:'0.9rem', md:'1.1rem', lg:'1.6rem'}} fontWeight={'600'}>{value.designation}</Text>

       <Text fontSize={{base:'0.8rem', md:'1rem', lg:'1.5rem'}} fontWeight={'500'}>{value.startDate}    {value.lastDate}</Text>
       
       <Text fontSize={{base:'0.8rem', md:'1rem', lg:'1.5rem'}} fontWeight={'700'}> {value.Role}</Text>
       </VStack>
       <Button width={{base:'10px', md:'20px', lg:'30px'}}   backgroundColor={'white'} onClick={()=>onObjectDelete(key)} ><FaEdit fontSize={{base:'0.3rem', md:'0.6rem', lg:'0.7rem'}}/></Button>
       
          </Box>
        })
    
        }
          </Box>


      
          
        </Box> 
        
        
      <Education/>
      <Projects/>
      <Accomplishment/>
      <Footer  />
     
    </Box>
    
    
  )
}


import React, {  useState } from 'react'
import { MdCastForEducation } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../Styles/education.css"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import options from "./data.json"
import PropTypes from 'prop-types'    
import { useSelector } from 'react-redux'; 
import { MdDelete } from "react-icons/md";
import { useToast } from '@chakra-ui/react'; 
// import { useDispatch } from 'react-redux';

function Education({api, educationData} ) {

  const [EducationLevel,setEducationLevel]= useState("college")
  const [educationChecked,setEducationChecked]= useState(true)
  const [schoolDetails, setSchoolDetails]= useState({schoolName:"", class:"", passingYear:"", cgpa:""})
  const [collageDetails,setCollegeDetails]= useState({universityName:"",fieldOfStudy:"",degree:"",startingYear:"", endingYear:"",cgpa:""})
  const token= localStorage.getItem("token")  
  const jobSeekersData= useSelector((state)=>state.jobs.jobSeekers) 
  const [loader,setLoader]=useState(false)  
  const [updateID,setUpdateID]= useState() 
  const [updateIndex, setUpdateIndex]= useState() 
  const toast = useToast()
  




console.log(jobSeekersData)
    
 const updateData=(id, index)=>{ 
  setUpdateID(id) 
  setUpdateIndex(index)

 }
   
   
 
    
  const getValue=()=>{
    if(educationChecked===true){
      setEducationChecked(false)
      setEducationLevel("school")
    }else{
      setEducationChecked(true)
      setEducationLevel("college")
    }
  }
 

const onSchoolChange=(e)=>{
  setSchoolDetails({...schoolDetails, [e.target.name]:e.target.value})
}
const onCollageChange=(e)=>{
  setCollegeDetails({...collageDetails, [e.target.name]:e.target.value})
}





  //getting token from localStorage


  
 





      // This is request  for update the education data on database


const handleEducationalDetails=async (e)=>{ 


//   if(collageDetails.cgpa <0 || collageDetails.cgpa>10 || schoolDetails.cgpa<0 || schoolDetails.cgpa>10){
// alert("data is not proper")
//   }else{
  e.preventDefault()

try{
    const response= await fetch('https://jobnexus-backend.onrender.com/api/candidate/Profile/addProfileDetail',{

    method:"POST",
    body:JSON.stringify({token:token, data:educationChecked===true ? collageDetails :schoolDetails,  dataType:'Education'  }),
    headers:{
      "Content-type":'application/json'
    }

  })
  if(!response.ok){
    addToast("Data Not Added", "error")

    setSchoolDetails({schoolName:"", class:"", passingYear:"", cgpa:""})
    setCollegeDetails({universityName:"",fieldOfStudy:"",degree:"",startingYear:"", endingYear:"",cgpa:""})

    throw new Error(response.statusText)
  }
     
  const result= await response.json()
addToast(result.message, "success")
  
}catch(err){
  addToast("Data Not Added", "error")

  console.error(err)
  setSchoolDetails({schoolName:"", class:"", passingYear:"", cgpa:""})
  setCollegeDetails({universityName:"",fieldOfStudy:"",degree:"",startingYear:"", endingYear:"",cgpa:""})
}

  

}

const handleUpdateEducationDetail=async(e)=>{ 


  e.preventDefault()
  try{
    const response=  await fetch('   https://jobnexus-backend.onrender.com/api/candidate/profile/updateProfileDetail ',{
      method:"POST",
      body:JSON.stringify({token:token, data:educationChecked===true ? collageDetails :schoolDetails, dataCategory:'Education', id:updateID,index:updateIndex }),
      headers:{
        "Content-type":"application/json"
      }
    })
    if(!response.ok){
      addToast("Data Not Added", "error")

      throw new Error(response.statusText)
    }else{
      const data = await response.json()
      addToast(data.message, "success") 

      
    }
  }catch(err){
    addToast("Internal Server Error", "error")
    console.error(err)

  }
  
} 




const handleDeleteUserData=async(id, index)=>{
  console.log(id,index)
  setLoader(true)
  try{
    const response= await fetch(`https://jobnexus-backend.onrender.com/api/candidate/profile/education/deleteEducation?id=${id}&index=${index}&dataType=Education`, {     
      method:"DELETE",
      headers:{"Content-type":"application/json"}

    })
    if(!response.ok){
      setLoader(false)
       addToast("Data not deleted", "error")
      throw new Error(response.statusText)
    }
    else{
      const data = await response.json()
      setLoader(false)
      addToast(data.message, "success") 
      // window.location.reload()
    
    }
  }catch(err){
    setLoader(false)
    addToast("Data not deleted, Internal Server Error", "error")

    console.log(err)

  }
  
}

const addToast=(title,status)=>{
  toast({title: title,
    
    status: status,
    duration: 5000,
    isClosable: true})

}




 
 

  


   
    
  return (

    <div className='bg-light rounded-3 mx-auto  p-3 p-sm-3 p-md-3 p-lg-5 align-items-center  shadow resume'>
     

       {  jobSeekersData.extraFields?.Education && jobSeekersData.extraFields?.Education.length>=1   ? (  
        jobSeekersData.extraFields.Education && jobSeekersData.extraFields.Education.length>=1 ? <div className='education-first d-flex justify-content-between align-items-center'> 
          <div className='education-heading d-flex justify-content-start'>
            <span className='education-icon'><MdCastForEducation className='fs-4' /> </span> 
            <div className='ms-4'>
              <span className='d-block fw-bold '> Add Education Details</span>
              <span className='d-block'> Your school/college details</span> 
            </div>
            
          </div>
          <div className='education-btn'>
            <button className='btn btn-outline-info d-flex justify-content-center ' type='button'  data-bs-toggle="modal" data-bs-target="#exampleModal">
               <span className='add-icon mt-1 fw-bolder'> <IoMdAdd /></span>  <span className='add-btn-name'> Add New</span> </button>
          </div>
          
          </div>
          :"jkjkjj"
        
        )
   


:
  (<div className='d-flex flex-column align-items-center'>
    <div className='education-heading'>
        <span className='education-icon'><MdCastForEducation className='fs-4' /> </span> 
    </div>
    <div className='text-center mt-2'>
        <span className='d-block fw-bold education-text'>Add Education Details</span>
        <span className='d-block education-text'>Your school/college details</span> 
    </div>
    <div className='education-option-btn mt-2'>
        <button className='btn btn-outline-info d-flex justify-content-center' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal">
            <span className='add-icon mt-1 fw-bolder'><IoMdAdd /></span>
            <span className='add-btn-name'>Add New</span>
           
        </button>
    </div>
</div>)
}

{/* USER EDUCATION FOR  */}



     {  jobSeekersData.extraFields?.Education && jobSeekersData.extraFields?.Education.length>=1  ?  jobSeekersData.extraFields?.Education.map((item,index)=>{  

         return <div className='education-first user-education p-3 mt-4'>
       <div className='  d-flex justify-content-between align-items-center ' key={index}> 

        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon '><FaGraduationCap  className='fs-4'/> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>{ item &&  item.universityName  ? item.universityName:""}</span>
             <span className='d-block'> { item &&  item.degree   ? item.degree:""} | {  item && item.fieldOfStudy  ?item.fieldOfStudy:""} </span>
             <span>{  item && item.cgpa   ?item.cgpa:""}</span>
            <span className='d-block fw-light'> { item &&  item.startingYear ? item.startingYear:""}-{  item && item.endingYear?item.endingYear:""}</span>  
                { item &&  item.fieldOfStudy  ?item.fieldOfStudy:""}
          </div>  


            <div className='education-btn d-flex justify-content-around  '>
       

<button className='btn btn-outline-info d-flex justify-content-center icon' type='button' data-bs-toggle="modal" data-bs-target="#exampleModalUpdate" onClick={()=>{updateData(jobSeekersData._id, index)}} >
        <MdOutlineModeEditOutline />
        </button>
        <button className='btn btn-outline-info d-flex justify-content-center icon ' type='button'  onClick={()=>{handleDeleteUserData(jobSeekersData._id ,index)}}>
        <MdDelete />
       </button>
        </div>  
        
                
          
        </div> 
        
        

      </div>
    
      </div>

      }):""
}
      

 
















{/* modal for adding new educational details */}


<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Educational Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


        <div className='check-find d-flex justify-content-between mx-auto'>
          { educationChecked===true ?
         <div className='check-collage text-primary fw-bold '>Collage</div> :
         <div className='check-collage  '>Collage</div> 
          }


      <div className="form-check form-switch check-input ms-5 ">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" value={EducationLevel} name="educationalLevel" onChange={getValue} />
  <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
</div>
{educationChecked===false ?
<div className='d-inline check-school ms-3 fw-bold text-primary'>School</div>:
<div className='d-inline check-school ms-3'>School</div>
}

</div>
{
  educationChecked===true   ?
<div className='mt-4'>
  <form onSubmit={handleEducationalDetails}  >
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">University Name</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Type University name" name="universityName" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault6" className="form-label">Field of Study </label>
    <select type="text" className="form-select" id="validationDefault06" placeholder="Type Field Of Study "  name="fieldOfStudy" value={collageDetails.fieldOfStudy} onChange={onCollageChange} required>
      <option  value="1" default >Choose field of study</option>
      {options.fieldOfStudy.map((item, index)=>{
        return  <option key={index}  value={item}>{item }</option>
      })

      }


    </select>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label">Degree</label>
    <select type="text" className="form-select" id="validationDefault02" placeholder="Type Degree" name="degree" value={collageDetails.degree}  onChange={onCollageChange} required>
    <option  value="1" default >Choose Degree</option>

    {options.degrees.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Starting Year</label>
    <select type="date" className="form-control" id="validationDefault03" placeholder="Choose Starting year"  name="startingYear" value={collageDetails.startingYear} onChange={onCollageChange} required>
    <option  value="1" default >Choose Starting Year</option>

    
    {options.startingYear.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Ending Year</label>
    <select type="date" className="form-control" id="validationDefault04" placeholder="Choose Ending Year" max={10} name="endingYear" value={collageDetails.endingYear} onChange={onCollageChange}  required>
    <option   value="1" default >Choose Ending Year</option>

      {
        options.startingYear.map((item, index)=>{
          return <option key={index} value={item}> {item}</option>
        })
      }
    </select>
 
  </div>
 
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault05" className="form-label">Final CGPA ( out of 10) </label>
    <input type="number" className="form-control" id="validationDefault05"  placeholde="Type Your CGPA" name="cgpa" value={collageDetails.cgpa} onChange={onCollageChange} required/>
  </div>
  <div className="  modal-footer d-flex justify-content-around flex-row" >
        <button  className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary modal-save-btn  " data-bs-dismiss="modal">Save changes</button>

      </div>
  </form>

</div>

: 

<div className='mt-4'>
<form onSubmit={handleEducationalDetails}>
<div className="col-10 mt-3">
  <label htmlFor="validationDefault07" className="form-label">School</label>
  <input type="text" className="form-control" id="validationDefault07" placeholder="Type School Name"  name="schoolName" value={schoolDetails.schoolName} onChange={onSchoolChange} required/>
</div>
<div className="col-10 mt-3">
  <label htmlFor="validationDefault8" className="form-label">Class </label>
  <select type="text" className="form-control" id="validationDefault08" placeholder="Type Class "  name="class" value={schoolDetails.class} onChange={onSchoolChange} required>
  <option  value=" " default >Choose Class</option>

    {options.schoolClasses.map((item, index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>

<div className="col-10 mt-3">
  <label htmlFor="validationDefault10" className="form-label">Select Passing Year</label>
  <select type="date" className="form-control" id="validationDefault10" placeholder="Choose Passing year" name="passingYear" value={schoolDetails.passingYear}  onChange={onSchoolChange} required>
  <option  value="1" default >Choose Passing Year</option>

    {options.startingYear.map((item , index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>   

<div className="col-10 mt-3">
  <label htmlFor="validationDefault11" className="form-label">Final CGPA ( out of 10) </label>
  <input type="number" className="form-control" id="validationDefault11"   max="10" min="1" step="0.1"  placeholde="Type Your CGPA" name="cgpa" value={schoolDetails.cgpa} onChange={onSchoolChange} required/>
</div>
<div className="  modal-footer d-flex justify-content-around flex-row" >
        <button className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button  type="submit"  className="btn btn-primary modal-save-btn " data-bs-dismiss="modal">Save changes</button>
      </div>
</form>

</div>

}

     
      </div>
     
      
    </div>
  </div>
</div>
     








{/* modal for updating user data */}



<div className="modal fade" id="exampleModalUpdate"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Educational Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


        <div className='check-find d-flex justify-content-between mx-auto'>
          { educationChecked===true ?
         <div className='check-collage text-primary fw-bold '>Collage</div> :
         <div className='check-collage  '>Collage</div> 
          }


      <div className="form-check form-switch check-input ms-5 ">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" value={EducationLevel} name="educationalLevel" onChange={getValue} />
  <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
</div>
{educationChecked===false ?
<div className='d-inline check-school ms-3 fw-bold text-primary'>School</div>:
<div className='d-inline check-school ms-3'>School</div>
}

</div>
{
  educationChecked===true   ?
<div className='mt-4'>
  <form onSubmit={handleUpdateEducationDetail}  >
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault01" className="form-label">University Name</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder={""} name="universityName" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault6" className="form-label">Field of Study </label>
    <select type="text" className="form-select" id="validationDefault06" placeholder="Type Field Of Study "  name="fieldOfStudy" value={collageDetails.fieldOfStudy} onChange={onCollageChange} required>
    <option value="" default>Choose Field Of Study</option>

      {options.fieldOfStudy.map((item, index)=>{
        return  <option key={index}  value={item}>{item }</option>
      })

      }


    </select>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault02" className="form-label">Degree</label>
    <select type="text" className="form-select" id="validationDefault02" placeholder="Type Degree" name="degree" value={collageDetails.degree}  onChange={onCollageChange} required>
    <option value="1" default >Choose Degree</option>

    {options.degrees.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div className="col-10 mt-3">  
    <label htmlFor="validationDefault03" className="form-label">Starting Year</label>
    <select type="date" className="form-control" id="validationDefault03" placeholder="Choose Starting year"  name="startingYear" value={collageDetails.startingYear} onChange={onCollageChange} required>
    <option value="1" default >Choose Starting Year</option>

    {options.startingYear.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault04" className="form-label">Ending Year</label>
    <select type="date" className="form-control" id="validationDefault04" placeholder="Choose Ending Year" max={10} name="endingYear" value={collageDetails.endingYear} onChange={onCollageChange}  required>
    <option value="1" default >Choose Ending Year</option>

      {
        options.startingYear.map((item, index)=>{
          return <option key={index} value={item}> {item}</option>
        })
      }
    </select>
 
  </div>
 
  <div className="col-10 mt-3">
    <label htmlFor="validationDefault05" className="form-label">Final CGPA ( out of 10) </label>
    <input type="number" className="form-control" id="validationDefault05"  placeholde="Type Your CGPA" name="cgpa" value={collageDetails.cgpa} onChange={onCollageChange} required/>
  </div>
  <div className="  modal-footer d-flex justify-content-around flex-row" >
        <button  className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary modal-save-btn " data-bs-dismiss="modal" >Save changes</button>

      </div>
  </form>

</div>

:<div className='mt-4'>
<form onSubmit={handleEducationalDetails}>
<div className="col-10 mt-3">
  <label htmlFor="validationDefault07" className="form-label">School</label>
  <input type="text" className="form-control" id="validationDefault07" placeholder="Type School Name"  name="schoolName" value={schoolDetails.schoolName} onChange={onSchoolChange} required/>
</div>
<div className="col-10 mt-3">
  <label htmlFor="validationDefault8" className="form-label">Class </label>
  <select type="text" className="form-control" id="validationDefault08" placeholder="Type Class "  name="class" value={schoolDetails.class} onChange={onSchoolChange} required>
  <option value="1" default>Choose Class</option>

    {options.schoolClasses.map((item, index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>

<div className="col-10 mt-3">
  <label htmlFor="validationDefault10" className="form-label">Select Passing Year</label>
  <select type="date" className="form-control" id="validationDefault10" placeholder="Choose Passing year" name="passingYear" value={schoolDetails.passingYear}  onChange={onSchoolChange} required>
  <option value="1" default >Choose Passing Year</option>

    {options.startingYear.map((item , index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>


<div className="col-10 mt-3">
  <label htmlFor="validationDefault11" className="form-label">Final CGPA ( out of 10) </label>
  <select type="number" className="form-control" id="validationDefault11" min="1" max="10" step="0.1"  placeholder="Type Your CGPA" name="cgpa" value={schoolDetails.cgpa} onChange={onSchoolChange} required>
   <option></option>
    </select>
  </div>
<div className="  modal-footer d-flex justify-content-around flex-row" >
        <button className="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button   type="submit"  className="btn btn-primary modal-save-btn " data-bs-dismiss="modal">Save changes</button>
      </div>
</form>

</div>

}

     
      </div>
     
      
    </div>
  </div>
</div>  


      
      
      
    </div>
  )
}

export default Education

 Education.propTypes={
  educationData:PropTypes.object.isRequired,
 }


Education.defaultProps = {
  educationData: {
    extraFields: {
      Education: []
    }
  }
};
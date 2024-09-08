import React, { useEffect, useState } from 'react'
import { MdCastForEducation } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../Styles/education.css"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import options from "./data.json"
import PropTypes from 'prop-types'

function Education( {userEducation}) {

  const [EducationLevel,setEducationLevel]= useState("college")
  const [educationChecked,setEducationChecked]= useState(true)
  const [updateValue, setUpdateValue]= useState(false)
  const [schoolDetails, setSchoolDetails]= useState({schoolName:"", class:"", passingYear:"", cgpa:""})
  const [collageDetails,setCollegeDetails]= useState({universityName:"",fieldOfStudy:"",degree:"",startingYear:"", endingYear:"",cgpa:""})
  const [educationDetail, setEducationDetail]= useState([])
    // setEducationDetail(userEducation)  
    useEffect(()=>{
      setEducationDetail(userEducation)
    }, [userEducation])

    console.log(educationDetail[0])
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


const token= localStorage.getItem("token")




const handleEducationalDetails=async (e)=>{

  if(collageDetails.cgpa <0 || collageDetails.cgpa>10 || schoolDetails.cgpa<0 || schoolDetails.cgpa>10){
alert("data is not proper")
  }else{
  e.preventDefault()

try{
  const response= await fetch('http://localhost:5000/api/candidate/Profile/addProfileDetail',{
    method:"POST",
    body:JSON.stringify({token:token, data:educationChecked===true ? collageDetails :schoolDetails,  dataType:'Education'  }),
    headers:{
      "Content-type":'application/json'
    }

  })
  if(!response.ok){
    setSchoolDetails({schoolName:"", class:"", passingYear:"", cgpa:""})
    setCollegeDetails({universityName:"",fieldOfStudy:"",degree:"",startingYear:"", endingYear:"",cgpa:""})

    throw new Error(response.statusText)
  }
     
  const result= await response.json()
  console.log(result)
}catch(err){
  console.error(err)
  setSchoolDetails({schoolName:"", class:"", passingYear:"", cgpa:""})
  setCollegeDetails({universityName:"",fieldOfStudy:"",degree:"",startingYear:"", endingYear:"",cgpa:""})
}

  }

}






const handleUpdateEducationDetail=async(e)=>{
  e.preventDefault()
  try{
    const response=  await fetch('http://localhost:5000/api/candidate/Profile/updateProfileDetail',{
      method:"POST",
      body:JSON.stringify({token:token, data:educationChecked===true ? collageDetails :schoolDetails, dataType:'Education' }),
      headers:{
        "Content-type":"application/json"
      }
    })
    if(!response.ok){
      throw new Error(response.statusText)
    }else{
      return await response.json()
    }
  }catch(err){
    console.error(err)

  }
  
}


const handleUpdate=()=>{
  updateValue(true)   
}
console.log(educationDetail)
// console.log(userEducation)   
// console.log(educationDetail[0] && educationDetail[0].length>0 ? educationDetail[0]:"" )


  return (

    <div className='bg-light rounded-3 mx-auto  p-3 p-sm-3 p-md-3 p-lg-5 align-items-center  shadow resume'>
 +

      {  educationDetail && educationDetail.length>1    ?   educationDetail.map((item, index)=>{
      return <div className='education-first d-flex justify-content-between align-items-center'> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon'><MdCastForEducation className='fs-4' /> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>{item}</span>
            <span className='d-block'> Your school/college details</span> 
          </div>
          
        </div>
        <div className='education-btn'>
          <button className='btn btn-outline-info d-flex justify-content-center ' type='button'  data-bs-toggle="modal" data-bs-target="#exampleModal">
             <span className='add-icon mt-1 fw-bolder'> <IoMdAdd /></span>  <span className='add-btn-name'> Add New</span> </button>
        </div>

      </div> 
      })
:

      <div className='d-flex flex-column align-items-center'>
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
            <span className='add-btn-name'>Add New </span>
        </button>
    </div>
</div>

      }

{/* USER EDUCATION FOR  */}



     { educationDetail && educationDetail.length>1 ? educationDetail.map((item,index)=>{

return <div className='education-first user-education p-3 mt-4'>
<div className='  d-flex justify-content-between align-items-center ' key={index}> 
        <div className='education-heading d-flex justify-content-start'>
          <span className='education-icon '><FaGraduationCap  className='fs-4'/> </span> 
          <div className='ms-4'>
            <span className='d-block fw-bold '>Yeshwant College Nanded</span>
            {/* <span className='d-block'> Master of Computer Application (MCA) | Computer Science & Information Technology </span> 
            <span className='d-block fw-light'> 2019-2025</span>  */}

          </div>
          <div className='education-btn d-block d-sm-none '>
        <button className='btn btn-outline-info  ' type='button' data-bs-toggle="modal" data-bs-target="#exampleModalUpdate">
            <span className='add-icon mt-1 fw-bolder'><MdOutlineModeEditOutline /></span>
          
        </button>
        </div>
        
           
          
        </div> 
        
        
         <div className='education-btn d-sm-block d-none'>
        <button className='btn btn-outline-info d-flex justify-content-center' type='button' data-bs-toggle="modal" data-bs-target="#exampleModalUpdate">
            <span className='add-icon mt-1 fw-bolder'><MdOutlineModeEditOutline /></span>
            <span className='add-btn-name'>Update</span>
        </button>
    </div>
     
      </div>
      <div className='ps-5'>
         <span className='d-block'> Master of Computer Application (MCA)  </span> 
         <span className='d-block'>  Computer Science & Information Technology </span>
         <span> CGPA : 8.5</span>
          <span className='d-block fw-light'> 2019-2025</span>  


      </div>

      </div>
      }):""
}
      


















{/* modal for adding new educational details */}


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Educational Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">


        <div className='check-find d-flex justify-content-between mx-auto'>
          { educationChecked===true ?
         <div className='check-collage text-primary fw-bold '>Collage</div> :
         <div className='check-collage  '>Collage</div> 
          }


      <div class="form-check form-switch check-input ms-5 ">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" value={EducationLevel} name="educationalLevel" onChange={getValue} />
  <label class="form-check-label" for="flexSwitchCheckChecked"></label>
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
  <div class="col-10 mt-3">
    <label for="validationDefault01" class="form-label">University Name</label>
    <input type="text" class="form-control" id="validationDefault01" placeholder="Type University name" name="universityName" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault6" class="form-label">Field of Study </label>
    <select type="text" class="form-select" id="validationDefault06" placeholder="Type Field Of Study "  name="fieldOfStudy" value={collageDetails.fieldOfStudy} onChange={onCollageChange} required>
      <option  value="1" default >Choose field of study</option>
      {options.fieldOfStudy.map((item, index)=>{
        return  <option key={index}  value={item}>{item }</option>
      })

      }


    </select>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault02" class="form-label">Degree</label>
    <select type="text" class="form-select" id="validationDefault02" placeholder="Type Degree" name="degree" value={collageDetails.degree}  onChange={onCollageChange} required>
    <option  value="1" default >Choose Degree</option>

    {options.degrees.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault03" class="form-label">Starting Year</label>
    <select type="date" class="form-control" id="validationDefault03" placeholder="Choose Starting year"  name="startingYear" value={collageDetails.startingYear} onChange={onCollageChange} required>
    <option  value="1" default >Choose Starting Year</option>

    
    {options.startingYear.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault04" class="form-label">Ending Year</label>
    <select type="date" class="form-control" id="validationDefault04" placeholder="Choose Ending Year" max={10} name="endingYear" value={collageDetails.endingYear} onChange={onCollageChange}  required>
    <option   value="1" default >Choose Ending Year</option>

      {
        options.startingYear.map((item, index)=>{
          return <option key={index} value={item}> {item}</option>
        })
      }
    </select>
 
  </div>
 
  <div class="col-10 mt-3">
    <label for="validationDefault05" class="form-label">Final CGPA ( out of 10) </label>
    <input type="number" class="form-control" id="validationDefault05"  placeholde="Type Your CGPA" name="cgpa" value={collageDetails.cgpa} onChange={onCollageChange} required/>
  </div>
  <div class="  modal-footer d-flex justify-content-around flex-row" >
        <button  class="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary modal-save-btn ">Save changes</button>

      </div>
  </form>

</div>

:<div className='mt-4'>
<form onSubmit={handleEducationalDetails}>
<div class="col-10 mt-3">
  <label for="validationDefault07" class="form-label">School</label>
  <input type="text" class="form-control" id="validationDefault07" placeholder="Type School Name"  name="schoolName" value={schoolDetails.schoolName} onChange={onSchoolChange} required/>
</div>
<div class="col-10 mt-3">
  <label for="validationDefault8" class="form-label">Class </label>
  <select type="text" class="form-control" id="validationDefault08" placeholder="Type Class "  name="class" value={schoolDetails.class} onChange={onSchoolChange} required>
  <option  value=" " default >Choose Class</option>

    {options.schoolClasses.map((item, index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>

<div class="col-10 mt-3">
  <label for="validationDefault10" class="form-label">Select Passing Year</label>
  <select type="date" class="form-control" id="validationDefault10" placeholder="Choose Passing year" name="passingYear" value={schoolDetails.passingYear}  onChange={onSchoolChange} required>
  <option  value="1" default >Choose Passing Year</option>

    {options.startingYear.map((item , index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>

<div class="col-10 mt-3">
  <label for="validationDefault11" class="form-label">Final CGPA ( out of 10) </label>
  <input type="number" class="form-control" id="validationDefault11"   max="10" min="1" step="0.1"  placeholde="Type Your CGPA" name="cgpa" value={schoolDetails.cgpa} onChange={onSchoolChange} required/>
</div>
<div class="  modal-footer d-flex justify-content-around flex-row" >
        <button class="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button   type="submit"  class="btn btn-primary modal-save-btn ">Save changes</button>
      </div>
</form>

</div>

}

     
      </div>
     
      
    </div>
  </div>
</div>
     








{/* modal for updating user data */}



<div class="modal fade" id="exampleModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Educational Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">


        <div className='check-find d-flex justify-content-between mx-auto'>
          { educationChecked===true ?
         <div className='check-collage text-primary fw-bold '>Collage</div> :
         <div className='check-collage  '>Collage</div> 
          }


      <div class="form-check form-switch check-input ms-5 ">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" value={EducationLevel} name="educationalLevel" onChange={getValue} />
  <label class="form-check-label" for="flexSwitchCheckChecked"></label>
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
  <div class="col-10 mt-3">
    <label for="validationDefault01" class="form-label">University Name</label>
    <input type="text" class="form-control" id="validationDefault01" placeholder={""} name="universityName" value={collageDetails.universityName}  onChange={onCollageChange} required/>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault6" class="form-label">Field of Study </label>
    <select type="text" class="form-select" id="validationDefault06" placeholder="Type Field Of Study "  name="fieldOfStudy" value={collageDetails.fieldOfStudy} onChange={onCollageChange} required>
    <option value="" default>Choose Field Of Study</option>

      {options.fieldOfStudy.map((item, index)=>{
        return  <option key={index}  value={item}>{item }</option>
      })

      }


    </select>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault02" class="form-label">Degree</label>
    <select type="text" class="form-select" id="validationDefault02" placeholder="Type Degree" name="degree" value={collageDetails.degree}  onChange={onCollageChange} required>
    <option value="1" default >Choose Degree</option>

    {options.degrees.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault03" class="form-label">Starting Year</label>
    <select type="date" class="form-control" id="validationDefault03" placeholder="Choose Starting year"  name="startingYear" value={collageDetails.startingYear} onChange={onCollageChange} required>
    <option value="1" default >Choose Starting Year</option>

    {options.startingYear.map((item, index)=>{
    return <option key={index} value={item}> {item}</option>
    })}
    </select>
  </div>
  <div class="col-10 mt-3">
    <label for="validationDefault04" class="form-label">Ending Year</label>
    <select type="date" class="form-control" id="validationDefault04" placeholder="Choose Ending Year" max={10} name="endingYear" value={collageDetails.endingYear} onChange={onCollageChange}  required>
    <option value="1" default >Choose Ending Year</option>

      {
        options.startingYear.map((item, index)=>{
          return <option key={index} value={item}> {item}</option>
        })
      }
    </select>
 
  </div>
 
  <div class="col-10 mt-3">
    <label for="validationDefault05" class="form-label">Final CGPA ( out of 10) </label>
    <input type="number" class="form-control" id="validationDefault05"  placeholde="Type Your CGPA" name="cgpa" value={collageDetails.cgpa} onChange={onCollageChange} required/>
  </div>
  <div class="  modal-footer d-flex justify-content-around flex-row" >
        <button  class="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary modal-save-btn ">Save changes</button>

      </div>
  </form>

</div>

:<div className='mt-4'>
<form onSubmit={handleEducationalDetails}>
<div class="col-10 mt-3">
  <label for="validationDefault07" class="form-label">School</label>
  <input type="text" class="form-control" id="validationDefault07" placeholder="Type School Name"  name="schoolName" value={schoolDetails.schoolName} onChange={onSchoolChange} required/>
</div>
<div class="col-10 mt-3">
  <label for="validationDefault8" class="form-label">Class </label>
  <select type="text" class="form-control" id="validationDefault08" placeholder="Type Class "  name="class" value={schoolDetails.class} onChange={onSchoolChange} required>
  <option value="1" default>Choose Class</option>

    {options.schoolClasses.map((item, index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>

<div class="col-10 mt-3">
  <label for="validationDefault10" class="form-label">Select Passing Year</label>
  <select type="date" class="form-control" id="validationDefault10" placeholder="Choose Passing year" name="passingYear" value={schoolDetails.passingYear}  onChange={onSchoolChange} required>
  <option value="1" default >Choose Passing Year</option>

    {options.startingYear.map((item , index)=>{
      return <option key={index} value={item}>{item}</option>
    })}
    </select>
</div>

<div class="col-10 mt-3">
  <label for="validationDefault11" class="form-label">Final CGPA ( out of 10) </label>
  <select type="number" class="form-control" id="validationDefault11" min="1" max="10" step="0.1"  placeholder="Type Your CGPA" name="cgpa" value={schoolDetails.cgpa} onChange={onSchoolChange} required>
   <option></option>
    </select>
  </div>
<div class="  modal-footer d-flex justify-content-around flex-row" >
        <button class="btn btn-secondary  modal-close-btn  " data-bs-dismiss="modal">Close</button>
        <button   type="submit"  class="btn btn-primary modal-save-btn ">Save changes</button>
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
  userEducation:PropTypes.string.isRequired,
}


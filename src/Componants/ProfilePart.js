import React, { useState } from 'react'
import "../Styles/profile-part.css"
import Resume from './Resume'
import Education from './Education'
import Experience from './Experience'
import Work from './Work'
import Projects from './Projects'
import Accomplishment from './Accomplishment'
import Footer from './Footer'

function ProfilePart() {
const [section, setSection]= useState( "resume")


const renderComponent=(value)=>{
  setSection(value)
}
  return (   
    <div className='profile-part-main  w-100 d-none d-sm-block '>

        <div className='profile-part-header  d-flex justify-content-around ' >
        <div to ="/" className= { section ==="resume" ? 'profile-section text-primary text-decoration-underline ':"profile-section"} onClick={()=>{ renderComponent("resume")}}> Resume</div>
        <div to ="/" className= {section==="education"  ? 'profile-section text-primary text-decoration-underline  ':"profile-section"} onClick={()=>{ renderComponent("education")}}> Education</div>
        <div to ="/" className= { section==="experience"   ? "profile-section text-primary text-decoration-underline ":"profile-section"} onClick={()=>{ renderComponent("experience")}}> Experience</div>
        <div to ="/" className= { section==="work" ? 'profile-section  text-primary text-decoration-underline ':"profile-section" } onClick={()=>{ renderComponent("work")}}> Work </div>
        <div to ="/" className={section==="projects" ?  'profile-section  text-primary text-decoration-underline ' :"profile-section"}  onClick={()=>{ renderComponent("projects")}}> Projects</div>
        <div to ="/" className={section==="accomplishment" ? "profile-section  text-primary text-decoration-underline " :"profile-section"} onClick={()=>{ renderComponent("accomplishment")}}> Accomplishment </div>
        </div>
<div className=' mt-5 mb-5'>
          {/* { section===" "  && <Resume/>  } */}
           {section==="resume" &&   <Resume/>}
           {section==="education" && <Education/>   }
          {section==="experience" &&  <Experience/>}  
            {section==="work"  && <Work/>}
            {section==="projects" &&  <Projects/>}
            {section ==="accomplishment"   && <Accomplishment/>}   
      
            </div>
        

        <div>
                           
        </div>
        <Footer/>
      
    </div>
  )
}

export default ProfilePart

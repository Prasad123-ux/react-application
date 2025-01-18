import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './Componants/Navbar'
import Main from './Componants/Main'

import Home from './Componants/Home'
import Login from './Componants/Login'
import Registration from './Componants/Registration'
import Signin from './Componants/Signin'
 import {BrowserRouter, Routes, Route,} from 'react-router-dom'

import Profile from './Componants/Profile'
import Explain from './Componants/Explain'
import Application from './Componants/Application'
import SubmitApply from './Componants/SubmitApply'
import AllCompanies from './Componants/Company_Component/AllCompanies'
import CompanyCard from './Componants/Company_Component/CompanyCard'
import CompanyProfile from './Componants/Company_Component/CompanyProfile'



export default function App() {

   const api='http://localhost:5000'

const [users, setUsers]= useState([]);
const [type, setType]= useState()
const [city, setCity]= useState()
const [scrollValue,setScrollValue]= useState(false)
const [isScrolling, setIsScrolling] = useState(true);


  useEffect(() => {
    
  
    // Function to handle scroll event
    const handleScroll = () => {
      // Set scrolling to true as soon as a scroll event is detected
     setIsScrolling(false)

      // Clear the timeout if the user is still scrolling
     

      // Set a timeout to change the state after the user has stopped scrolling
      };


   
 const handleNextScroll=()=>{
  setTimeout(()=>{
    setIsScrolling(true)
  },400 )
 
 }
  

    // Add event listener to window scroll
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', handleNextScroll);
    console.log(setIsScrolling)

    // Cleanup function to remove the event listener
   
    
  }, []);


useEffect(()=>{
  const storedUsers=JSON.parse(localStorage.getItem('users')) ||[]

  setUsers(storedUsers)
}, [])

const addUser=(user)=>{
   setUsers([...users, user])

  const updatedUsers= [...users, user]
  setUsers(updatedUsers)

  localStorage.setItem('users', JSON.stringify(updatedUsers))
}
const handleDelete=()=>{
  localStorage.removeItem('users')
  users.length=0;
}
const length=users.length


 const onCityChange=(cityValue)=>{
  setCity(cityValue)

 }
 const onRoleChange=(role)=>{
  setType(role)

 }
 useEffect(() => {
  console.log('Home rendered');
}, []);

  return (
    <div>       
      
      

      <BrowserRouter basename={process.env.PUBLIC_URL}>
     { isScrolling===true ?<Navbar users={users} getCity={onCityChange} getRole={onRoleChange} onDelete={handleDelete} length={length}/>:""}   
     {/* <Navbar/> */} 
     <Navbar/>
<Routes>
<Route  path='/' element={<Home users={users} />} />
<Route exact path='/login' element={<Login users={users} api={api}/>} />
<Route exact path='/signin' element={<Signin users={users}   api={api}/>}/>
<Route exact path='/registration' element={<Registration addUser={addUser} users={users}  api={api}/>}/>
<Route exact path='/main' element={<Main city={city} role={type}  api={api} />} />
<Route exact path='/profile' element={<Profile users={users}  api={api}/>}/>
<Route exact path="/job_detail/:id" element={<Explain/>}  api={api}/>
<Route exact path="job_detail/job_application/:id" element={<Application/>}  api={api}/>
<Route exact path="job_detail/job_application/application_success" element={<SubmitApply/>} api={api}/> 
<Route exact path="companies" element={<AllCompanies/>} api={api}/>
<Route exact path="/companies/skeleton" element={<CompanyCard/>} api={api}/>
<Route exact path="/companies/skeleton/companyProfile/:id" element={<CompanyProfile/>} api={api}/> 
<Route exact path="" element={<CompanyProfile/>} api={api}/> 






</Routes>  

 
  
</BrowserRouter>



    </div>
  )
}
   

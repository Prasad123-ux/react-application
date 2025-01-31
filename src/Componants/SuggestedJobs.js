import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'

export default function SuggestedJobs() {
    const [loading, setLoading]= useState(false)
    const token= localStorage.getItem("token")
    const [suggestedJobs, setSuggestedJobs]= useState([])
    const toast= useToast()

useEffect(()=>{


    const suggestedJobs=async()=>{ 

        try{
            const response= await fetch("https://localhost:5000/api/candidate/suggestedJobs", {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({token:token})
            })

            if(!response.ok){
                const errorText= await response.text 
                throw new Error("Not Suggested jobs ", "error")
            }else{
                const data = await response.json()
                setSuggestedJobs(data.Data)
                
            }
        }catch(err){
            addToast(err.message, "error")

        }finally{
            setLoading(false)

        }

    }
suggestedJobs()
},[])


const addToast=(title, status)=>{
    toast({
        title: title,
    // description: message,
    status: status,
    duration: 10000,
    isClosable: true,
        
    })
}
  return (

    <div>
      



    </div>
  )
}

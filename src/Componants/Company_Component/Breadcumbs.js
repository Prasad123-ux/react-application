import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react' 
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function Breadcumbs({breadCrumbs}) { 
    console.log(breadCrumbs)
  return (
    <div>
      <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}> 

      {
       breadCrumbs && breadCrumbs.length>=1  ?  Object.entries(breadCrumbs).map(([key,value], index)=>{
            return  <BreadcrumbItem> 
            m,mm,m,
            <BreadcrumbLink href={value}>{key}</BreadcrumbLink>
          </BreadcrumbItem>
        })
   :""   }
 

 
</Breadcrumb>
    </div>
  )
}

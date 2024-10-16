import React from 'react'
import "../../Styles/overview.css"

export default function OverView({about}) {
  return (
    <div>
      <div className='overview-about shadow  mx-auto '>  <span className='d-block fs-6 fw-bold'>About Company</span>
        <span className='overview-info'>  
        {about}
      </span>
        </div>
    </div>
  )
}

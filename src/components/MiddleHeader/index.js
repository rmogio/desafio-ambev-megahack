import React from 'react'

import clava from '../../assets/clava.svg'
import barLogo from '../../assets/logo-bar.svg'

import './styles.css'

export default function MiddleHeader(){
  return(
    <div className="middleHeader">
      <img className='clava' src={clava} alt="nota musical"/>
      <img className='bar-logo' src={barLogo} alt="Logo bar"/>
    </div>
  )
}
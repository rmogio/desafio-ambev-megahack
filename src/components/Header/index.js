import React from 'react'

import ambevLogo from '../../assets/logo-ambev.svg'

import './styles.css'

export default function Header(){
  return(
    <header>
      <img className='ambev-logo' src={ambevLogo} alt="Logo Ambev"/>
    </header>
  )
}
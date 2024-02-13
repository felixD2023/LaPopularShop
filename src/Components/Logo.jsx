import React from 'react'
import logoImg from '../Images/logo.png'

const Logo = ({height}) => {
  return (
    <>
    <div style={{width:height,height:height,}}>
    <div style={{height:height}}>
        <img height={height} src={logoImg} alt="Logo de La Popular" />
    </div>
    </div>
    
    </>
  )
}

export default Logo
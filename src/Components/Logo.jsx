import React from 'react'
import logoImg from '../Images/logo.png'

const Logo = ({height}) => {
  return (
    <>
    <div style={{width:height,height:height,borderRadius:'50%',overflow:'hidden', display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div style={{height:height}}>
        <img height={height} src={logoImg} alt="Logo de La Popular" />
    </div>
    </div>
    
    </>
  )
}

export default Logo
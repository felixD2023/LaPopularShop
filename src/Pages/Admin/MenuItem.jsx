import React from 'react'
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ name, rute,isActive, icon,setItemActive,index }) => {
  const navigate=useNavigate()
  return (
    <>
      <div onClick={()=>{setItemActive(index); navigate(rute) }} style={{ marginBottom: '30px', fontSize: '20px',cursor:'pointer' }}>
        <div style={{position:'relative',height:"40px", display:'flex',alignItems:'center',background: isActive?"#a2fb67":"#fff", width: `${isActive?155:100}px`, borderRadius: "2em",overflow:'hidden',transition:'all 1s ease' }}>
          <div style={{ paddingLeft: '10px',paddingRight:'10px' }}>{name}</div>
          <div style={{position:'absolute',left:"124px",display:'flex',alignItems:'center',height:"26px"}}><img style={{height:"24px"}} src={icon}/></div>
        </div>
      </div>
    </>
  )
}

export default MenuItem
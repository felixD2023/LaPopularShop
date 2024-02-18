import React, { useEffect,useRef } from 'react'

const NavItem = ({name,icon,isActive,toActive,index,setActiveLeft,setActiveWidth}) => {
	const refItem=useRef(null)
	useEffect(()=>{
		if(isActive){
			setActiveLeft(refItem.current.offsetLeft)
			setActiveWidth(refItem.current.offsetWidth)
		}
	},[isActive])
	return (
		<>
			<div ref={refItem} onClick={()=>toActive(index)} style={{height:'58px',width:'200px',display:'flex',flexDirection:'column',alignItems:'center',position:'relative',overflow:'hidden',cursor:'pointer'}}>
				<div style={{marginTop:`${isActive?'1px':'7px'}`,fontSize:`${isActive?'12px':'16px'}`,transition:'all 1s ease'}}>{name}</div>
				<div style={{position:'absolute',top:`${isActive?'27px':'125px'}`,zIndex:3,transition:'all 1s ease-out'}}>{icon}</div>
			</div>
		</>
	)
}

export default NavItem
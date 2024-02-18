import React, { useEffect,useRef } from 'react'
import useScreenSize from '../../Hooks/useScreenSize'
import { useNavigate } from 'react-router-dom'

const NavItem = ({name,icon,route,isActive,toActive,index,setActiveLeft,setActiveWidth}) => {
	const refItem=useRef(null)
	const navigate = useNavigate()
	const {width} = useScreenSize()
	useEffect(()=>{
		if(isActive){
			setActiveLeft(refItem.current.offsetLeft)
			setActiveWidth(refItem.current.offsetWidth)
		}
	},[isActive])

	useEffect(()=>{
		if(isActive){
			setActiveLeft(refItem.current.offsetLeft)
			setActiveWidth(refItem.current.offsetWidth)
		}
	},[width])



	return (
		<>
			<div id='NavItem' ref={refItem} onClick={()=>{toActive(index);navigate(route)}} style={{height:'58px',width:'200px',display:'flex',flexDirection:'column',alignItems:'center',position:'relative',overflow:'hidden',cursor:'pointer'}}>
				<div style={{marginTop:`${isActive?'1px':'7px'}`,fontSize:`${isActive?'12px':'16px'}`,transition:'all 1s ease'}}>{name}</div>
				<div style={{position:'absolute',top:`${isActive?'27px':'125px'}`,zIndex:3,transition:'all 1s ease-out'}}><img style={{height:'22px'}} src={icon}/></div>
			</div>
		</>
	)
}

export default NavItem
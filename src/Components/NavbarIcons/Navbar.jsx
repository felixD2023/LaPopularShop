import React, { useRef, useState,useEffect } from 'react'
import NavItem from './NavItem'
import Cursor from './Cursor'

const Navbar = ({ names }) => {
	const [itemActive, setItemActive] = useState(0)
	const [activeLeft,setActiveLeft] = useState(0)
	
	return (
		<>
			<div className='bg-success' style={{ position:'relative',display: 'flex', justifyContent: 'space-evenly', width: '90%', height: '40px', marginTop: '10px', borderRadius: '2em' }}>
				<Cursor activeLeft={activeLeft}/>
				{names.map((item, index) =>
					<NavItem key={item.name}  setActiveLeft={setActiveLeft} toActive={setItemActive} index={index} isActive={itemActive === index} name={item.name} icon={item.icon} />
				)}
			</div>
		</>
	)
}

export default Navbar
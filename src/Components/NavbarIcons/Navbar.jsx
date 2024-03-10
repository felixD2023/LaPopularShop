import React, { useRef, useState, useEffect } from 'react'
import NavItem from './NavItem'
import Cursor from './Cursor'
import { useLocation } from 'react-router-dom'

const Navbar = ({ names,bgColor }) => {
	const [itemActive, setItemActive] = useState(0)
	const [activeLeft, setActiveLeft] = useState(50)
	const [activeWidth, setActiveWidth] = useState(0)
	const location = useLocation()


	useEffect(() => {
		let index = 0
		for(let i=0;i<names.length;i++){
			if(location.pathname.includes(names[i].route)){
				index=i;
				break;
			}
		}
		setItemActive(index)
	}, [location])

	return (
		<>
			<div className='bg-success' style={{ position: 'relative', display: 'flex', justifyContent: 'space-evenly', width: '90%', height: '40px', marginTop: '10px', borderRadius: '2em' }}>
				<Cursor bgColor={bgColor} activeLeft={activeLeft} activeWidth={activeWidth} />
				{names.map((item, index) =>
					<NavItem key={item.name} route={item.route} setActiveLeft={setActiveLeft} setActiveWidth={setActiveWidth} toActive={setItemActive} index={index} isActive={itemActive === index} name={item.name} icon={item.icon} />
				)}
			</div>
		</>
	)
}

export default Navbar
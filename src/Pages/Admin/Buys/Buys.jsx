import React from 'react'
import Navbar from '../../../Components/NavbarIcons/Navbar'

import iconBuys from '../../../Images/Icons/icon-buys.svg'
import iconBuysInsert from '../../../Images/Icons/icon-buys-insert.svg'
import iconBuysUpdate from '../../../Images/Icons/icon-buys-update.svg'
import iconBuysDetail from '../../../Images/Icons/icon-buys-detail.svg'
import { Outlet } from 'react-router-dom'

const Buys = () => {
	const data = [
		{
			name: 'Todos los usuarios',
			icon:iconBuys
		},
		{
			name: 'Insertar uno',
			icon:iconBuysInsert
		},
		{
			name: 'Modificar uno',
			icon:iconBuysUpdate
		}, {
			name: 'Ver uno',
			icon:iconBuysDetail
		}]

	return (
		<>
			<div className='shadow ' style={{background:'white', display: 'flex', flexDirection:'column',alignItems:'center', borderRadius: '15px', width: '80%', height: '90%' }}>
				<Navbar names={data} />
				<Outlet/>
			</div>
		</>
	)
}

export default Buys
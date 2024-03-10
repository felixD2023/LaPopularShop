import React from 'react'
import Navbar from '../../../Components/NavbarIcons/Navbar'

import iconUserList from '../../../Images/Icons/icon-users-list.svg'
import iconUserUpdate from '../../../Images/Icons/icon-users-update.svg'
import iconUserInsert from '../../../Images/Icons/icon-users-insert.svg'
import iconUserDetail from '../../../Images/Icons/icon-users-detail.svg'
import { Outlet } from 'react-router-dom'


function Users() {
	const data = [
		{
			name: 'Todos los usuarios',
			icon: iconUserList,
			route:'list'
		},
		{
			name: 'Insertar uno',
			icon: iconUserInsert,
			route:'insert'
		},
		{
			name: 'Modificar uno',
			icon: iconUserUpdate,
			route:'update'
		}, {
			name: 'Ver uno',
			icon: iconUserDetail,
			route:'detail'
		}]

	return (
		<>
			<div className='shadow ' style={{ background: 'white', display: 'flex', flexDirection:'column',alignItems:'center', borderRadius: '15px', width: '80%', height: '90%' }}>
				<Navbar names={data} bgColor={"white"}/>
				<Outlet/>
			</div>
		</>
	)
}

export default Users
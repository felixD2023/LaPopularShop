import React from 'react'
import Navbar from '../../../Components/NavbarIcons/Navbar'

import iconUserList from '../../../Images/Icons/icon-users-list.svg'
import iconUserUpdate from '../../../Images/Icons/icon-users-update.svg'
import iconUserInsert from '../../../Images/Icons/icon-users-insert.svg'
import iconUserDetail from '../../../Images/Icons/icon-users-detail.svg'
import { Outlet } from 'react-router-dom'
import Alert from '../../../Components/Alert'
import { useSelector } from 'react-redux'


function Users() {
	const alert = useSelector(state=>state.alert)
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
			<div className='shadow ' style={{ position:'relative',overflow:'hidden',background: 'white', display: 'flex', flexDirection:'column',alignItems:'center', borderRadius: '15px', width: '80%', height: '90%' }}>
				<Navbar names={data} bgColor={"white"}/>
				<Outlet/>
				<Alert type={alert.type} message={alert.message} visible={alert.message!=""} />
			</div>
		</>
	)
}

export default Users
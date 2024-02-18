import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'

const AdminDashBoard = () => {
	return (
		<>
			<div style={{ background:'#f8f9fa',height:'100vh',display:'flex',alignItems:'center'}}>
				<Menu/>
				<div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
					<Outlet/>
				</div>
			</div>
		</>

	)
}

export default AdminDashBoard
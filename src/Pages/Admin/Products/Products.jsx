import React from 'react'
import Navbar from '../../../Components/NavbarIcons/Navbar'

import iconProductsList from '../../../Images/Icons/icon-products-list.svg'
import iconProductsInsert from '../../../Images/Icons/icon-product-insert.svg'
import iconProductsUpdate from '../../../Images/Icons/icon-product-update.svg'
import iconProductsDetail from '../../../Images/Icons/icon-product-detail.svg'
import { Outlet } from 'react-router-dom'


const Products = () => {
	const data = [
		{
			name: 'Todos los productos',
			icon: iconProductsList
		},
		{
			name: 'Insertar uno',
			icon:iconProductsInsert
		},
		{
			name: 'Modificar uno',
			icon:iconProductsUpdate
		}, {
			name: 'Ver uno',
			icon:iconProductsDetail
		}]

	return (
		<>
			<div className='shadow' style={{ background:'white' ,display: 'flex', flexDirection:'column',alignItems:'center', borderRadius: '15px', width: '80%', height: '90%' }}>
				<Navbar names={data} />
				<Outlet/>
			</div>
		</>
	)
}

export default Products
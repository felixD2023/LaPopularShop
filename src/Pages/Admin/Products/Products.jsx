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
			icon: iconProductsList,
			route:'list'
		},
		{
			name: 'Insertar uno',
			icon:iconProductsInsert,
			route:'insert'
		},
		{
			name: 'Modificar uno',
			icon:iconProductsUpdate,
			route:'update'
		}, {
			name: 'Ver uno',
			icon:iconProductsDetail,
			route:'detail'
		}]

	return (
		<>
			<div className='shadow' style={{ background:'white' ,display: 'flex', flexDirection:'column',alignItems:'center', borderRadius: '15px', width: '80%', height: '90%' }}>
				<Navbar names={data} bgColor={"white"} />
				<Outlet/>
			</div>
		</>
	)
}

export default Products
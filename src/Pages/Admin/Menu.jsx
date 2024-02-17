import React, { useState } from 'react'
import MenuItem from './MenuItem'
import Logo from '../../Components/Logo'
import iconProductos from '../../Images/transportation-cart-svgrepo-com.svg'
import iconUser from '../../Images/icon-user.svg'
import iconBuys from '../../Images/icon-buys.svg'

const Menu = () => {
	const [itemActive, setItemActive] = useState(0)
	const data = [
		{
			name: "Usuarios",
			rute: 'users',
			icon: iconUser	
		},
		{
			name: "Compras",
			rute: 'buys',
			icon:iconBuys
				
		},
		{
			name: "Productos",
			rute: "products",
			icon: iconProductos,

		}
	]
	return (
		<>
			<div className='shadow ' style={{ background: 'white', width: '380px', height: "90vh", marginLeft: '40px', marginTop: '0px', borderRadius: '15px', zIndex: 3 }}>
				<div style={{ marginBottom: '20px', borderRadius: '15px 15px 0px 0px', height: "100px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div style={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', }}>
						<Logo height={'50px'} />
						<div className='h5'>Bienvenido: <span style={{ textDecoration: 'underline' }}>Mage99</span></div>
					</div>
					<div style={{ fontSize: '14px' }}>Desde aquí puedes gestionar tu tienda</div>
					<div style={{ width: '90%', marginTop: '8px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'black', height: '2px', borderRadius: '2em' }} />

				</div>

				<div style={{ marginLeft: '90px' }}>
					{data.map((item, index) => <MenuItem key={index} rute={item.rute} setItemActive={setItemActive} index={index} name={item.name} icon={item.icon} isActive={index === itemActive} />)}
				</div>

			</div>
		</>
	)
}

export default Menu
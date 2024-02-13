import React from 'react'
import Footer from '../../Components/Footer'
import Logo from '../../Components/Logo'
import { Outlet } from 'react-router-dom'

const Login = () => {

	const login = (e) => {
		const user =
		{
			username: 'Paquito',
			token: 'kjhy3254nrbisdgfuyr3t4bi5whje dkjdwi7ft8743rw hwyyuewhds',
			isAdmin: true
		}

		localStorage.setItem('userLaPopular', JSON.stringify(user))

	}

	return (
		<>
		<nav/>
		<Outlet/>
		
			<div class="shadow " style={{ width: '400px', height: "400px", borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
				<p class="h1">Bienvenido</p>
				<Logo height={'100px'} />
				<div className='w-75 '>
					<label for="username" class="form-label">Usuario</label>
					<input id="username" class="form-control w-75 form-control-sm" type="text" placeholder="Nombre de Usuario" aria-label=".form-control-sm example" />
				</div>

			</div>

			<Footer />
		</>
	)
}

export default Login
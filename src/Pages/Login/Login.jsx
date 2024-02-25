import React, { useRef, useState } from 'react'
import Footer from '../../Components/Footer'
import Logo from '../../Components/Logo'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate=useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [usernameError, setUsernameError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)


	const login = () => {
		setUsernameError(false)
		setPasswordError(false)
		if (username !== '' && password !== '') {
			localStorage.setItem('userLaPopular', JSON.stringify({ username: username, password: password }))

			if(username==='admin'){
				navigate('/admin')
			}else if(username==='customer'){
				navigate('/customer')
			}

		} else if (username == '' || password == '') {
			if (username == '') {
				setUsernameError(true)
			} if (password == '') {
				setPasswordError(true)
			}
		}


	}

	return (
		<>
			<div style={{ height: '80vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div className="shadow " style={{ width: '400px', height: "460px", borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
					<p className="h3 mt-4">¡Bienvenido!</p>
					<Logo height={'150px'} />
					<p className="h6 ">Ingrese sus credenciales</p>
					<form style={{ width: "60%" }}>
						<div >
							<label htmlFor="username" className="form-label">Usuario</label>
							<input value={username} onChange={(e) => setUsername(e.target.value)} id="username" className={`form-control form-control-md ${usernameError ? 'is-invalid' : ''}`} type="text" placeholder="Nombre de Usuario" aria-label=".form-control-sm example" />
						</div>
						<div className='mt-2' >
							<label htmlFor="password" className="form-label">Contraseña</label>
							<input value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderColor: '' }} id="password" className={`form-control form-control-md ${passwordError ? 'is-invalid' : ''}`} type="text" placeholder="Contraseña" aria-label=".form-control-sm example" />
						</div>
						<div style={{ display: 'flex', justifyContent: 'end' }}>
							<button onClick={() => login()} type="button" className="btn btn-success mt-2" style={{ borderRadius: '2em' }}>Autenticar</button>
						</div>

					</form>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Login
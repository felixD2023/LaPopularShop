import React, { useRef, useState } from 'react'
import Footer from '../../Components/Footer'
import Logo from '../../Components/Logo'
import Alert from '../../Components/Alert'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../Axios/Axios'
import { useSelector,useDispatch } from 'react-redux'
import { setAlert,clearAlert } from '../../Redux/AlertSlice'


const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const alert = useSelector(state=>state.alert)
	const [usernameError, setUsernameError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [loading, setLoading] = useState(false)

	const login = async () => {
		dispatch(clearAlert())
		setUsernameError(false)
		setPasswordError(false)
		if (username !== '' && password !== '') {
			const data = {
				"userName": username,
				"password": password
			}
			try {
				setLoading(true)
				const response = await axiosInstance.post("/api/Login", data)
				localStorage.setItem("userLaPopular", JSON.stringify(response.data))

				if (response.data.role === 'admin') {
					navigate('/admin')
				} else if (response.data.role === 'customer') {
					navigate('/customer')
				}
			} catch (error) {
				if(error.response){
					dispatch(setAlert({type:"danger",message:"Usuario o contraseña incorrecto"}))
				}else if(error.request){
					dispatch(setAlert({type:"danger",message:"Ocurrió un problema inesperado "}))
				}
			} finally {
				setLoading(false)
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
			<div style={{ display:'flex',overflow:"hidden",flexDirection:'column',position: "relative" }}>
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

								<button disabled={loading} onClick={() => login()} type="button" className="btn btn-success mt-2" style={{ borderRadius: '2em', minWidth: '100px' }}>
									{
										loading
											? <>
												<span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
												<span role="status">&nbsp;&nbsp;Loading...</span>
											</>
											: <span>Autenticar</span>
									}
								</button>
							</div>

						</form>
					</div>
				</div>
				<Footer />

				{/*Alerts */}
					<Alert type={alert.type} message={alert.message} visible={alert.message!=""}  />
				</div>
		</>
	)
}

export default Login
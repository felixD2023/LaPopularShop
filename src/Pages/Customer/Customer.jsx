import React from 'react'
import NavBar from '../../Components/NavbarIcons/Navbar'
import { Outlet } from 'react-router-dom'
import icon_Cart from "../../Images/Icons/icon-cart.svg"
import icon_buys from "../../Images/Icons/icon-buys.svg"
import icon_user from "../../Images/Icons/icon-user.svg"
import icon_stock from "../../Images/Icons/icon-stock.svg"
import { useNavigate } from 'react-router-dom'
import Alert from '../../Components/Alert'
import { useSelector } from 'react-redux'

const Customer = () => {
	const alert = useSelector(state=>state.alert)
	const navigate = useNavigate()
	const data = [
		{
			name: 'Productos en Stock',
			icon: icon_stock,
			route: "Stock"
		},
		{
			name: 'Carrito',
			icon: icon_Cart,
			route: 'Carrito'

		},
		{
			name: 'Info. Personal',
			icon: icon_user,
			route: 'InfoPersonal'

		},
		]

		const logout =()=>{
			localStorage.removeItem("userLaPopular")
			navigate("/login")
		}

	return (
		<div style={{ position:"relative",display: "flex", flexDirection: "column", alignItems: "center", background: '#f8f9fa', width: '100%', height: "100vh" }}>
			<div style={{ display: "flex", alignItems:'center' }}>
				<NavBar bgColor={"#f8f9fa"} names={data} />
				<button className="btn btn-dark" style={{ marginLeft:'50px',marginTop: "10px", borderRadius: "2em", height: "40px" }} onClick={logout}>Logout</button>
			</div>
			<Outlet />
			<Alert type={alert.type} message={alert.message} visible={alert.message != ""} />

		</div>
	)
}

export default Customer

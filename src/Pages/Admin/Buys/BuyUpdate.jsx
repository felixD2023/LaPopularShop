import React, { useEffect, useState } from 'react'
import { buys, states } from './buys'
import { useNavigate, useParams } from 'react-router-dom';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../../Axios/Axios';
import { getUserLoggedIn } from '../../../Utils/Utils';
import { setAlert } from '../../../Redux/AlertSlice';

const BuyUpdate = () => {
	const buys = useSelector(state => state.buys)
	const [buy, setBuy] = useState({
		"id": "",
		"status": "",
		"totalValue": 0,
		"user": {
			"ci": "",
			"firstName": "",
			"lastName": "",
			"username": "",
			"address": "",
			"phone": 0,
			"email": "",
			"isAdmin": false,
			"isActive": true
		},
		"products": [],
		"date": ""
	})
	const { buyId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [productsQuantity, setProductQuantity] = useState(0)
	const [loading, setLoading] = useState(false)
	const [dateTime, setDateTime] = useState({ date: '00/00/0000', time: '00:00:00' })


	useEffect(() => {
		getBuy()
	}, [])
	const getBuy = async () => {
		if (buyId) {
			try {
				const response = await axiosInstance.get('/api/Buys/' + buyId, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
				setBuy(response.data)
			} catch (error) {
				dispatch(setAlert({ type: 'danger', message: "No fue posible obtener los datos" }))
			}
		}
	}

	useEffect(() => {
		let sum = 0
		if (buy.products) {
			buy.products.forEach((product) => sum += product.quantity)
		}
		setProductQuantity(sum)
		if (buy.date) {
			const date = new Date(buy.date)
			setDateTime({ date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`, time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` })
		}

	}, [buy])


	const updateBuyStatus = async () => {
		setLoading(true)
		try {
			await axiosInstance.put('/api/Buys/' + buy.id, { status: buy.status }, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
			dispatch(setAlert({ type: 'primary', message: "Estado actualizado" }))
		} catch (error) {
			dispatch(setAlert({ type: 'danger', message: "No fue posible actualizar estado" }))
		} finally {
			setLoading(false)
		}
	}

	const searchBuys = async () => {
		setLoadingSearch(true)
		let errors = false

		if (!errors) {
			try {



			} catch (error) {
				dispatch(setAlert({ type: "danger", message: "No fue posible realizar la búsqueda" }))
			}
		}

		setLoadingSearch(false)

	}


	return (
		<div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Cliente: </span> {buy.user.firstName + ' ' + buy.user.lastName} </div>
				</div>

				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Valor Total: </span> ${buy.totalValue}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Total de Productos: </span>{productsQuantity}</div>
				</div>
				<div className='mb-3'>
					<label htmlFor="User" className="form-label">Estado:</label>
					<select value={buy.status} onChange={(e) => { setBuy({ ...buy, status: e.target.value }) }} className="form-select" aria-label="Default select example">
						{
							states.map((state, index) =>
								<option key={state} value={state}>{state}</option>)
						}
					</select>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Hora: </span>{dateTime.time}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Fecha: </span>{dateTime.date}</div>
				</div>
				<div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
					<button disabled={loading} onClick={() => updateBuyStatus()} type="button" className="btn btn-success" style={{ borderRadius: '2em', height: '40px', marginRight: '10px', width: '150px' }}>
						{
							loading
								? <>
									<span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
									<span role="status">&nbsp;&nbsp;Loading...</span>
								</>
								: <span>Actualizar</span>
						}
					</button>

					<input onClick={() => navigate('/admin/buys/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
				</div>

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ border: '1px solid #dee2e6', overflow: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'start', height: '320px', width: '350px', borderRadius: '15px', marginBottom: '50px' }}>
					{buy.products.map((product, index) => <ProductItem key={index} height={'100px'} product={product.product} />)}

				</div>


			</div>
		</div>
	)
}

export default BuyUpdate
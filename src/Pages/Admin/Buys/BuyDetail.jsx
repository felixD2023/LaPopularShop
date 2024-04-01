import React, { useEffect, useState } from 'react'
import { buys } from './buys'
import { useNavigate, useParams } from 'react-router-dom';
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../../Redux/AlertSlice';
import { getUserLoggedIn } from '../../../Utils/Utils';
import { axiosInstance } from '../../../Axios/Axios';

const BuyDetail = () => {
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
	const [productsQuantity,setProductQuantity] = useState(0)
	const [dateTime, setDateTime] = useState({ date: '00/00/0000', time:'00:00:00' })

	useEffect( () => {
		getBuy()
	}, [])
	const getBuy= async()=>{
		if (buyId) {
			try {
				const response = await axiosInstance.get('/api/Buys/' + buyId, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
				setBuy(response.data)
			} catch (error) {
				dispatch(setAlert({ type: 'danger', message: "No fue posible obtener los datos" }))
			}
		}
	}
	useEffect(()=>{
		let sum = 0
		if (buy.products) {
			buy.products.forEach((product) => sum += product.quantity)
		}
		setProductQuantity(sum)
		if (buy.date) {
			const date = new Date(buy.date)
			setDateTime({ date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`, time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` })
		}
	},[buy])

	
	return (
		<div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
			
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Cliente: </span> {buy.user.firstName}</div>
				</div>

				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Valor Total: </span> ${buy.totalValue}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Total de Productos: </span>{productsQuantity}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Estado: </span>{buy.status}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Hora: </span>{ dateTime.time}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Fecha: </span>{dateTime.date}</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<input className='btn btn-success' disabled={!buy.id} onClick={() => navigate('/admin/buys/update/'+buy.id)} value={'Editar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
					<input className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" value={'Eliminar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
				</div>

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ border: '1px solid #dee2e6', overflow: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'start', height: '350px', width: '350px', borderRadius: '15px', marginBottom: '50px' }}>
					{buy.products.map((product, index) => <ProductItem key={index} height={'100px'} product={product.product} />)}

				</div>

				
			</div>

			{/*Modal */}
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">Eliminar Compra</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className='w-100' style={{ display: 'flex', justifyContent: 'center' }}>
							<div className='w-75'> Está a punto de eliminar una compra, ¿está seguro que desea hacerlo?</div>
						</div>
						<div className="modal-body">
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
							<button type="button" className="btn btn-danger">Eliminar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BuyDetail
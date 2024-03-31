import React, { useEffect, useState } from 'react'

//data
import usersData from '../Users/users.json'
import { products } from '../Products/products.js'
import ProductItem from './ProductItem.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../Axios/Axios.js';
import { getUserLoggedIn } from '../../../Utils/Utils.js';
import { setAlert } from '../../../Redux/AlertSlice.js';
import { setUser, addProduct,resetBuy } from '../../../Redux/CreateBuySlice.js';


const BuyInsert = () => {
	const buy = useSelector(state => state.createBuy)
	const [loading, setLoading] = useState(false)
	const [users, setUsers] = useState([])
	const [productsLoaded, setProductsLoaded] = useState([])
	const [userError,setUserError] = useState(false)
	const [productsError,setProductsError] = useState(false)
	const [quantity, setQuantity] = useState(0);
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		let count = 0;
		buy.products.forEach(prod => {
			count += prod.quantity
		});
		setQuantity(count);
	}, [buy])

	useEffect(() => {
		getUsersAndProducts()
	}, [])

	const handleChangeProductsSelect = (e) => {
		if (e.target.value !== 'Enunciated') {
			const product = productsLoaded.find((p) => p.id === e.target.value);
			if (!!product) {
				dispatch(addProduct({ product, quantity: 1 }))
			}
		}
	}

	const getUsersAndProducts = async () => {
		setLoading(true)
		try {
			const responseUsers = await axiosInstance.get('/api/Users', { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
			const responseProducts = await axiosInstance.get('/api/Products', { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })

			setUsers(responseUsers.data)
			setProductsLoaded(responseProducts.data)
		} catch (errors) {
			dispatch(setAlert({ type: 'danger', message: 'Fue imposible obtener los datos' }))
		}
		setLoading(false)
	}

	const insertBuy = async () => {
		setLoading(true)
		setUserError(false)
		setProductsError(false)
		//data validation
		let errors = false
		if (buy.userCI === '' || buy.userCI === 'Enunciated' || buy.products.length===0) {
			errors = true
			dispatch(setAlert({ type: 'danger', message: 'Debe ingresar todos los datos' }))
			if(buy.userCI === '' || buy.userCI === 'Enunciated'){
				setUserError(true)
			}
			if(buy.products.length===0){
				setProductsError(true)
			}
		}
		if (!errors) {
			try {
				const data = {
					"userCI": buy.userCI,
					"products": buy.products
				}
				const response = await axiosInstance.post('api/Buys',data,{headers:{Authorization:`Bearer ${getUserLoggedIn().token}`}})
				dispatch(setAlert({ type: 'primary', message: 'Compra registrada satisfactoriamente' }))
				dispatch(resetBuy())
			} catch (errors) {
				console.log(errors)
				console.log(buy)
				dispatch(setAlert({ type: 'danger', message: 'Fue imposible registrar la compra' }))
			}
		}

		setLoading(false)
	}




	return (
		<div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="User" className="form-label">Cliente</label>
					<select onChange={(e) => dispatch(setUser(e.target.value))} className={`form-select ${userError?'is-invalid':''}`} aria-label="Default select example">
						<option value={'Enunciated'}>Seleccione un cliente</option>
						{
							users.map((user, index) =>
								<option key={index} value={user.ci}>
									{`${user.firstName} ${user.lastName}`}
								</option>)
						}
					</select>
				</div>
				<div className='mb-3'>
					<label htmlFor="Products" className="form-label">Productos</label>
					<select onChange={(e) => handleChangeProductsSelect(e)} className={`form-select ${productsError?'is-invalid':''}`} aria-label="Default select example">
						<option value={'Enunciated'}>Seleccione un producto</option>
						{
							productsLoaded.map((product, index) =>
								<option key={index} value={product.id}>
									{product.name}
								</option>)
						}
					</select>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Valor Total: </span> ${buy.totalValue.toString().replace(',', '.')}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Total de Productos: </span>{quantity}</div>
				</div>

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ border: '1px solid #dee2e6', overflow: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'start', height: '350px', width: '350px', borderRadius: '15px', marginBottom: '50px' }}>
					{buy.products.map((p, index) => <ProductItem key={index} height={'100px'} product={p.product} />)}

				</div>


				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button disabled={loading} onClick={() => insertBuy()} type="button" className="btn btn-success" style={{ borderRadius: '2em', marginRight: '10px', width: '150px' }}>
            {
              loading
                ? <>
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                  <span role="status">&nbsp;&nbsp;Loading...</span>
                </>
                : <span>Registrar</span>
            }
          </button>
					<input onClick={() => navigate('/admin/buys/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
				</div>
			</div>
		</div>
	)
}

export default BuyInsert
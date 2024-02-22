import React, { useEffect, useState } from 'react'

//data
import usersData from '../Users/users.json'
import { products } from '../Products/products.js'
import ProductItem from './ProductItem.jsx';
import { useNavigate } from 'react-router-dom';

const BuyInsert = () => {
	const [productList, setProductList] = useState(products);
	const [productsSelected, setProductSelected] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const navigate = useNavigate()

	useEffect(() => {
		let sum = 0
		if (productsSelected) {
			productsSelected.forEach((product) => sum += product.price)
		}
		setTotalPrice(sum)
	}, [productsSelected])

	const handleChangeProductsSelect = (e) => {
		if (e.target.value !== 'Enunciated')
			setProductSelected([...productsSelected, productList.find((p) => p.name === e.target.value)])
	}

	return (
		<div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="User" className="form-label">Cliente</label>
					<select className="form-select" aria-label="Default select example">
						{
							usersData.map((user, index) =>
								<option key={index} value={user.ID}>
									{`${user.firstName} ${user.lastName}`}
								</option>)
						}
					</select>
				</div>
				<div className='mb-3'>
					<label htmlFor="Products" className="form-label">Productos</label>
					<select onChange={(e) => handleChangeProductsSelect(e)} className="form-select" aria-label="Default select example">
						<option value={'Enunciated'}>Seleccione un producto</option>

						{
							productList.map((product, index) =>
								<option key={index} value={product.name}>
									{product.name}
								</option>)
						}
					</select>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Valor Total: </span> ${totalPrice}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Total de Productos: </span>{productsSelected.length}</div>
				</div>

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ border: '1px solid #dee2e6', overflow: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'start', height: '350px', width: '350px', borderRadius: '15px', marginBottom: '50px' }}>
					{productsSelected.map((product, index) => <ProductItem key={index} height={'100px'} product={product} />)}

				</div>


				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<input className='btn btn-success' value={'Insertar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
					<input onClick={() => navigate('/admin/buys/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
				</div>
			</div>
		</div>
	)
}

export default BuyInsert
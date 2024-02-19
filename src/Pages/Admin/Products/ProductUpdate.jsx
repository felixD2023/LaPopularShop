import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import products from './products.json'

const ProductUpdate = () => {
	const [product,setProduct] = useState(products[0])
	const navigate = useNavigate()

	return (
		<div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="name" className="form-label">Nombre del producto</label>
					<input autoComplete='none' value={product.name} type="text" className="form-control" id="name" placeholder="Nombre del producto" />
				</div>
				<div className='mb-3'>
					<label htmlFor="Price" className="form-label">Precio</label>
					<input autoComplete='none' value={product.price} type="text" className="form-control" id="Price" placeholder="Precio" />
				</div>
				<div className="form-check">
					<input autoComplete='none' checked={product.on_stock} className="form-check-input" type="checkbox" value="" id="Is_Admin" />
					¿A la venta?
					<label className="form-check-label" htmlFor="Is_Admin">
					</label>
				</div>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="Category" className="form-label">Categoría</label>
					<input autoComplete='none' value={product.category} type="text" className="form-control" id="Category" placeholder="Categoría" />
				</div>

				<div className='mb-3'>
					<label htmlFor="Description" className="form-label">Descripción</label>
					<input autoComplete='none' value={product.description} type="text" className="form-control" id="Description" placeholder="Descripción" />
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<input className='btn btn-success' value={'Insertar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
					<input onClick={() => navigate('/admin/products/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate
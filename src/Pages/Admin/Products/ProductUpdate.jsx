import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from './products.js'

const ProductUpdate = () => {
	const [product, setProduct] = useState(products[0])
	const navigate = useNavigate()

	return (
		<div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
			{/*Search Section*/}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px', display: 'flex', width: '80%', height: '60px', justifyContent: 'space-around', alignItems: 'end' }}>
          <div className=''>
            <label htmlFor="SearchByID" className="form-label" style={{ fontSize: '13px' }}>Buscar por ID</label>
            <input type="text" className="form-control form-control-sm " id="SearchByID" placeholder="ID" />
          </div>
          <div className=''>
            <label htmlFor="SearchByName" className="form-label" style={{ fontSize: '13px' }}>Buscar por Nombre</label>
            <input type="text" className="form-control form-control-sm " id="SearchByName" placeholder="Nombre" />
          </div>
          <div className=''>
            <label htmlFor="SearchByCategory" className="form-label" style={{ fontSize: '13px' }}>Buscar por Categoría</label>
            <input type="text" autoComplete='none' className="form-control form-control-sm " id="SearchByCategory" placeholder="Categoría" />
          </div>
          <input className='btn btn-primary' value={'Buscar'} type='button' style={{ width: '80px', height: '40px', borderRadius: '2em' }} />
        </div>
        <div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />

      </div>

			<div style={{ display: 'flex', flexDirection: 'column'}}>
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
				<div className="mb-3">
					<label htmlFor="Image" className="form-label">Imagen</label>
					<input className="form-control" type="file" id="Image" />
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<input className='btn btn-success' value={'Actualizar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
					<input onClick={() => navigate('/admin/products/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate
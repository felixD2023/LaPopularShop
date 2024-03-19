import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserLoggedIn, isLastCharANumber } from '../../../Utils/Utils'
import { setAlert } from '../../../Redux/AlertSlice.js'
import { useDispatch } from 'react-redux'
import { axiosInstance } from '../../../Axios/Axios.js'

const ProductInsert = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")
	const [onStock, setOnStock] = useState(true)
	const [image, setImage] = useState(null)

	const [nameError, setNameError] = useState(false)
	const [priceError, setPriceError] = useState(false)
	const [categoryError, setCategoryError] = useState(false)
	const [descriptionError, setDescriptionError] = useState(false)
	const [imageError, setImageError] = useState(false)

	const insert = async () => {
		setLoading(true)
		resetErrors()

		//validate data
		let errors = false;
		if (name === '' || price === '' || category === '' || description === '' || image === null) {
			errors = true;
			dispatch(setAlert({ type: "danger", message: "No puede haber campos vacíos" }))
			if (name === '') { setNameError(true) }
			if (price === '') { setPriceError(true) }
			if (category === '') { setCategoryError(true) }
			if (description === '') { setDescriptionError(true) }
			if (image == null) { setImageError(true) }
		}
		if (!Number(price) && !errors) {
			setPriceError(true)
			dispatch(setAlert({ type: "danger", message: "El precio introducido no es válido" }))
		}
		if (!errors) {
			try {
				const data = new FormData()
				data.append('id', 'fgd')
				data.append('name', name)
				data.append('description', description)
				data.append('category', category)
				data.append('onStock', onStock)
				data.append('price', Number(price))
				data.append('image', image)
				const response = await axiosInstance.post('/api/Products', data, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })

				dispatch(setAlert({ type: 'primary', message: 'Producto agregado con éxito' }))
			} catch (error) {
				console.log(error)
				dispatch(setAlert({ type: 'danger', message: 'No fue posible agregar el producto' }))
			}
		}
		setLoading(false)
	}

	const resetErrors = () => {
		setNameError(false)
		setPriceError(false)
		setCategoryError(false)
		setDescriptionError(false)
		setImageError(false)
	}


	return (
		<div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="name" className="form-label">Nombre del producto</label>
					<input value={name} onChange={(e) => setName(e.target.value)} autoComplete='none' type="text" className={`form-control ${nameError ? 'is-invalid' : ''}`} id="name" placeholder="Nombre del producto" />
				</div>
				<div className='mb-3'>
					<label htmlFor="Price" className="form-label">Precio</label>
					<input value={price} onChange={(e) => (e.target.value.charAt(e.target.value.length - 1) === '' || e.target.value.charAt(e.target.value.length - 1) === '.' || isLastCharANumber(e.target.value)) ? setPrice(e.target.value) : null} autoComplete='none' type="text" className={`form-control ${priceError ? 'is-invalid' : ''}`} id="Price" placeholder="Precio" />
				</div>
				<div className="form-check">
					<input checked={onStock} onChange={(e) => setOnStock(e.target.checked)} autoComplete='none' className="form-check-input" type="checkbox" id="OnStock" />
					¿A la venta?
					<label className="form-check-label" htmlFor="OnStock">
					</label>
				</div>

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="Category" className="form-label">Categoría</label>
					<input value={category} onChange={(e) => setCategory(e.target.value)} autoComplete='none' type="text" className={`form-control ${categoryError ? 'is-invalid' : ''}`} id="Category" placeholder="Categoría" />
				</div>

				<div className='mb-3'>
					<label htmlFor="Description" className="form-label">Descripción</label>
					<input value={description} onChange={(e) => setDescription(e.target.value)} autoComplete='none' type="text" className={`form-control ${descriptionError ? 'is-invalid' : ''}`} id="Description" placeholder="Descripción" />
				</div>
				<div className="mb-3">
					<label htmlFor="image" className="form-label">Imagen</label>
					<input onChange={(e) => { setImage(e.target.files[0]); }} className={`form-control ${imageError ? 'is-invalid' : ''}`} id="image" type="file" />
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button disabled={loading} onClick={() => insert()} type="button" className="btn btn-success" style={{ borderRadius: '2em', marginRight: '10px', width: '150px' }}>
						{
							loading
								? <>
									<span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
									<span role="status">&nbsp;&nbsp;Loading...</span>
								</>
								: <span>Insertar</span>
						}
					</button>

					<input onClick={() => navigate('/admin/products/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
				</div>
			</div>
		</div>
	)
}

export default ProductInsert
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAlert } from '../../../Redux/AlertSlice.js'
import { getUserLoggedIn, isLastCharANumber } from '../../../Utils/Utils.js'
import { axiosInstance } from '../../../Axios/Axios.js'

const ProductUpdate = () => {
	const { productId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [id, setId] = useState("")
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

	const [searchLoading, setSearchLoading] = useState(false)
	const [idSearch, setIdSearch] = useState("")
	const [nameSearch, setNameSearch] = useState("")
	const [categorySearch, setCategorySearch] = useState("")
	const [productsSearched, setProductsSearched] = useState([])


	useEffect(() => {
		getUser()
	}, [])

	const getUser = async () => {
		if (productId) {
			try {
				const response = await axiosInstance.get('/api/Products/' + productId, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
				const product = response.data

				setId(product.id)
				setName(product.name)
				setPrice(product.price.toString().replace('.', ','))
				setCategory(product.category)
				setDescription(product.description)
				setOnStock(product.onStock)

			} catch (error) {
				dispatch(setAlert({ type: 'danger', message: 'No fue posible obtener el producto' }))
			}

		}
	}

	const update = async () => {
		setLoading(true)
		resetErrors()

		//validate data
		let errors = false;
		if (name === '' || price === '' || category === '' || description === '') {
			errors = true;
			dispatch(setAlert({ type: "danger", message: "No puede haber campos vacíos" }))
			if (name === '') { setNameError(true) }
			if (price === '') { setPriceError(true) }
			if (category === '') { setCategoryError(true) }
			if (description === '') { setDescriptionError(true) }
		}
		if (!Number(price.toString().replace(',', '.')) && !errors) {
			errors = true
			setPriceError(true)
			dispatch(setAlert({ type: "danger", message: "El precio introducido no es válido" }))
		}
		if (!errors) {
			try {
				const data = new FormData()
				data.append('id', id)
				data.append('name', name)
				data.append('description', description)
				data.append('category', category)
				data.append('onStock', onStock)
				data.append('price', price)
				data.append('image', image ? image : null)

				const response = await axiosInstance.put('/api/Products/' + id, data, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
				dispatch(setAlert({ type: 'primary', message: 'Producto editado con éxito' }))
			} catch (error) {
				dispatch(setAlert({ type: 'danger', message: 'No fue posible editar el producto' }))
			}
		}
		setLoading(false)
	}
	const searchProducts = async () => {
		//validate data
		setSearchLoading(true)
		let errors = false
		if (idSearch === '' && nameSearch === '' && categorySearch === '') {
			errors = true
			dispatch(setAlert({ type: 'danger', message: 'Debe rellenar al menos un campo' }))
		}
		if (!errors) {
			try {
				const data = {
					"id": idSearch,
					"name": nameSearch,
					"category": categorySearch
				}
				const response = await axiosInstance.post('/api/Products/Search', data, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })

				setProductsSearched(response.data)
				if (response.data.length === 0) {
					dispatch(setAlert({ type: 'warning', message: 'No se encontraron coincidencias' }))
				} else {
					dispatch(setAlert({ type: 'primary', message: `Se encontraron ${response.data.length} coincidencias ` }))
				}
			} catch (error) {
				dispatch(setAlert({ type: 'danger', message: 'Ocurrió un error al buscar' }))
			}

		}
		setSearchLoading(false)
	}

	const resetErrors = () => {
		setNameError(false)
		setPriceError(false)
		setCategoryError(false)
		setDescriptionError(false)
	}

	const setData = (product) => {
		setName(product.name)
		setPrice(product.price)
		setCategory(product.category)
		setDescription(product.description)
		setId(product.id)
		setOnStock(product.onStock)
	}


	return (
		<div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
			{/*Search Section*/}
			<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div style={{ marginBottom: '4px', display: 'flex', width: '80%', height: '60px', justifyContent: 'space-around', alignItems: 'end' }}>
					<div className=''>
						<label htmlFor="SearchByID" className="form-label" style={{ fontSize: '13px' }}>Buscar por Id</label>
						<input value={idSearch} onChange={(e) => setIdSearch(e.target.value)} type="text" className="form-control form-control-sm " id="SearchByID" placeholder="Id" />
					</div>
					<div className=''>
						<label htmlFor="SearchByName" className="form-label" style={{ fontSize: '13px' }}>Buscar por Nombre</label>
						<input value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} type="text" className="form-control form-control-sm " id="SearchByName" placeholder="Nombre" />
					</div>
					<div className=''>
						<label htmlFor="SearchByCategory" className="form-label" style={{ fontSize: '13px' }}>Buscar por Categoría</label>
						<input value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} type="text" autoComplete='none' className="form-control form-control-sm " id="SearchByCategory" placeholder="Categoría" />
					</div>
					<button disabled={searchLoading} onClick={() => searchProducts()} type="button" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '2em', height: '35px', maxWidth: '150px', marginLeft: '5px' }}>
						{
							searchLoading
								? <>
									<span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
									<span role="status">&nbsp;&nbsp;Loading...</span>
								</>
								: <span>Buscar</span>
						}
					</button>
				</div>
				<ul className="list-group list-group-flush w-75 mb-1" style={{ maxHeight: "80px", overflow: 'auto' }}>
					{productsSearched.map(ps =>
						<li key={ps.id} className="list-group-item " onClick={() => setData(ps)}><div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}><div>{ps.name}</div><div>{ps.category}</div> <div>{ps.onStock ? "A la venta" : 'Terminado'}</div> </div></li>
					)}
				</ul>
				<div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />
			</div>

			{/*Update Section */}
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="name" className="form-label">Nombre del producto</label>
					<input autoComplete='none' value={name} onChange={(e) => setName(e.target.value)} type="text" className={`form-control ${nameError ? 'is-invalid' : ''}`} id="name" placeholder="Nombre del producto" />
				</div>
				<div className='mb-3'>
					<label htmlFor="Price" className="form-label">Precio</label>
					<input autoComplete='none' value={price} onChange={(e) => (e.target.value.charAt(e.target.value.length - 1) === '' || e.target.value.charAt(e.target.value.length - 1) === ',' || isLastCharANumber(e.target.value)) ? setPrice(e.target.value) : null} type="text" className={`form-control ${priceError ? 'is-invalid' : ''}`} id="Price" placeholder="Precio" />
				</div>
				<div className="form-check">
					<input autoComplete='none' checked={onStock} onChange={(e) => setOnStock(e.target.checked)} className="form-check-input" type="checkbox" value="" id="Is_Admin" />
					¿A la venta?
					<label className="form-check-label" htmlFor="Is_Admin">
					</label>
				</div>

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<label htmlFor="Category" className="form-label">Categoría</label>
					<input autoComplete='none' value={category} onChange={(e) => setCategory(e.target.value)} type="text" className={`form-control ${categoryError ? 'is-invalid' : ''}`} id="Category" placeholder="Categoría" />
				</div>

				<div className='mb-3'>
					<label htmlFor="Description" className="form-label">Descripción</label>
					<input autoComplete='none' value={description} onChange={(e) => setDescription(e.target.value)} type="text" className={`form-control ${descriptionError ? 'is-invalid' : ''}`} id="Description" placeholder="Descripción" />
				</div>
				<div className="mb-3">
					<label htmlFor="Image" className="form-label">Imagen</label>
					<input onChange={(e) => setImage(e.target.files[0])} className="form-control" type="file" id="Image" />
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button disabled={loading} onClick={() => update()} type="button" className="btn btn-success" style={{ borderRadius: '2em', marginRight: '10px', width: '150px' }}>
						{
							loading
								? <>
									<span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
									<span role="status">&nbsp;&nbsp;Loading...</span>
								</>
								: <span>Editar</span>
						}
					</button>
					<input onClick={() => navigate('/admin/products/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate
import React, { useEffect, useState } from 'react'
import {products as productsData}  from './products.js' 
import iconRemove from '../../../Images/Icons/icon-remove.svg'
import iconEdit from '../../../Images/Icons/icon-edit.svg'
import iconDetail from '../../../Images/Icons/icon-detail.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAlert, setAlert } from '../../../Redux/AlertSlice.js'
import { setProducts } from '../../../Redux/ProductsSlice.js'
import { axiosInstance } from '../../../Axios/Axios.js'
import { getUserLoggedIn } from '../../../Utils/Utils.js'

const UserList = () => {
	const products = useSelector(state=>state.products.products)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	useEffect(()=>{getProducts()},[])
	
	const getProducts = async () => {
		try {
			setLoading(true)
			dispatch(setProducts([]))
			const user = getUserLoggedIn()
			const response = await axiosInstance.get("/api/Products", { headers: { Authorization: `Bearer ${user.token}` } })
			dispatch(setProducts(response.data))
			console.log(response.data)
		} catch (error) {
			dispatch(setAlert({ type: "danger", message: "No fue posible cargar los datos" }))
		} finally {
			setLoading(false)
		}
	}
	

	return (
		<div className='w-100 overflow-auto' style={{ display: 'flex', height: '85%', justifyContent: 'center' }}>
			<div style={{ width: '80%', marginTop: '50px' }}>
				<table className="table table-borderless " >
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nombre</th>
							<th scope="col">Categoría</th>
							<th scope="col">Precio</th>
							<th scope="col">En Stock</th>
							<th scope="col">Opciones</th>
						</tr>
					</thead>
					<tbody >
						{
							products.map((product, index) =>
								<tr key={index} >
									<th scope="row">{index}</th>
									<td>{product.name}</td>
									<td>{product.category}</td>
									<td>${product.price}</td>
									<td>{product.on_stock ? 'Sí' : 'No'}</td>
									<td>
										<div style={{ display: 'flex' }}>
											<div className='btn btn-outline-light' style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src={iconRemove} /></div>
											<div className='btn btn-outline-light' onClick={() => navigate('/admin/products/update')} style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconEdit} /></div>
											<div className='btn btn-outline-light' onClick={() => navigate('/admin/products/detail')} style={{ borderRadius: '50%', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconDetail} /></div>
										</div>
									</td>
								</tr>
							)
						}
					</tbody>
				</table>
				{/*Modal */}
				<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="staticBackdropLabel">Eliminar Producto</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className='w-100' style={{ display: 'flex', justifyContent: 'center' }}>
								<div className='w-75'> Está a punto de eliminar un producto, ¿está seguro que desea hacerlo?</div>
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
		</div>
	)
}

export default UserList
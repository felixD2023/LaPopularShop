import React, { useEffect, useState } from 'react'
import iconRemove from '../../../Images/Icons/icon-remove.svg'
import iconEdit from '../../../Images/Icons/icon-edit.svg'
import iconDetail from '../../../Images/Icons/icon-detail.svg'
import { useNavigate } from 'react-router-dom'
import { setBuys } from '../../../Redux/BuysSlice'
import { setAlert, clearAlert } from '../../../Redux/AlertSlice'
import { useSelector, useDispatch } from 'react-redux'
import { axiosInstance } from '../../../Axios/Axios'
import { getUserLoggedIn } from '../../../Utils/Utils'


const BuyList = () => {
	const buys = useSelector(state => state.buys.buys)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading,setLoading] = useState()
	
	useEffect(() => {
		getBuys()
	}, [])

	const getBuys = async () => {
		try {
			setLoading(true)
			dispatch(clearAlert())
			const user = getUserLoggedIn()
			const response = await axiosInstance.get("/api/Buys", { headers: { Authorization: `Bearer ${user.token}` } })
			dispatch(setBuys(response.data))
		} catch (error) {
			console.log(error)
			dispatch(setAlert({ type: "danger", message: "No fue posible cargar los datos" }))
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className='w-100 overflow-auto' style={{ display: 'flex', height: '85%', justifyContent: 'center' }}>
				<div style={{ width: '90%', marginTop: '50px' }}>
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">ID</th>
								<th scope="col">Cliente</th>
								<th scope="col">Estado</th>
								<th scope="col">Total</th>
								<th scope="col">Opciones</th>
							</tr>
						</thead>
						<tbody >
							{
								buys.map((buy, index) =>
									<tr key={index}>
										<th scope="row">{index}</th>
										<td>{buy.id}</td>
										<td>{buy.user.firstName}</td>
										<td>{buy.status}</td>
										<td>${buy.totalValue}</td>
										<td>
											<div style={{ display: 'flex', width: '10px' }}>
												<div className='btn btn-outline-light' style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src={iconRemove} /></div>
												<div className='btn btn-outline-light' onClick={() => navigate('/admin/buys/update')} style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconEdit} /></div>
												<div className='btn btn-outline-light' onClick={() => navigate('/admin/buys/detail')} style={{ borderRadius: '50%', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconDetail} /></div>
											</div>
										</td>
									</tr>
								)
							}
						</tbody>
					</table>
				</div>

			</div >
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
		</>
	)
}

export default BuyList
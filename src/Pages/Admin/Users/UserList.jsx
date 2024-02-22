import React from 'react'
import usersData from './users.json'
import iconRemove from '../../../Images/Icons/icon-remove.svg'
import iconEdit from '../../../Images/Icons/icon-edit.svg'
import iconDetail from '../../../Images/Icons/icon-detail.svg'
import { useNavigate } from 'react-router-dom'


const UserList = () => {

	const navigate = useNavigate()

	return (
		<div className='w-100 overflow-auto' style={{ display: 'flex', height: '85%', justifyContent: 'center' }}>
			<div style={{ width: '80%', marginTop: '50px' }}>
				<table className="table table-borderless  " >
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nombre(s)</th>
							<th scope="col">Apellidos</th>
							<th scope="col">CI</th>
							<th scope="col">Admin.</th>
							<th scope="col">Opciones</th>
						</tr>
					</thead>
					<tbody >
						{
							usersData.map((user, index) =>
								<tr key={index} >
									<th scope="row">{index}</th>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.ID}</td>
									<td>{user.is_admin ? 'Sí' : 'No'}</td>
									<td>
										<div style={{ display: 'flex' }}>
											<div className='btn btn-outline-light' style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src={iconRemove} /></div>
											<div className='btn btn-outline-light' onClick={()=>navigate('/admin/users/update')} style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} ><img src={iconEdit} /></div>
											<div className='btn btn-outline-light' onClick={()=>navigate('/admin/users/detail')} style={{ borderRadius: '50%', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconDetail} /></div>
										</div>
									</td>
								</tr>
							)
						}
					</tbody>
				</table>
				{/*Modal */}
				<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Usuario</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className='w-100' style={{ display: 'flex', justifyContent: 'center' }}>
								<div className='w-75'> Está a punto de eliminar un usuario, ¿está seguro que desea hacerlo?</div>
							</div>
							<div class="modal-body">
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-danger">Eliminar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserList
import React from 'react'
import usersData from './users.json'
import iconRemove from '../../../Images/Icons/icon-remove.svg'
import iconEdit from '../../../Images/Icons/icon-edit.svg'

const UserList = () => {
	return (
		<div className='w-100 overflow-auto' style={{ display: 'flex', height:'85%',justifyContent: 'center' }}>
			<div style={{ width: '80%', marginTop: '50px'}}>
				<table class="table table-borderless table-hover " >
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
								<tr style={{cursor:'pointer'}}>
									<th scope="row">{index}</th>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.ID}</td>
									<td>{user.is_admin ? 'Sí' : 'No'}</td>
									<td>
										<td><div style={{marginRight:'10px',width:'25px',height:'25px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}><img src={iconRemove} /></div></td>
										<td><div style={{width:'25px',height:'25px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}><img src={iconEdit} /></div></td></td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UserList
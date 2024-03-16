import React, { useEffect, useState } from 'react'
import usersData from './users.json'
import iconRemove from '../../../Images/Icons/icon-remove.svg'
import iconEdit from '../../../Images/Icons/icon-edit.svg'
import iconDetail from '../../../Images/Icons/icon-detail.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers,deleteUser } from '../../../Redux/UsersSlice'
import { setAlert, clearAlert } from '../../../Redux/AlertSlice'
import { axiosInstance } from '../../../Axios/Axios'
import { getUserLoggedIn, numberList} from "../../../Utils/Utils"

const UserList = () => {
	const usersList = useSelector((state) => state.users.users)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [userToDelete,setUserToDelete] = useState("")

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = async () => {
		try {
			setLoading(true)
			dispatch(clearAlert())
			dispatch(setUsers([]))
			const user = getUserLoggedIn()
			const response = await axiosInstance.get("/api/Users", { headers: { Authorization: `Bearer ${user.token}` } })
			dispatch(setUsers(response.data))
		} catch (error) {
			dispatch(setAlert({ type: "danger", message: "No fue posible cargar los datos" }))
		} finally {
			setLoading(false)
		}
	}

	const deleteAnUser = async () =>{
		try{
			const user=getUserLoggedIn()
			const response = await axiosInstance.delete(`/api/Users/${userToDelete}`, { headers: { Authorization: `Bearer ${user.token}` } })
			dispatch(deleteUser(userToDelete))
			dispatch(setAlert({type:"primary",message:"Usuario eliminado exitosamente"}))
		}catch(error){
			dispatch(setAlert({type:"danger",message:"No fue posible eliminar el usuario"}))
			console.log(error)
		}

	}

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
							//loading
							loading
								? numberList.map(n =>
									<tr key={n}>
										<th scope="row"><p className="placeholder-glow" ><span className="placeholder col-12" style={{ borderRadius: "2em" }}></span></p></th>
										<td><p className="placeholder-glow"><span className="placeholder col-12" style={{ borderRadius: "2em" }}></span></p></td>
										<td><p className="placeholder-glow"><span className="placeholder col-12" style={{ borderRadius: "2em" }}></span></p></td>
										<td><p className="placeholder-glow"><span className="placeholder col-12" style={{ borderRadius: "2em" }}></span></p></td>
										<td><p className="placeholder-glow"><span className="placeholder col-12" style={{ borderRadius: "2em" }}></span></p></td>
										<td>
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<div className="spinner-grow text-danger" style={{ width: "22px", height: "22px", marginRight: "10px" }} role="status"><span className="visually-hidden" ></span></div>
												<div className="spinner-grow text-dark" style={{ width: "22px", height: "22px", marginRight: "10px" }} role="status"><span className="visually-hidden" ></span></div>
												<div className="spinner-grow text-primary" style={{ width: "22px", height: "22px" }} role="status"><span className="visually-hidden" ></span></div>
											</div>
										</td>
									</tr>
								)
								//With data
								: usersList.map((user, index) =>
									<tr key={index} >
										<th scope="row">{index}</th>
										<td>{user.firstName}</td>
										<td>{user.lastName}</td>
										<td>{user.ci}</td>
										<td>{user.isAdmin ? 'Sí' : 'No'}</td>
										<td>
											<div style={{ display: 'flex' }}>
												<div className='btn btn-outline-light' onClick={() => setUserToDelete(user.ci) } style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src={iconRemove} /></div>
												<div className='btn btn-outline-light' onClick={() => navigate('/admin/users/update')} style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} ><img src={iconEdit} /></div>
												<div className='btn btn-outline-light' onClick={() => navigate('/admin/users/detail')} style={{ borderRadius: '50%', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconDetail} /></div>
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
								<h1 className="modal-title fs-5" id="staticBackdropLabel">Eliminar Usuario</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className='w-100' style={{ display: 'flex', justifyContent: 'center' }}>
								<div className='w-75'> Está a punto de eliminar un usuario, ¿está seguro que desea hacerlo?</div>
							</div>
							<div className="modal-body">
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" onClick={()=>deleteAnUser()} className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Eliminar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserList
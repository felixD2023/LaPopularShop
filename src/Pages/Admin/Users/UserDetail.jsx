import React, { useEffect, useState } from 'react'
import usersData from './users.json'
import 'bootstrap/js/dist/modal'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setAlert } from '../../../Redux/AlertSlice'
import { axiosInstance } from '../../../Axios/Axios'
import { getUserLoggedIn, isLastCharANumber } from '../../../Utils/Utils'
import { deleteUser } from '../../../Redux/UsersSlice'

const UserDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.users.users)
  const { userCI } = useParams()

  const [userName, setUserName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [ci, setCi] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  
  const [searchLoading,setSearchLoading] = useState(false)
  const [ciSearch, setCiSearch] = useState("")
  const [firstNameSearch, setFirstNameSearch] = useState("")
  const [lastNameSearch, setLastNameSearch] = useState("")
  const [usersSearched, setUserSearched] = useState([])
  

  useEffect(() => {
    if (userCI) {
      const user = usersList.find(u => u.ci == userCI)
      if (user) {
        setCi(user.ci)
        setAddress(user.address)
        setEmail(user.email)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setPhone(user.phone)
        setIsAdmin(user.isAdmin)
        setUserName(user.username)
      } else {
        navigate('/admin/users/detail')
      }
    }
  }, [])

  const searchUsers = async () => {
    //validate data
    setSearchLoading(true)
    if (ciSearch === '' && firstNameSearch === '' && lastNameSearch === '') {
      dispatch(setAlert({ type: 'danger', message: 'Debe rellenar al menos un campo' }))
    }
    try{
      const data = {
        "ci": ciSearch,
        "firstName": firstNameSearch,
        "lastName": lastNameSearch
      }
      const response = await axiosInstance.post('/api/Users/Search',data,{headers:{Authorization:`Bearer ${getUserLoggedIn().token}`}})

      setUserSearched(response.data)
      if( response.data.length===0){
        dispatch(setAlert({type:'warning',message:'No se encontraron coincidencias'}))
      }else{
        dispatch(setAlert({type:'primary',message:`Se encontraron ${response.data.length} coincidencias `}))
      }
    }catch(error){
      dispatch(setAlert({type:'danger',message:'Ocurrió un error al buscar'}))
    }

    setSearchLoading(false)
  }

  const setData=(us)=>{
    console.log(us)
    setUserName(us.username)
    setFirstName(us.firstName)
    setLastName(us.lastName)
    setPhone(us.phone)
    setCi(us.ci)
    setIsAdmin(us.isAdmin)
    setAddress(us.address)
    setEmail(us.email)
  }

  const deleteAnUser = async (userCI) =>{
		try{
			const user=getUserLoggedIn()
			const response = await axiosInstance.delete(`/api/Users/${userCI}`, { headers: { Authorization: `Bearer ${user.token}` } })
			dispatch(deleteUser(userCI))
			dispatch(setAlert({type:"primary",message:"Usuario eliminado exitosamente"}))
      
		}catch(error){
			dispatch(setAlert({type:"danger",message:"No fue posible eliminar el usuario"}))
		}

	}

  return (
    <div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
      {/*Search Section*/}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '4px', display: 'flex', width: '80%', height: '60px', justifyContent: 'space-around', alignItems: 'end' }}>
          <div className=''>
            <label htmlFor="SearchByCI" className="form-label" style={{ fontSize: '13px' }}>Buscar por CI</label>
            <input value={ciSearch} onChange={(e) => (e.target.value.length <= 11 && (e.target.value === '' || isLastCharANumber(e.target.value))) ? setCiSearch(e.target.value) : null} type="text" className="form-control form-control-sm " id="SearchByCI" placeholder="CI" />
          </div>
          <div className=''>
            <label htmlFor="SearchByFirstName" className="form-label" style={{ fontSize: '13px' }}>Buscar por Nombre(s)</label>
            <input value={firstNameSearch} onChange={(e) => setFirstNameSearch(e.target.value)} type="text" className="form-control form-control-sm " id="SearchByFirstName" placeholder="Nombre(s)" />
          </div>
          <div className=''>
            <label htmlFor="SearchByLastName" className="form-label" style={{ fontSize: '13px' }}>Buscar por Apellido(s)</label>
            <input value={lastNameSearch} onChange={(e) => setLastNameSearch(e.target.value)} type="text" autoComplete='none' className="form-control form-control-sm " id="SearchByLastName" placeholder="Apellido(s)" />
          </div>
          <button disabled={searchLoading} onClick={() => searchUsers()} type="button" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '2em', height: '35px', maxWidth: '150px', marginLeft: '5px' }}>
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
          {usersSearched.map(us =>
            <li key={us.ci} className="list-group-item " onClick={() => setData(us)}><div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}><div>{us.username}</div><div>{us.firstName}&nbsp;{us.lastName}</div><div>{us.ci}</div> <div>{us.isAdmin ? "Administrador" : 'Cliente'}</div> </div></li>
          )}


        </ul>

        <div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />
      </div>


      {/*Detail Section */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Nombre de Usuario: </span>{userName}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Nombre(s): </span>{firstName}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Teléfono: </span>{phone}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>CI: </span>{ci}</div>
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="mb-3">
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>¿ Es administrador ?: </span>{isAdmin ? 'Sí' : 'No'}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Apellidos: </span>{lastName}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Dirección: </span>{address}</div>
        </div>

        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Correo: </span>{email}</div>
        </div>

        <div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
          <input className='btn btn-success' onClick={() => navigate('/admin/users/update/'+ci)} value={'Editar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
          <input disabled={!ci} className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" value={'Eliminar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
        </div>
      </div>

      {/*Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
              <button onClick={()=>{deleteAnUser(ci);navigate('/admin/users/list')}} type="button" data-bs-dismiss="modal" className="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}

export default UserDetail
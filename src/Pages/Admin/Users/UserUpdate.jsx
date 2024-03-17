import React, { useEffect, useState } from 'react'
import usersData from './users.json'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLoggedIn, isLastCharANumber, isLastCharASpace, onlyNumbers } from '../../../Utils/Utils'
import { setAlert } from '../../../Redux/AlertSlice'
import { axiosInstance } from '../../../Axios/Axios'

const UserUpdate = () => {
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.users.users)
  const { userCI } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
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

  const [userNameError, setUserNameError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [emailError, setEmailError] = useState("")

  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

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
        navigate('/admin/users/update')
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
      console.log(error)
      dispatch(setAlert({type:'danger',message:'Ocurrió un error al buscar'}))
    }

    setSearchLoading(false)
  }

  const updateUser = async () => {
    setLoading(true)
    resetErrors()
    //data validation
    let errors = false;
    if (userName.length === 0 || firstName.length === 0 || lastName.length === 0 || phone.length === 0 || ci.length === 0 || address.length === 0 || email.length === 0) {
      errors = true
      dispatch(setAlert({ type: 'danger', message: 'Todos los campos son obligatorios' }))
      if (userName.length === 0) { setUserNameError(true) }
      if (firstName.length === 0) { setFirstNameError(true) }
      if (lastName.length === 0) { setLastNameError(true) }
      if (phone.length === 0) { setPhoneError(true) }
      if (address.length === 0) { setAddressError(true) }
      if (email.length === 0) { setEmailError(true) }
    }
    if (!errors && !validEmail.test(email)) {
      errors = true
      setEmailError(true)
      dispatch(setAlert({ type: 'danger', message: 'El email introducido no es válido' }))
    }
    if (!errors && (!onlyNumbers(phone) || phone.length < 8)) {
      errors = true
      setPhoneError(true)
      dispatch(setAlert({ type: "danger", message: "El teléfono introducido no es válido" }))
    }
    //request and response
    if (!errors) {
      try {
        const data = {
          "ci": ci,
          "firstName": firstName,
          "lastName": lastName,
          "username": userName,
          "address": address,
          "phone": phone,
          "email": email,
          "isAdmin": isAdmin,
        }


        const response = await axiosInstance.put('/api/Users/' + data.ci, data, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })


        dispatch(setAlert({ type: "primary", message: "Usuario modificado correctamente" }))
      } catch (error) {
        console.log(error)
        dispatch(setAlert({ type: "danger", message: "No fue posible modificar el usuario" }))
      }
    }
    setLoading(false)
  }
  const resetErrors = () => {
    setUserNameError(false)
    setAddressError(false)
    setEmailError(false)
    setFirstNameError(false)
    setLastNameError(false)
    setPhoneError(false)
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
          <button disabled={searchLoading} onClick={() => searchUsers()} type="button" className="btn btn-primary" style={{ display:'flex',alignItems:'center',justifyContent:'space-evenly',borderRadius: '2em', height: '35px', maxWidth: '150px',marginLeft:'5px' }}>
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
            <li key={us.ci} className="list-group-item " onClick={()=>setData(us)}><div  style={{display:'flex',justifyContent:'space-between',cursor:'pointer'}}><div>{us.username}</div><div>{us.firstName}&nbsp;{us.lastName}</div><div>{us.ci}</div> <div>{us.isAdmin?"Administrador":'Cliente'}</div> </div></li>
          )}


        </ul>

        <div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />
      </div>

      {/*Update section */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <label htmlFor="Username" className="form-label">Nombre de Usuario</label>
          <input onChange={(e) => !isLastCharASpace(e.target.value) ? setUserName(e.target.value) : null} autoComplete='none' type="text" value={userName} className={`form-control ${userNameError ? 'is-invalid' : ''}`} id="Username" placeholder="Nombre de Usuario" />
        </div>
        <div className='mb-3'>
          <label htmlFor="FirstName" className="form-label">Nombre(s)</label>
          <input autoComplete='none' onChange={(e) => setFirstName(e.target.value)} type="text" value={firstName} className={`form-control ${firstNameError ? 'is-invalid' : ''}`} id="FirstName" placeholder="Nombre(s)" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Phone" className="form-label">Teléfono</label>
          <input autoComplete='none' onChange={(e) => { (e.target.value === '' || isLastCharANumber(e.target.value)) && e.target.value.length <= 8 ? setPhone(e.target.value) : null }} className={`form-control ${phoneError ? 'is-invalid' : ''}`} type="text" value={phone} id="Phone" placeholder="Teléfono" />
        </div>
        <div className='mb-3'>
          <label htmlFor="ID" className="form-label">CI</label>
          <input autoComplete='none' type="text" className={`form-control`} disabled value={ci} id="ID" placeholder="CI" />
        </div>


      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="mb-1 form-check" style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
          <input className="form-check-input" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} type="checkbox" value="" id="Is_Admin" />
          <label className="form-check-label" htmlFor="Is_Admin">Administrador</label>
        </div>

        <div className='mb-3'>
          <label htmlFor="LastName" className="form-label">Apellidos</label>
          <input autoComplete='none' onChange={(e) => setLastName(e.target.value)} type="text" value={lastName} className={`form-control ${lastNameError ? 'is-invalid' : ''}`} id="LastName" placeholder="Apellidos" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Address" className="form-label">Dirección</label>
          <input autoComplete='none' onChange={(e) => setAddress(e.target.value)} type="text" value={address} className={`form-control ${addressError ? 'is-invalid' : ''}`} id="Address" placeholder="Dirección" />
        </div>

        <div className='mb-3'>
          <label htmlFor="email" className="form-label">Correo</label>
          <input autoComplete='none' onChange={(e) => setEmail(e.target.value)} type="text" value={email} className={`form-control ${emailError ? 'is-invalid' : ''}`} id="email" placeholder="Correo" />
        </div>


      </div>
      <div style={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
        <div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
          <button disabled={loading} onClick={() => updateUser()} type="button" className="btn btn-success" style={{ borderRadius: '2em', height: '40px', marginRight: '10px', width: '150px' }}>
            {
              loading
                ? <>
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                  <span role="status">&nbsp;&nbsp;Loading...</span>
                </>
                : <span>Guardar</span>
            }
          </button>
          <input onClick={() => navigate('/admin/users/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
        </div>

      </div>
    </div>
  )
}

export default UserUpdate
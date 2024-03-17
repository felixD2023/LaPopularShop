import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../Components/Alert'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../../Redux/AlertSlice'
import { axiosInstance } from '../../../Axios/Axios'
import { isLastCharANumber, isLastCharASpace, onlyNumbers,getUserLoggedIn } from '../../../Utils/Utils'

const UserInsert = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [ci, setCi] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")

  const [userNameError, setUserNameError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [ciError, setCiError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [emailError, setEmailError] = useState("")

  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  const resetErrors=()=>{
    setUserNameError(false)
    setAddressError(false)
    setCiError(false)
    setEmailError(false)
    setFirstNameError(false)
    setLastNameError(false)
    setPasswordError(false)
    setPhoneError(false)
  }

  const insertUser = async () => {
    setLoading(true)
    
    resetErrors()
    //data validation
    let errors = false;
    if (userName.length === 0 || firstName.length === 0 || lastName.length === 0 || phone.length === 0 || ci.length === 0 || password.length === 0 || address.length === 0 || email.length === 0) {
      errors = true
      dispatch(setAlert({ type: 'danger', message: 'Todos los campos son obligatorios' }))
      if (userName.length === 0) { setUserNameError(true) }
      if (firstName.length === 0) { setFirstNameError(true) }
      if (lastName.length === 0) { setLastNameError(true) }
      if (phone.length === 0) { setPhoneError(true) }
      if (ci.length === 0) { setCiError(true) }
      if (password.length === 0) { setPasswordError(true) }
      if (address.length === 0) { setAddressError(true) }
      if (email.length === 0) { setEmailError(true) }
    }
    if (!errors && !validEmail.test(email)) {
      errors = true
      setEmailError(true)
      dispatch(setAlert({ type: 'danger', message: 'El email introducido no es válido' }))
    }
    if (!errors && !onlyNumbers(ci)) {
      errors = true
      setCiError(true)
      dispatch(setAlert({ type: "danger", message: "El CI introducido no es válido" }))
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
          "password": password,
          "username": userName,
          "address": address,
          "phone": phone,
          "email": email,
          "isAdmin": isAdmin
        }
        const response = await axiosInstance.post('/api/Users',data,{headers:{Authorization:`Bearer ${getUserLoggedIn().token}`}})
        
        dispatch(setAlert({type:"primary",message:"Usuario creado correctamente"}))
      } catch (error) {
        dispatch(setAlert({type:"danger",message:"No fue posible crear el usuario"}))
      } 
    }




    setLoading(false)
  }




  return (
    <div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <label htmlFor="Username" className="form-label">Nombre de Usuario</label>
          <input value={userName} onChange={(e) => !isLastCharASpace(e.target.value) ? setUserName(e.target.value) : null} autoComplete='none' type="text" className={`form-control ${userNameError ? 'is-invalid' : ''}`} id="Username" placeholder="Nombre de Usuario" />
        </div>
        <div className='mb-3'>
          <label htmlFor="FirstName" className="form-label">Nombre(s)</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete='none' type="text" className={`form-control ${firstNameError ? 'is-invalid' : ''}`} id="FirstName" placeholder="Nombre(s)" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Phone" className="form-label">Teléfono</label>
          <input value={phone} onChange={(e) => { (e.target.value === '' || isLastCharANumber(e.target.value)) && e.target.value.length <= 8 ? setPhone(e.target.value) : null }} autoComplete='none' type="text" className={`form-control ${phoneError ? 'is-invalid' : ''}`} id="Phone" placeholder="Teléfono" />
        </div>
        <div className='mb-3'>
          <label htmlFor="CI" className="form-label">CI</label>
          <input value={ci} onChange={(e) => (e.target.value.length <= 11 && (e.target.value === '' || isLastCharANumber(e.target.value))) ? setCi(e.target.value) : null} autoComplete='none' type="text" className={`form-control ${ciError ? 'is-invalid' : ''}`} id="CI" placeholder="CI" />
        </div>
        <div class="form-check">
          <input checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} autoComplete='none' className="form-check-input" type="checkbox" value="" id="Is_Admin" />
          <label class="form-check-label" htmlFor="Is_Admin">Administrador</label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column',width:'220px' }}>
        <div className='mb-3'>
          <label htmlFor="Password" className="form-label">Contraseña</label>
          <input value={password} onChange={(e) => !isLastCharASpace(e.target.value) ? setPassword(e.target.value) : null} autoComplete='none' type="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} id="Password" placeholder="Contraseña" />
        </div>

        <div className='mb-3'>
          <label htmlFor="LastName" className="form-label">Apellidos</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete='none' type="text" className={`form-control ${lastNameError ? 'is-invalid' : ''}`} id="LastName" placeholder="Apellidos" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Address" className="form-label">Dirección</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} autoComplete='none' type="text" className={`form-control ${addressError ? 'is-invalid' : ''}`} id="Address" placeholder="Dirección" />
        </div>

        <div className='mb-3'>
          <label htmlFor="email" className="form-label">Correo</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='none' type="text" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="email" placeholder="Correo" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button disabled={loading} onClick={() => insertUser()} type="button" className="btn btn-success" style={{ borderRadius: '2em',marginRight:'10px',width:'150px' }}>
            {
              loading
                ? <>
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                  <span role="status">&nbsp;&nbsp;Loading...</span>
                </>
                : <span>Insertar</span>
            }
          </button>
          <input onClick={() => navigate('/admin/users/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
        </div>
      </div>
    </div>
  )
}

export default UserInsert
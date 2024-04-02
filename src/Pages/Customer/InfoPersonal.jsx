import React, { useEffect, useState } from 'react'
import usersData from '../Admin/Users/users.json'

import { datosPersonales } from "./datosPersonales"
import { useNavigate } from 'react-router-dom'
import { getUserLoggedIn, isLastCharANumber } from '../../Utils/Utils'
import { useDispatch } from 'react-redux'
import { axiosInstance } from '../../Axios/Axios'
import { setAlert } from '../../Redux/AlertSlice'

const InfoPersonal = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState({
    "ci": "",
    "firstName": "",
    "lastName": "",
    "username": "",
    "address": "",
    "phone": 0,
    "email": "",
    "isAdmin": false,
    "isActive": true
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  const [userNameError, setUserNameError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  useEffect(() => { getDatos() }, [])

  const getDatos = async () => {
    try {
      const response = await axiosInstance.get("/api/Users/MyPersonalInfo", { headers: { Authorization: "Bearer " + getUserLoggedIn().token } })
      setUser(response.data)

    } catch (error) {
      console.log(error)
    }
  }


  const updateUser = async () => {
    setLoading(true)
    let errors = false

    if (user.firstName === "" || user.lastName === "" || user.username === "" || user.address === "" || user.phone === "" || user.email === "") {
      errors = true
      dispatch(setAlert({ type: "danger", message: "No puede haber campos vacíos" }))
      if (user.firstName === "") { setFirstNameError(true) }
      if (user.lastName === "") { setLastNameError(true) }
      if (user.username === "") { setUserNameError(true) }
      if (user.address === "") { setAddressError(true) }
      if (user.phone === "") { setPhoneError(true) }
      if (user.email === "") { setEmailError(true) }
    }
    if (!errors && !Number(user.phone)) {
      errors = true
      setPhoneError(true)
      dispatch(setAlert({ type: "danger", message: "Introduce un número válido" }))
    }

    if (!errors && !validEmail.test(user.email)) {
      setEmailError(true)
      errors = true
      dispatch(setAlert({ type: "danger", message: "Introduce un email válido" }))
    }


    if (!errors) {
      try {
        const data = {
          "firstName": user.firstName,
          "lastName": user.lastName,
          "username": user.username,
          "password": user.password,
          "address": user.address,
          "phone": Number(user.phone),
          "email": user.email
        }
        const response = await axiosInstance.put("/api/Users/MyPersonalInfo", data, { headers: { Authorization: "Bearer " + getUserLoggedIn().token } })

      } catch (error) {
        console.log(error)
        dispatch(setAlert({ type: "danger", message: "No se pudo actualizar" }))
      }
    }
    setLoading(false)
  }


  return (


    <>
      <div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='mb-3'>
            <label htmlFor="Username" class="form-label">Nombre de Usuario</label>
            <input autoComplete='none' type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className={`form-control ${userNameError? 'is-invalid' : ''}`} id="Username" placeholder="Nombre de Usuario" />
          </div>
          <div className='mb-3'>
            <label htmlFor="FirstName" class="form-label">Nombre(s)</label>
            <input autoComplete='none' type="text" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} className={`form-control ${firstNameError ? 'is-invalid' : ''}`} id="FirstName" placeholder="Nombre(s)" />
          </div>
          <div className='mb-3'>
            <label htmlFor="Phone" class="form-label">Teléfono</label>
            <input autoComplete='none' type="text" value={user.phone} onChange={(e) => isLastCharANumber(e.target.value) || e.target.value === "" ? setUser({ ...user, phone: e.target.value }) : null} className={`form-control ${phoneError ? 'is-invalid' : ''}`} id="Phone" placeholder="Teléfono" />
          </div>
          <div className='mb-3'>
            <label htmlFor="ID" class="form-label">CI</label>
            <input autoComplete='none' type="text" value={user.ci} disabled className={`form-control`} id="ID" placeholder="CI" />
          </div>


        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>


          <div className='mb-3'>
            <label htmlFor="LastName" className="form-label">Apellidos</label>
            <input autoComplete='none' type="text" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} className={`form-control ${lastNameError ? 'is-invalid' : ''}`} id="LastName" placeholder="Apellidos" />
          </div>
          <div className='mb-3'>
            <label htmlFor="Address" className="form-label">Dirección</label>
            <input autoComplete='none' type="text" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} className={`form-control ${addressError ? 'is-invalid' : ''}`} id="Address" placeholder="Dirección" />
          </div>

          <div className='mb-3'>
            <label htmlFor="email" className="form-label">Correo</label>
            <input autoComplete='none' type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className={`form-control ${emailError ? 'is-invalid' : ''}`} id="email" placeholder="Correo" />
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
            <input className='btn btn-danger' value={'Cancelar'} onClick={() => navigate("Stock")} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
          </div>

        </div>
      </div>


    </>
  )
}

export default InfoPersonal

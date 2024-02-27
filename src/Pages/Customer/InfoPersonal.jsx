import React, { useState } from 'react'
import usersData from '../Admin/Users/users.json'

import {datosPersonales} from "./datosPersonales"
import { useNavigate } from 'react-router-dom'

const InfoPersonal = () => {
    const [user, setUser] = useState(usersData[0])
    const navigate=useNavigate()
    
    return (

        <>
          <div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>



<div style={{ display: 'flex', flexDirection: 'column' }}>
  <div className='mb-3'>
    <label htmlFor="Username" class="form-label">Nombre de Usuario</label>
    <input autoComplete='none' type="text" value={user.username} class="form-control" id="Username" placeholder="Nombre de Usuario" />
  </div>
  <div className='mb-3'>
    <label htmlFor="FirstName" class="form-label">Nombre(s)</label>
    <input autoComplete='none' type="text" value={user.firstName} class="form-control" id="FirstName" placeholder="Nombre(s)" />
  </div>
  <div className='mb-3'>
    <label htmlFor="Phone" class="form-label">Teléfono</label>
    <input autoComplete='none' type="text" value={user.phone} class="form-control" id="Phone" placeholder="Teléfono" />
  </div>
  <div className='mb-3'>
    <label htmlFor="ID" class="form-label">CI</label>
    <input autoComplete='none' type="text" value={user.ID} class="form-control" id="ID" placeholder="CI" />
  </div>


</div>

<div style={{ display: 'flex', flexDirection: 'column' }}>
  <div class="mb-1 form-check" style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
    <input class="form-check-input" checked={user.is_admin} type="checkbox" value="" id="Is_Admin" />
    <label class="form-check-label" for="Is_Admin">Administrador</label>
  </div>

  <div className='mb-3'>
    <label htmlFor="LastName" class="form-label">Apellidos</label>
    <input autoComplete='none' type="text" value={user.lastName} class="form-control" id="LastName" placeholder="Apellidos" />
  </div>
  <div className='mb-3'>
    <label htmlFor="Address" class="form-label">Dirección</label>
    <input autoComplete='none' type="text" value={user.address} class="form-control" id="Address" placeholder="Dirección" />
  </div>

  <div className='mb-3'>
    <label htmlFor="email" class="form-label">Correo</label>
    <input autoComplete='none' type="text" value={user.email} class="form-control" id="email" placeholder="Correo" />
  </div>


</div>
<div style={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
  <div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
    <input className='btn btn-success' value={'Actualizar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
    <input className='btn btn-danger' value={'Cancelar'} onClick={()=> navigate("Stock")} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
  </div>

</div>
</div>


        </>
    )
}

export default InfoPersonal

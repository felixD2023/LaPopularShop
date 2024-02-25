import React, { useState } from 'react'
import usersData from './users.json'
import { useNavigate } from 'react-router-dom'

const UserUpdate = () => {
  const [user, setUser] = useState(usersData[0])
  const navigate = useNavigate()

  return (
    <div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>

     {/*Search Section*/}
     <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px', display: 'flex', width: '80%', height: '60px', justifyContent: 'space-around', alignItems: 'end' }}>
          <div className=''>
            <label htmlFor="SearchByCI" class="form-label" style={{ fontSize: '13px' }}>Buscar por CI</label>
            <input type="text" className="form-control form-control-sm " id="SearchByCI" placeholder="CI" />
          </div>
          <div className=''>
            <label htmlFor="SearchByFirstName" class="form-label" style={{ fontSize: '13px' }}>Buscar por Nombre(s)</label>
            <input type="text" className="form-control form-control-sm " id="SearchByFirstName" placeholder="Nombre(s)" />
          </div>
          <div className=''>
            <label htmlFor="SearchByLastName" class="form-label" style={{ fontSize: '13px' }}>Buscar por Apellido(s)</label>
            <input type="text" autoComplete='none' className="form-control form-control-sm " id="SearchByLastName" placeholder="Apellido(s)" />
          </div>
          <input className='btn btn-primary' value={'Buscar'} type='button' style={{ width: '80px', height: '40px', borderRadius: '2em' }} />
        </div>
        <div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />

      </div>

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
          <input onClick={() => navigate('/admin/users/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
        </div>

      </div>
    </div>
  )
}

export default UserUpdate
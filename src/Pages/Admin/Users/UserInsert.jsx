import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserInsert = () => {
  const navigate = useNavigate()

  return (
    <div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <label htmlFor="Username" className="form-label">Nombre de Usuario</label>
          <input autoComplete='none' type="text" className="form-control" id="Username" placeholder="Nombre de Usuario" />
        </div>
        <div className='mb-3'>
          <label htmlFor="FirstName" className="form-label">Nombre(s)</label>
          <input autoComplete='none' type="text" className="form-control" id="FirstName" placeholder="Nombre(s)" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Phone" className="form-label">Teléfono</label>
          <input autoComplete='none' type="text" className="form-control" id="Phone" placeholder="Teléfono" />
        </div>
        <div className='mb-3'>
          <label htmlFor="ID" className="form-label">CI</label>
          <input autoComplete='none' type="text" className="form-control" id="ID" placeholder="CI" />
        </div>

        <div class="form-check">
          <input autoComplete='none' className="form-check-input" type="checkbox" value="" id="Is_Admin" />
          <label class="form-check-label" htmlFor="Is_Admin">
            Administrador
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <label htmlFor="Password" className="form-label">Contraseña</label>
          <input autoComplete='none' type="password" class="form-control" id="Password" placeholder="Contraseña" />
        </div>

        <div className='mb-3'>
          <label htmlFor="LastName" className="form-label">Apellidos</label>
          <input autoComplete='none' type="text" class="form-control" id="LastName" placeholder="Apellidos" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Address" className="form-label">Dirección</label>
          <input autoComplete='none' type="text" class="form-control" id="Address" placeholder="Dirección" />
        </div>

        <div className='mb-3'>
          <label htmlFor="email" className="form-label">Correo</label>
          <input autoComplete='none' type="text" class="form-control" id="email" placeholder="Correo" />
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}}>
          <input className='btn btn-success' value={'Insertar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
          <input onClick={()=>navigate('/admin/users/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', borderRadius: '2em' }} />
        </div>
      </div>
    </div>
  )
}

export default UserInsert
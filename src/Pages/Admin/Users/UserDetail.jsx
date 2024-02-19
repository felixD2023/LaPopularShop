import React, { useState } from 'react'
import usersData from './users.json'


import 'bootstrap/js/dist/modal'

const UserDetail = () => {
  const [user, setUser] = useState(usersData[0])
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


      {/*Detail Section */}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Nombre de Usuario: </span>{user.username}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Nombre(s): </span>{user.firstName}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Teléfono: </span>{user.phone}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>CI: </span>{user.ID}</div>
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="mb-3">
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>¿ Es administrador ?: </span>{user.is_admin ? 'Sí' : 'No'}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Apellidos: </span>{user.lastName}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Dirección: </span>{user.address}</div>
        </div>

        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Correo: </span>{user.email}</div>
        </div>

      </div>
      <div style={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
        <div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
          <input className='btn btn-success' value={'Editar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
          <input className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" value={'Eliminar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
        </div>

      </div>


      {/*Modal */}
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
  )
}

export default UserDetail
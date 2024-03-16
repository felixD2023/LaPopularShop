import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserInsert = () => {
  const navigate = useNavigate()
  const [userName,setUserName] = useState("")
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [phone,setPhone] = useState("")
  const [ci,setCi] = useState("")
  const [isAdmin,setIsAdmin] = useState(false)
  const [password,setPassword] = useState("")
  const [address,setAddress] = useState("")
  const [email,setEmail] = useState("")




  return (
    <div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <label htmlFor="Username" className="form-label">Nombre de Usuario</label>
          <input value={userName} onChange={(e)=>setUserName(e.target.value)} autoComplete='none' type="text" className="form-control" id="Username" placeholder="Nombre de Usuario" />
        </div>
        <div className='mb-3'>
          <label htmlFor="FirstName" className="form-label">Nombre(s)</label>
          <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} autoComplete='none' type="text" className="form-control" id="FirstName" placeholder="Nombre(s)" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Phone" className="form-label">Teléfono</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} autoComplete='none' type="text" className="form-control" id="Phone" placeholder="Teléfono" />
        </div>
        <div className='mb-3'>
          <label htmlFor="ID" className="form-label">CI</label>
          <input value={ci} onChange={(e)=>setCi(e.target.value)} autoComplete='none' type="text" className="form-control" id="ID" placeholder="CI" />
        </div>
        <div class="form-check">
          <input checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)} autoComplete='none' className="form-check-input" type="checkbox" value="" id="Is_Admin" />
          <label  class="form-check-label" htmlFor="Is_Admin">Administrador</label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='mb-3'>
          <label htmlFor="Password" className="form-label">Contraseña</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='none' type="password" class="form-control" id="Password" placeholder="Contraseña" />
        </div>

        <div className='mb-3'>
          <label htmlFor="LastName" className="form-label">Apellidos</label>
          <input value={lastName} onChange={(e)=>setLastName(e.target.value)} autoComplete='none' type="text" class="form-control" id="LastName" placeholder="Apellidos" />
        </div>
        <div className='mb-3'>
          <label htmlFor="Address" className="form-label">Dirección</label>
          <input value={address} onChange={(e)=>setAddress(e.target.value)} autoComplete='none' type="text" class="form-control" id="Address" placeholder="Dirección" />
        </div>

        <div className='mb-3'>
          <label htmlFor="email" className="form-label">Correo</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete='none' type="text" class="form-control" id="email" placeholder="Correo" />
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
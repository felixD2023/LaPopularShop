import React from 'react'
import closeIcon from '../Images/Icons/close-icon.svg'
import { useDispatch } from 'react-redux'
import { clearAlert } from '../Redux/AlertSlice'
import "animate.css"

const Alert = ({ type, message,visible }) => {
  const dispatch = useDispatch()

  return (
    <div className='animate__animated animate__backInRight'  style={{ display:visible?"flex":"none" ,position: 'absolute', bottom: '100px', right: "20px" }}>
      <div className={`bg-${type} border-primary shadow`} style={{ display: 'flex', justifyContent: "space-evenly", alignItems: "center", color: "rgb(255,255,255)", border: "", width: "300px", height: '40px', borderRadius: '10px' }}>
        <div>
          {message}
        </div>
        <button onClick={()=>dispatch(clearAlert())} className={'btn btn-outline-'+type+" "}><img src={closeIcon}/></button>
      </div>
    </div>
  )
}

export default Alert
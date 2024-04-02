import React from 'react'
import { products } from "../Admin/Products/products"
import ComponenteProducto from './ComponenteProducto'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../Axios/Axios'
import { comprar} from '../../Redux/CartSlice'
import { useDispatch } from 'react-redux'
import { getUserLoggedIn } from '../../Utils/Utils'
import { setAlert } from '../../Redux/AlertSlice'


const Carrito = () => {

  const carrito=useSelector((state)=>state.cart)
  const dispatch=useDispatch()

  const insertarCompra=async()=>{
    let data=[]
    carrito.productos.forEach(p => {data=[...data,{ product:p.producto,quantity: p.cantidad}]});
    try {
      const response= await axiosInstance.post("/api/Buys/MyBuy",data,{headers:{Authorization:"Bearer "+getUserLoggedIn().token}})
      
       dispatch(comprar())
       dispatch(setAlert({type:'primary',message:'Compra realizada con éxito'}))
    } catch (error) {
      console.log(error)
      console.log(data)
    }

   

  }


  return (
    <div>
      <div style={{display:"flex",marginTop:"10px"}}>
    <button className='btn btn-success' onClick={()=>insertarCompra()}>Comprar</button>
    <div style={{marginLeft:"10px", marginTop:"10px"}}>Total: ${carrito.total.toFixed(2)}</div>
    </div>
    <div style={{marginTop:"40px"}}>
      {
        carrito.productos.map((producto)=> <ComponenteProducto key={producto.producto.name} producto={producto} ></ComponenteProducto>)
      }
       
      
    </div>
    </div>
  )
}

export default Carrito

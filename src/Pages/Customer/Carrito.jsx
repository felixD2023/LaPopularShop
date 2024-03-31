import React from 'react'
import { products } from "../Admin/Products/products"
import ComponenteProducto from './ComponenteProducto'
import { useSelector } from 'react-redux'


const Carrito = () => {

  const carrito=useSelector((state)=>state.cart)
 


  return (
    <div style={{marginTop:"40px"}}>
      {
        carrito.productos.map((producto)=> <ComponenteProducto key={producto.name} producto={producto} ></ComponenteProducto>)
      }
       
      
    </div>
  )
}

export default Carrito

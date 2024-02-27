import React from 'react'
import { products } from "../Admin/Products/products"
import ComponenteProducto from './ComponenteProducto'

const Carrito = () => {
  return (
    <div style={{marginTop:"40px"}}>
      {
        products.map((cursor)=> <ComponenteProducto key={cursor.name} nombre={cursor.name}imagen={cursor.img} categoria={cursor.category} precio={cursor.price} descripcion={cursor.description} ></ComponenteProducto>)
      }
       
      
    </div>
  )
}

export default Carrito

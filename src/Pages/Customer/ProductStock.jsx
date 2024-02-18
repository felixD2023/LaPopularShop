import React from 'react'
import {articulos} from './articulos'
import Componente from './Componente'

const ProductStock = () => {
    
  return (
    <div style={{display:"flex",flexWrap:"wrap",height:"60px",padding:"0px 15px",width:"90%",margin:"auto"}}>
        {
          articulos.map((cursor)=><Componente key={cursor.nombre} imagen={cursor.imagen} nombre={cursor.nombre} precio={cursor.precio}></Componente>)
        }
      
    </div>
  )
}

export default ProductStock

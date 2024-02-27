import React from 'react'
import iconCart from "../../Images/Icons/icon-cart-compras.svg"
import addCompras from "../../Images/Icons/add-compras.svg"
import iconSubstract from "../../Images/Icons/icon-substract.svg"

const ComponenteProducto = ({ imagen, nombre, categoria, precio, descripcion }) => {
    return (
        <div style={{ display: "flex", marginBottom: "30px", width: "750px" }}>
            <div style={{ padding: "0px 15px"}}>
                <img src={imagen} style={{ borderRadius: "20px", height: "140px" }}></img>
            </div>
            <div style={{ width: "300px" }}>
                <div>
                    <span className='h6'>Nombre: </span><span>{nombre}</span>
                </div>
                <div>
                    <span className='h6' >Categoria: </span><span>{categoria}</span>
                </div>
                <div >
                    <span className='h6'>Precio: $</span> <span>{precio}</span>
                </div>
                <div >
                    <span className='h6'>Descripcion:</span> <span>{descripcion}</span>
                </div>


            </div>
            <div >
                <button className='btn'>
                    <img src={iconCart}></img>
                </button>
                <button className='btn'>
                    <img src={addCompras}></img>
                </button>
                <button className='btn'>
                    <img src={iconSubstract}></img>
                </button>
            </div>

        </div>
    )
}

export default ComponenteProducto

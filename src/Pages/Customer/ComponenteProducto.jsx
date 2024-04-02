import React from 'react'
import iconCart from "../../Images/Icons/icon-cart-compras.svg"
import addCompras from "../../Images/Icons/add-compras.svg"
import iconSubstract from "../../Images/Icons/icon-substract.svg"
import { insertarProducto ,disminuirProducto,eliminarProducto} from '../../Redux/CartSlice'
import { useDispatch } from 'react-redux'


const ComponenteProducto = ({ producto }) => {

    const dispatch=useDispatch()
    
    return (
        <div style={{ display: "flex", marginBottom: "30px", width: "750px" }}>
            <div style={{ padding: "0px 15px"}}>
                <img src={producto.producto.image} style={{ borderRadius: "20px", height: "140px" }}></img>
            </div>
            <div style={{ width: "300px" }}>
                <div>
                    <span className='h6'>Nombre: </span><span>{producto.producto.name}</span>
                </div>
                <div>
                    <span className='h6' >Categoria: </span><span>{producto.producto.category}</span>
                </div>
                <div >
                    <span className='h6'>Precio: $</span> <span>{producto.producto.price}</span>
                </div>
                <div >
                    <span className='h6'>Descripcion:</span> <span>{producto.producto.description}</span>
                </div>
                <div >
                    <span className='h6'>Cantidad:</span> <span>{producto.cantidad}</span>
                </div>
                


            </div>
            <div >
                <button className='btn' onClick={()=>dispatch(eliminarProducto(producto))}>
                    <img src={iconCart}></img>
                </button>
                <button className='btn' onClick={()=>dispatch(insertarProducto(producto.producto))}>
                    <img src={addCompras}></img>
                </button>
                <button className='btn' onClick={()=>dispatch(disminuirProducto(producto.producto))}> 
                    <img src={iconSubstract}></img>
                </button>
            </div>

        </div>
    )
}

export default ComponenteProducto

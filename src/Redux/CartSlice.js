import { createSlice } from "@reduxjs/toolkit";

const initialState={productos:[],total:0}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        insertarProducto:(state,action)=>{
           const posicion=state.productos.findIndex((p)=>p.producto.id===action.payload.id)
           if(posicion!=-1)
           {
                state.productos[posicion].cantidad=state.productos[posicion].cantidad+1

           }
           else
           {
            state.productos=[{producto:action.payload,cantidad:1},...state.productos]
           }
           state.total=state.total+action.payload.price
           
            
        },
        disminuirProducto:(state,action)=>{
            const posicion=state.productos.findIndex((p)=>p.producto.id===action.payload.id)
            if(posicion!=-1 && state.productos[posicion].cantidad>1)
            {
                 state.productos[posicion].cantidad=state.productos[posicion].cantidad-1
 
            }
           
            state.total=state.total-action.payload.price
            
             
         },
         eliminarProducto:(state,action)=>{
            const listP= state.productos.filter((producto)=>producto.producto.id!==action.payload.producto.id)
            state.productos=[...listP]
            state.total=state.total-action.payload.producto.price*action.payload.cantidad
           
         },
         comprar:(state)=>{
            state.productos=[]
            state.total=0
         }


    }
})

export const {insertarProducto,disminuirProducto,eliminarProducto,comprar}=cartSlice.actions

export default cartSlice.reducer
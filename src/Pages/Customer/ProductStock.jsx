import React, { useEffect, useState } from 'react'
import {articulos} from './articulos'
import Componente from './Componente'
import { axiosInstance } from '../../Axios/Axios'
import {getUserLoggedIn} from "../../Utils/Utils"

const ProductStock = () => {

  const [listaProducto,setListaProducto]=useState([])


  useEffect(()=>{
    getProduct()
  },[])

  const getProduct=async()=>{
    try {
      const response= await axiosInstance.get("/api/Products/OnStock",{headers:{Authorization:"Bearer "+getUserLoggedIn().token}})
       setListaProducto(response.data)
    } catch (error) {
      console.log(error)
    }

  }
    
  return (
    <div style={{display:"flex",flexWrap:"wrap",height:"50px",padding:"0px 15px",width:"90%",margin:"auto",marginTop:"40px"}}>
        {
          listaProducto.map((producto)=><Componente key={producto.name} producto={producto}></Componente>)
        }
      
    </div>
  )
}

export default ProductStock

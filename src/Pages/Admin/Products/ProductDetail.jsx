import React, { useState } from 'react'
import productsData from './products.json'

const ProductDetail = () => {
    const [product, setProduct] = useState(productsData[0])

  return (
    <div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>

      {/*Search Section*/}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px', display: 'flex', width: '80%', height: '60px', justifyContent: 'space-around', alignItems: 'end' }}>
          <div className=''>
            <label htmlFor="SearchByID" className="form-label" style={{ fontSize: '13px' }}>Buscar por ID</label>
            <input type="text" className="form-control form-control-sm " id="SearchByID" placeholder="ID" />
          </div>
          <div className=''>
            <label htmlFor="SearchByName" className="form-label" style={{ fontSize: '13px' }}>Buscar por Nombre</label>
            <input type="text" className="form-control form-control-sm " id="SearchByName" placeholder="Nombre" />
          </div>
          <div className=''>
            <label htmlFor="SearchByCategory" className="form-label" style={{ fontSize: '13px' }}>Buscar por Categoría</label>
            <input type="text" autoComplete='none' className="form-control form-control-sm " id="SearchByCategory" placeholder="Categoría" />
          </div>
          <input className='btn btn-primary' value={'Buscar'} type='button' style={{ width: '80px', height: '40px', borderRadius: '2em' }} />
        </div>
        <div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />

      </div>


      {/*Detail Section */}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Nombre del Producto: </span>{product.name}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Precio: </span>{product.price}</div>
        </div>
        
        <div className="mb-3">
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>¿A la venta?: </span>{product.on_stock ? 'Sí' : 'No'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Categoría: </span>{product.category}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Descripción: </span>{product.description}</div>
        </div>


      </div>
      <div style={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
        <div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
          <input className='btn btn-success' value={'Editar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
          <input className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" value={'Eliminar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
        </div>

      </div>


      {/*Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Eliminar Producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='w-100' style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='w-75'> Está a punto de eliminar un producto, ¿está seguro que desea hacerlo?</div>
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetail
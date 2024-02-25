import React, { useState } from 'react'
import { buys,states } from './buys'
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';



const BuyUpdate = () => {
	const [buy, setBuy] = useState(buys[0])
	const navigate = useNavigate()

	const TotalPrice = () => {
		let sum = 0
		if (buy.products) {
			buy.products.forEach((product) => sum += product.price)
		}
		return sum;
	}
  return (
    <div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly',flexWrap:'wrap' }}>
			
			{/*Search Section*/}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px', display: 'flex', width: '80%', height: '60px', justifyContent: 'space-around', alignItems: 'end' }}>
          <div className=''>
            <label htmlFor="SearchByID" className="form-label" style={{ fontSize: '13px' }}>Buscar por ID</label>
            <input type="text" className="form-control form-control-sm " id="SearchByID" placeholder="ID" />
          </div>
          <div className=''>
            <label htmlFor="SearchByCustomer" className="form-label" style={{ fontSize: '13px' }}>Buscar por Cliente</label>
            <input type="text" className="form-control form-control-sm " id="SearchByCustomer" placeholder="Nombre del Cliente" />
          </div>
          <div className=''>
            <label htmlFor="SearchByDate" className="form-label" style={{ fontSize: '13px' }}>Buscar por Fecha</label>
            <input type="text" autoComplete='none' className="form-control form-control-sm " id="SearchByDate" placeholder="Fecha" />
          </div>
          <input className='btn btn-primary' value={'Buscar'} type='button' style={{ width: '80px', height: '40px', borderRadius: '2em' }} />
        </div>
        <div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />

      </div>


			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Cliente: </span> {buy.user.firstName}</div>
				</div>

				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Valor Total: </span> ${TotalPrice()}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Total de Productos: </span>{buy.products.length}</div>
				</div>
				<div className='mb-3'>
					<label htmlFor="User" className="form-label">Estado:</label>
					<select className="form-select" aria-label="Default select example">
						{
							states.map((state, index) =>
								<option key={index} value={index}>{state}</option>)
						}
					</select>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Hora: </span>{buy.hour}</div>
				</div>
				<div className='mb-3'>
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Fecha: </span>{buy.date}</div>
				</div>

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ border: '1px solid #dee2e6', overflow: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'start', height: '350px', width: '350px', borderRadius: '15px', marginBottom: '50px' }}>
					{buy.products.map((product, index) => <ProductItem key={index} height={'100px'} product={product} />)}

				</div>
				<div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
          <input className='btn btn-success' value={'Actualizar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
          <input onClick={() => navigate('/admin/buys/list')} className='btn btn-danger' value={'Cancelar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
        </div>
				
			</div>
		</div>
  )
}

export default BuyUpdate
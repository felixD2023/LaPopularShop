import React, { useEffect, useState } from 'react'
import { buys } from './buys'
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';


const BuyDetail = () => {
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
		<div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
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
					<div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Estado: </span>{buy.state}</div>
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


				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<input className='btn btn-success' onClick={() => navigate('/admin/buys/update')} value={'Editar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
					<input className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" value={'Eliminar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
				</div>
			</div>

			{/*Modal */}
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">Eliminar Compra</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className='w-100' style={{ display: 'flex', justifyContent: 'center' }}>
							<div className='w-75'> Está a punto de eliminar una compra, ¿está seguro que desea hacerlo?</div>
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

export default BuyDetail
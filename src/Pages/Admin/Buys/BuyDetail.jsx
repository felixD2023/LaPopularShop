import React, { useEffect, useState } from 'react'
import { buys } from './buys'
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';


const BuyDetail = () => {
	const [buy, setBuy] = useState(buys[0])
	const navigate = useNavigate()

	useEffect(() => {

	}, [buy])
	const TotalPrice = () => {
		let sum = 0
		if (buy.products) {
			buy.products.forEach((product) => sum += product.price)
		}
		return sum;
	}


	return (
		<div className='w-100 mt-5' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly' }}>
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

			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ border: '1px solid #dee2e6', overflow: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'start', height: '350px', width: '350px', borderRadius: '15px', marginBottom: '50px' }}>
					{buy.products.map((product, index) => <ProductItem key={index} height={'100px'} product={product} />)}

				</div>


				<div style={{ display: 'flex', justifyContent: 'end' }}>
					<input className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" value={'Eliminar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
				</div>
			</div>

			{/*Modal */}
			<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Compra</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className='w-100' style={{ display: 'flex', justifyContent: 'center' }}>
							<div className='w-75'> Está a punto de eliminar una compra, ¿está seguro que desea hacerlo?</div>
						</div>
						<div class="modal-body">
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
							<button type="button" class="btn btn-danger">Eliminar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BuyDetail
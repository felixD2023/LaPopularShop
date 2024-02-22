import React from 'react'
import iconRemove from '../../../Images/Icons/icon-remove.svg'
import iconEdit from '../../../Images/Icons/icon-edit.svg'
import iconDetail from '../../../Images/Icons/icon-detail.svg'
import {buys as buysData} from './buys'
import { useNavigate } from 'react-router-dom'

const BuyList = () => {
	const navigate = useNavigate()
	return (
		<div className='w-100 overflow-auto' style={{ display: 'flex', height: '85%', justifyContent: 'center' }}>
			<div style={{ width: '80%', marginTop: '50px' }}>
				<table class="table table-borderless " >
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">ID</th>
							<th scope="col">Cliente</th>
							<th scope="col">Cant. Prod.</th>
							<th scope="col">Total</th>
							<th scope="col">Opciones</th>
						</tr>
					</thead>
					<tbody >
						{
							buysData.map((buy, index) =>
								<tr key={index}>
									<th scope="row">{index}</th>
									<td>{buy.ID}</td>
									<td>{buy.user.firstName}</td>
									<td>{buy.products.length}</td>
									<td>${buy.totalValue}</td>
									<td>
										<td><div className='btn btn-outline-light' style={{ borderRadius: '50%', border: 'none', marginRight: '10px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconRemove} /></div></td>
										<td><div className='btn btn-outline-light' onClick={()=>navigate('/admin/buys/detail')} style={{ borderRadius: '50%', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><img src={iconDetail} /></div></td>
									</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default BuyList
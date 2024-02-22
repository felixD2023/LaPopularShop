import React from 'react'

const ProductItem = ({ product, height }) => {
	return (
		<div style={{ position: 'relative', margin: '10px 0px 0px 10px', height: height, borderRadius: '10px', overflow: 'hidden' }}>
			<img style={{ height: height, borderRadius: '10px' }} src={product.img} />
			<div style={{ position: 'absolute', top: '80px', backgroundColor: 'rgb(0,0,0,0.3)', height: '20px', width: '100%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>${product.price}</div>
		</div>
	)
}

export default ProductItem
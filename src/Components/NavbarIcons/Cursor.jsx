import React from 'react'

const Cursor = ({ activeLeft }) => {
	return (
		<>
			<div className='bg-success' style={{
				position: 'absolute', top: '19px',
				left: `${activeLeft + 100 - 45 / 2}px`, width: '45px', height: '45px',
				borderRadius: '50%', border: 'solid 5px white', zIndex: 2, transition: 'all 1s ease'
			}} />
			<div className='bg-light' style={{position:'absolute',
			left: `${(activeLeft + 100 - 45 / 2)-24/2}px`,top:"20px",transition: 'all 1s ease'
			,height:'20px',width:'20px'}}>
				<div className='bg-success' style={{width:'20px',height:'20px',
				borderRadius:'0px 0px 100px 0px'}}/>
			</div>
			<div className='bg-light' style={{position:'absolute',
			left: `${(activeLeft + 100)+30/2}px`,top:"20px",transition: 'all 1s ease'
			,height:'20px',width:'20px'}}>
				<div className='bg-success' style={{width:'20px',height:'20px',
				borderRadius:'0px 0px 0px 100px'}}/>
			</div>
		</>

	)
}

export default Cursor
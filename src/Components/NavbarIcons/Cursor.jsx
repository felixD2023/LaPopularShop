import React from 'react'

const Cursor = ({ activeLeft,activeWidth }) => {
	return (
		<div >
			<div className='bg-success' style={{
				position: 'absolute', top: '19px',
				left: `${activeLeft + activeWidth/2 - 45 / 2}px`, width: '45px', height: '45px',
				borderRadius: '50%', border: 'solid 5px white', zIndex: 2, transition: 'all 1s ease'
			}} />
			<div style={{position:'absolute',
			left: `${(activeLeft + activeWidth/2 - 45 / 2)-16/2}px`,top:"20px",transition: 'all 1s ease'
			,height:'20px',width:'10px',backgroundColor:"white"}}>
				<div className='bg-success' style={{width:'10px',height:'20px',
				borderRadius:'0px 0px 2emx 0px'}}/>
			</div>
			<div style={{position:'absolute',
			left: `${(activeLeft + activeWidth/2)+41/2}px`,top:"20px",transition: 'all 1s ease'
			,height:'20px',width:'10px',backgroundColor:"white"}}>
				<div className='bg-success' style={{width:'10px',height:'20px',
				borderRadius:'0px 0px 0px 2emx'}}/>
			</div>
		</div>

	)
}

export default Cursor
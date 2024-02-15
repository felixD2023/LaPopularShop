import React from 'react'


const NavBar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="nav-link" href="#">Productos en Stock</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="#">Carrito</a>
        <a className="nav-link" href="#">Info. Personal</a>
        <a className="nav-link" href="#">Mis Compras</a>
       
      </div>
    </div>
  </div>
</nav>
      
    </>
  )
}

export default NavBar

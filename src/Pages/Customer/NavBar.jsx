import React from 'react'



const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="">Productos en Stock</a>
              <a className="nav-link" aria-current="page" href="#">Carrito</a>
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

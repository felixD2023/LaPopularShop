import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../../Redux/AlertSlice.js'
import { axiosInstance } from '../../../Axios/Axios.js'
import { getUserLoggedIn } from '../../../Utils/Utils.js'
import { deleteProduct } from '../../../Redux/ProductsSlice.js'

const ProductDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { productId } = useParams()

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [onStock, setOnStock] = useState(true)
  const [image, setImage] = useState("")

  const [searchLoading, setSearchLoading] = useState(false)
  const [idSearch, setIdSearch] = useState("")
  const [nameSearch, setNameSearch] = useState("")
  const [categorySearch, setCategorySearch] = useState("")
  const [productsSearched, setProductsSearched] = useState([])

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    if (productId) {
      try {
        const response = await axiosInstance.get('/api/Products/' + productId, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
        const product = response.data

        setId(product.id)
        setName(product.name)
        setPrice(product.price.toString().replace('.', ','))
        setCategory(product.category)
        setDescription(product.description)
        setOnStock(product.onStock)
        setImage(product.image)

      } catch (error) {
        dispatch(setAlert({ type: 'danger', message: 'No fue posible obtener el producto' }))
      }

    }
  }

  const searchProducts = async () => {
    //validate data
    setSearchLoading(true)
    let errors = false
    if (idSearch === '' && nameSearch === '' && categorySearch === '') {
      errors = true
      dispatch(setAlert({ type: 'danger', message: 'Debe rellenar al menos un campo' }))
    }
    if (!errors) {
      try {
        const data = {
          "id": idSearch,
          "name": nameSearch,
          "category": categorySearch
        }
        const response = await axiosInstance.post('/api/Products/Search', data, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })

        setProductsSearched(response.data)
        if (response.data.length === 0) {
          dispatch(setAlert({ type: 'warning', message: 'No se encontraron coincidencias' }))
        } else {
          dispatch(setAlert({ type: 'primary', message: `Se encontraron ${response.data.length} coincidencias ` }))
        }
      } catch (error) {
        dispatch(setAlert({ type: 'danger', message: 'Ocurrió un error al buscar' }))
      }

    }
    setSearchLoading(false)
  }

  const setData = (product) => {
    setName(product.name)
    setPrice(product.price)
    setCategory(product.category)
    setDescription(product.description)
    setId(product.id)
    setOnStock(product.onStock)
    setImage(product.image)
  }

  const deleteAProduct = async () => {
    try {
      const response = axiosInstance.delete('/api/Products/' + id, { headers: { Authorization: `Bearer ${getUserLoggedIn().token}` } })
      const newProdSearch = productsSearched.filter(p=>p.id!==id)
      setProductsSearched([...newProdSearch])
      dispatch(setAlert({ type: 'primary', message: "Producto eliminado correctamente" }))
    } catch (error) {
      console.log(error)
      dispatch(setAlert({ type: "danger", message: "No fue posible eliminar el producto" }))
    }
  }
  const resetFields = () => {
    setId("")
    setName("")
    setPrice("")
    setCategory("")
    setDescription("")
    setOnStock(true)
    setImage("")
  }


  return (
    <div className='w-100 mt-4' style={{ display: 'flex', height: '85%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>

      {/*Search Section*/}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '4px', display: 'flex', width: '80%', height: '60px', justifyContent: 'space-around', alignItems: 'end' }}>
          <div className=''>
            <label htmlFor="SearchByID" className="form-label" style={{ fontSize: '13px' }}>Buscar por Id</label>
            <input value={idSearch} onChange={(e) => setIdSearch(e.target.value)} type="text" className="form-control form-control-sm " id="SearchByID" placeholder="Id" />
          </div>
          <div className=''>
            <label htmlFor="SearchByName" className="form-label" style={{ fontSize: '13px' }}>Buscar por Nombre</label>
            <input value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} type="text" className="form-control form-control-sm " id="SearchByName" placeholder="Nombre" />
          </div>
          <div className=''>
            <label htmlFor="SearchByCategory" className="form-label" style={{ fontSize: '13px' }}>Buscar por Categoría</label>
            <input value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} type="text" autoComplete='none' className="form-control form-control-sm " id="SearchByCategory" placeholder="Categoría" />
          </div>
          <button disabled={searchLoading} onClick={() => searchProducts()} type="button" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '2em', height: '35px', maxWidth: '150px', marginLeft: '5px' }}>
            {
              searchLoading
                ? <>
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                  <span role="status">&nbsp;&nbsp;Loading...</span>
                </>
                : <span>Buscar</span>
            }
          </button>
        </div>
        <ul className="list-group list-group-flush w-75 mb-1" style={{ maxHeight: "80px", overflow: 'auto' }}>
          {productsSearched.map(ps =>
            <li key={ps.id} className="list-group-item " onClick={() => setData(ps)}><div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}><div>{ps.name}</div><div>{ps.category}</div> <div>{ps.onStock ? "A la venta" : 'Terminado'}</div> </div></li>
          )}
        </ul>
        <div style={{ width: '80%', height: '1px', backgroundColor: 'silver', borderRadius: '2em' }} />
      </div>

      {/*Detail Section */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Nombre del Producto: </span>{name}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Precio: </span>{price}</div>
        </div>

        <div className="mb-3">
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>¿A la venta?: </span>{onStock ? 'Sí' : 'No'}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Categoría: </span>{category}</div>
        </div>
        <div className='mb-3'>
          <div style={{ fontSize: '16px' }}><span style={{ fontSize: '15px', fontWeight: 'bold' }}>Descripción: </span>{description}</div>
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img src={image} style={{ borderRadius: '15px' }} />
      </div>
      <div style={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
        <div style={{ display: 'flex', width: '250px', justifyContent: 'space-between' }}>
          <input className='btn btn-success' disabled={!id} onClick={() => { navigate('/admin/products/update/' + id); console.log(id) }} value={'Editar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
          <input className='btn btn-danger' disabled={!id} data-bs-toggle="modal" data-bs-target="#staticBackdrop" value={'Eliminar'} type='button' style={{ width: '100px', height: '40px', borderRadius: '2em' }} />
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
              <button onClick={() => { deleteAProduct(); resetFields() }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetail
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import SubmitProductModal from './modals/SubmitProductModal'
//This component is a dynamic list of products from an online database that represents information of stock inventory/etc
export default function InventoryTable(props) {
  const [products, setProducts] = useState([])
  const [contentIsLoaded, setContentIsLoaded] = useState(false)
  const [isSubmitModalShown, setIsSubmitModalShown] = useState(false)
  //api call to inventory database hosted on our aws resources

  //We can choose for a frontend filtering of how much of the query to display(Chose to implement it this way)
  //or we can add functionality to specificy querying within the backend
  useEffect(() => {
    async function loadProducts() {
      const data = await window.api.get('/products')
      setProducts(data)
      setContentIsLoaded(true)
    }
    loadProducts()
  }, [])

  if (!contentIsLoaded) {
    return (
      <div>
        <p>No Products are in the database...</p>
      </div>
    )
  } else {
    return (
      <>
        <div className="product-list container">
          <ul className="list-item">
            <li className="item-value">
              ProductName
              <button type="button" className="btn" onClick={() => setIsSubmitModalShown(true)}>
                +
              </button>
            </li>
            <li className="item-value">Barcode</li>
            <li className="item-value">Category</li>
            <li className="item-value">Stock</li>
            <li className="item-value">UnitPrice</li>
            <li className="item-value">ReorderLevel</li>
            <li className="item-value">ReorderQuantity</li>
            <li className="item-value">DateRecieved</li>
            <li className="item-value">LastOrder</li>
            <li className="item-value">Expiration</li>
            <li className="item-value">Warehouse</li>
            <li className="item-value">SalesVolume</li>
            <li className="item-value">InventoryTurnoverRate</li>
            <li className="item-value end">Status</li>
          </ul>
          {products.map((item) => {
            if (
              props.filter == '' ||
              item.ProductName.toLowerCase().includes(props.filter.toLowerCase())
            ) {
              return (
                <ul key={item.ProductId} className="list-item">
                  <li className="item-value">{item.ProductName}</li>
                  <li className="item-value">{item.Barcode}</li>
                  <li className="item-value">{item.Category}</li>
                  <li className="item-value">{item.Stock}</li>
                  <li className="item-value">{item.UnitPrice}</li>
                  <li className="item-value">{item.ReorderLevel}</li>
                  <li className="item-value">{item.ReorderQuantity}</li>
                  <li className="item-value">{item.DateRecieved.substring(0, 10)}</li>
                  <li className="item-value">{item.LastOrder.substring(0, 10)}</li>
                  <li className="item-value">
                    {item.Expiration != null ? item.Expiration.substring(0, 10) : item.Expiration}
                  </li>
                  <li className="item-value">{item.Warehouse}</li>
                  <li className="item-value">{item.SalesVolume}</li>
                  <li className="item-value">{item.InventoryTurnoverRate}</li>
                  <li className="item-value">{item.Status}</li>
                </ul>
              )
            }
          })}
        </div>
        <SubmitProductModal show={isSubmitModalShown} onHide={() => setIsSubmitModalShown()} />
      </>
    )
  }
}

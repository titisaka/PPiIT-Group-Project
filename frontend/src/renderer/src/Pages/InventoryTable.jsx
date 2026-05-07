import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
//This component is a dynamic list of products from an online database that represents information of stock inventory/etc
export default function InventoryTable(props) {
  const [products, setProducts] = useState([])
  const [contentIsLoaded, setContentIsLoaded] = useState(false)


  //api call to inventory database hosted on our aws resources
  useEffect(() => {
    async function loadProducts() {
      const data = await window.api.get("/products");
      setProducts(data);
      setContentIsLoaded(true);
    }
    console.log(props.text);
    loadProducts();
  }, [])

  if (!contentIsLoaded) {
    return (
      <div>
        <p>No Products are in the database...</p>
      </div>
    );
  } else {
    return (
      <>
        <div className='product-list container'>
          <ul className="list-item">
            <li className="item-value">ProductName</li>
            <li className="item-value">Barcode</li>
            <li className="item-value">Category</li>
            <li className="item-value">Stock</li>
            <li className="item-value">UnitPrice</li>
            <li className="item-value">ReorderLevel</li>
            <li className="item-value">iReorderQuantity</li>
            <li className="item-value">DateRecieved</li>
            <li className="item-value">LastOrder</li>
            <li className="item-value">Expiration</li>
            <li className="item-value">Warehouse</li>
            <li className="item-value">SalesVolume</li>
            <li className="item-value">InventoryTurnoveRate}</li>
            <li className="item-value end">Status</li>
          </ul>
          {products.map(item => {
            return (
              <ul key={item.ProductId} className="list-item">
                <li className="item-value">{item.ProductName}</li>
                <li className="item-value">{item.Barcode}</li>
                <li className="item-value">{item.Category}</li>
                <li className="item-value">{item.Stock}</li>
                <li className="item-value">{item.UnitPrice}</li>
                <li className="item-value">{item.ReorderLevel}</li>
                <li className="item-value">{item.ReorderQuantity}</li>
                <li className="item-value">{item.DateRecieved}</li>
                <li className="item-value">{item.LastOrder}</li>
                <li className="item-value">{item.Expiration}</li>
                <li className="item-value">{item.Warehouse}</li>
                <li className="item-value">{item.SalesVolume}</li>
                <li className="item-value">{item.InventoryTurnoveRate}</li>
                <li className="item-value end">{item.Status}</li>
              </ul>
            );
          }
          )}
        </div>
      </>
    );
  }
}

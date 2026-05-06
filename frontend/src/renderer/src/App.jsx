import Inventory from './Pages/Inventory'
import Homepage from './Pages/Homepage'
import Checkout from './Pages/Checkout'
import ReceiptViewer from './Pages/Checkout'
import { useState } from 'react'

export default function App() {
  const [currPage, setPage] = useState(0);

  function renderPage() {
    switch (currPage) {
      case 1:
        return <Checkout />;
      case 2:
        return <Inventory />;
      case 3:
        return <ReceiptViewer />;
      default:
        return <Homepage />;
    }

    return (
      <div className="page-layout">
        {createDashboard()}
        <div className="main-contents">
          <div className="search-bar" id="inventory-search-bar">
            Search Bar
          </div>
          <div className="main-content">
            {renderPage()}
          </div>
        </div>
      </div>

    )
  }

  function createDashboard() {
    return (
      <div className="sidebar">
        <h1>Dashboard</h1>
        <h3 id="inventory" onClick={() => setPage(1)}>Inventory</h3>
        <h3 id="receipts" onClick={() => setPage(2)}>Receipts</h3>
        <h3 id="cashier" onClick={() => setPage(3)}>Cashier</h3>
      </div> //End of grid
    )
  }
}
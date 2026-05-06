import Inventory from './Pages/Inventory'
import Checkout from './Pages/Checkout'
import ReceiptViewer from './Pages/ReceiptViewer'
import { useState } from 'react'

export default function App() {
  const [currPage, setPage] = useState(0);

  function renderPage() {
    switch (currPage) {
      case 1:
        return <Inventory />;
      case 2:
        return <ReceiptViewer />;
      case 3:
        return <Checkout />;
      default:
        return <div>Select a page</div>;
    }
  }

  return (
    <div className="page-layout">

      <div className="sidebar">
        <h1>Dashboard</h1>
        <h3 onClick={() => setPage(1)}>Inventory</h3>
        <h3 onClick={() => setPage(2)}>Receipts</h3>
        <h3 onClick={() => setPage(3)}>Cashier</h3>
      </div>

      <div className="main-contents">
        <div className="search-bar">
          Search Bar
        </div>
        <div className="main-content">
          {renderPage()}
        </div>
      </div>
    </div>

  )
}
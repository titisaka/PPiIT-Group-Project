import InventoryTable from './Pages/InventoryTable'
import Checkout from './Pages/Checkout'
import ReceiptViewer from './Pages/ReceiptViewer'
import { useState } from 'react'

export default function App() {
  const [currPage, setPage] = useState(0)
  //to be used as multi-use prop in 3 main-content components
  const [searchText, setSearchText] = useState('')

  function handleChange(e) {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  function renderPage() {
    switch (currPage) {
      case 1:
        return <InventoryTable filter={searchText} />
      case 2:
        return <ReceiptViewer />
      case 3:
        return <Checkout />
      default:
        return <div>Select a page</div>
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
      <div className="search-bar">
        <form>
          <label>
            <input
              type="text"
              className="content-search"
              value={searchText}
              placeholder="Search..."
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
      <div className="main-content">{renderPage()}</div>
    </div>
  )
}

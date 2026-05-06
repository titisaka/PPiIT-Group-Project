import '../styles.css'
import DashboardLayout from './DashboardLayout'
export default function ReceiptViewer() {
  return (
    <div className="page-layout">
      <DashboardLayout />
      <div className="main-contents">
        <div className="search-bar" id="receipt-search-bar">
          Search Bar
        </div>
        <div className="receipt-table"></div>
      </div>
    </div>
  )
}

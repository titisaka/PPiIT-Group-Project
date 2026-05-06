import '../styles.css'
import DashboardLayout from './DashboardLayout'

export default function Checkout() {
  return (
    <div className="page-layout">
      <DashboardLayout />
      <div className="main-contents">
        <div className="search-bar" id="checkout-search-bar">
          Search Bar
        </div>
        <div className="checkout-table"></div>
      </div>
    </div>
  )
}

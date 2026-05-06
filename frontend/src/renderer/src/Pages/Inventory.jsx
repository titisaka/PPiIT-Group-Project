import "../styles.css"
import DashboardLayout from "./DashboardLayout";

export default function Inventory() {
  return (
    <div className="page-layout">

      <DashboardLayout />
      <div className="main-contents">
        <div className="search-bar" id="inventory-search-bar">Search Bar</div>
        <div className="inventory-table">
          <div>Search</div>
          <div>Inventory</div>
          <div>Cashier</div>
        </div>
      </div>
    </div>);
}


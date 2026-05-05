import "../styles.css"

export default function DashboardLayout() {
    return (
        <div className="container" id="dashboard">

            <div className="row">
                <div className="col-sm">
                    <h1>Dashboard</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <h3 id="products">Products</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <h3 id="inventory">Inventory</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <h3 id="receipts">Receipts</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <h3 id="cashier">Cashier</h3>
                </div>
            </div>

        </div>//End of grid
    );
}
import { Link, Outlet } from "react-router-dom";

const SellerDashboard = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>Seller Panel</h2>
        <nav>
          <ul style={styles.navList}>
            <li><Link to="/">My Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
      </div>

      {/* Page Content */}
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    background: "#1f2937",
    color: "white",
    padding: "20px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2rem",
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#f3f4f6",
  },
};

export default SellerDashboard;
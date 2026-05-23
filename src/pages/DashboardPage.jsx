import { Link } from "react-router-dom";
import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to your job dashboard!</p>
      <Link to="/">← Back to Jobs</Link>
    </div>
  );
}

export default DashboardPage;

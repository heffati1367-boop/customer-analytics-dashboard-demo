import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const COLORS = ["#2563eb", "#14b8a6", "#f59e0b"];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-US");

function KpiCard({ label, value, tone = "blue" }) {
  return (
    <article className={`kpi-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function App() {
  const [summary, setSummary] = useState(null);
  const [segments, setSegments] = useState({});
  const [customers, setCustomers] = useState([]);
  const [segmentFilter, setSegmentFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/summary`).then((response) => response.json()),
      fetch(`${API_URL}/api/segments`).then((response) => response.json()),
      fetch(`${API_URL}/api/customers`).then((response) => response.json()),
    ])
      .then(([summaryData, segmentData, customerData]) => {
        setSummary(summaryData);
        setSegments(segmentData);
        setCustomers(customerData);
      })
      .catch(() =>
        setError("The API is unavailable. Start the FastAPI server and refresh.")
      );
  }, []);

  const segmentData = useMemo(
    () =>
      Object.entries(segments).map(([name, values]) => ({
        name,
        customers: values.customer_count,
        portfolio: values.portfolio_value,
      })),
    [segments]
  );

  const visibleCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          segmentFilter === "All" || customer.segment === segmentFilter
      ),
    [customers, segmentFilter]
  );

  if (error) {
    return <main className="state-message error">{error}</main>;
  }

  if (!summary) {
    return <main className="state-message">Loading analytics…</main>;
  }

  return (
    <main className="dashboard">
      <header className="hero">
        <div>
          <p className="eyebrow">PORTFOLIO PROJECT · SYNTHETIC DATA</p>
          <h1>Customer Analytics Dashboard</h1>
          <p>
            Executive insights for customer growth, retention, churn, and
            portfolio segmentation.
          </p>
        </div>
        <div className="author">
          <span>Built by</span>
          <strong>Hossein Effati</strong>
          <a
            href="https://www.linkedin.com/in/hossein-effati"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn profile
          </a>
        </div>
      </header>

      <section className="kpi-grid" aria-label="Executive KPIs">
        <KpiCard label="Active customers" value={number.format(summary.active_customers)} />
        <KpiCard label="New customers" value={number.format(summary.new_customers)} tone="teal" />
        <KpiCard label="VIP customers" value={number.format(summary.vip_customers)} tone="amber" />
        <KpiCard label="Active portfolio" value={money.format(summary.total_portfolio_value)} />
        <KpiCard label="Retention rate" value={`${summary.retention_rate}%`} tone="teal" />
        <KpiCard label="Churn rate" value={`${summary.churn_rate}%`} tone="amber" />
      </section>

      <section className="content-grid">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">SEGMENT PERFORMANCE</p>
              <h2>Active portfolio by segment</h2>
            </div>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={segmentData} margin={{ top: 16, right: 10, left: 12, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => money.format(value)} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="portfolio" radius={[8, 8, 0, 0]}>
                  {segmentData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel narrative">
          <p className="section-label">MANAGEMENT SNAPSHOT</p>
          <h2>What the data says</h2>
          <ul>
            <li>
              <strong>{summary.retention_rate}% retention</strong>
              <span>of the previous-period customer base remains active.</span>
            </li>
            <li>
              <strong>{summary.new_customers} newly active customers</strong>
              <span>were not present in the previous comparison period.</span>
            </li>
            <li>
              <strong>{summary.vip_customers} high-value relationships</strong>
              <span>currently contribute to the active portfolio.</span>
            </li>
          </ul>
        </article>
      </section>

      <section className="panel table-panel">
        <div className="panel-heading table-heading">
          <div>
            <p className="section-label">CUSTOMER DETAIL</p>
            <h2>Fictional customer records</h2>
          </div>
          <label>
            Segment
            <select value={segmentFilter} onChange={(event) => setSegmentFilter(event.target.value)}>
              <option>All</option>
              {Object.keys(segments).map((segment) => (
                <option key={segment}>{segment}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Segment</th>
                <th>Region</th>
                <th>Portfolio value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleCustomers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.segment}</td>
                  <td>{customer.region}</td>
                  <td>{money.format(customer.portfolio_value)}</td>
                  <td>
                    <span className={customer.active ? "status active" : "status inactive"}>
                      {customer.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        All records are fictional and created solely for portfolio demonstration.
      </footer>
    </main>
  );
}

export default App;

export const DEMO_SUMMARY = {
  total_customers: 12,
  active_customers: 9,
  new_customers: 3,
  retained_customers: 6,
  churned_customers: 3,
  vip_customers: 2,
  total_portfolio_value: 3105000,
  retention_rate: 66.67,
  churn_rate: 33.33,
};

export const DEMO_SEGMENTS = {
  "High Value": { customer_count: 2, portfolio_value: 1570000 },
  "Mid Value": { customer_count: 3, portfolio_value: 1060000 },
  Standard: { customer_count: 4, portfolio_value: 475000 },
};

export const DEMO_CUSTOMERS = [
  { customer_id: "CUST-001", segment: "High Value", portfolio_value: 850000, active: true, previous_period: true, region: "North" },
  { customer_id: "CUST-002", segment: "High Value", portfolio_value: 720000, active: true, previous_period: true, region: "Central" },
  { customer_id: "CUST-003", segment: "High Value", portfolio_value: 640000, active: false, previous_period: true, region: "West" },
  { customer_id: "CUST-004", segment: "Mid Value", portfolio_value: 420000, active: true, previous_period: true, region: "Central" },
  { customer_id: "CUST-005", segment: "Mid Value", portfolio_value: 360000, active: true, previous_period: true, region: "East" },
  { customer_id: "CUST-006", segment: "Mid Value", portfolio_value: 310000, active: false, previous_period: true, region: "North" },
  { customer_id: "CUST-007", segment: "Mid Value", portfolio_value: 280000, active: true, previous_period: false, region: "West" },
  { customer_id: "CUST-008", segment: "Standard", portfolio_value: 160000, active: true, previous_period: true, region: "East" },
  { customer_id: "CUST-009", segment: "Standard", portfolio_value: 130000, active: true, previous_period: true, region: "Central" },
  { customer_id: "CUST-010", segment: "Standard", portfolio_value: 90000, active: false, previous_period: true, region: "North" },
  { customer_id: "CUST-011", segment: "Standard", portfolio_value: 110000, active: true, previous_period: false, region: "South" },
  { customer_id: "CUST-012", segment: "Standard", portfolio_value: 75000, active: true, previous_period: false, region: "South" },
];

from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_summary_kpis():
    response = client.get("/api/summary")
    assert response.status_code == 200

    summary = response.json()
    assert summary["total_customers"] == 12
    assert summary["active_customers"] == 9
    assert summary["new_customers"] == 3
    assert summary["retained_customers"] == 6
    assert summary["churned_customers"] == 3
    assert summary["vip_customers"] == 2
    assert summary["total_portfolio_value"] == 3105000
    assert summary["retention_rate"] == 66.67
    assert summary["churn_rate"] == 33.33


def test_customer_records_are_fictional():
    response = client.get("/api/customers")
    assert response.status_code == 200

    customers = response.json()
    assert customers
    assert all(row["customer_id"].startswith("CUST-") for row in customers)


def test_segment_totals():
    response = client.get("/api/segments")
    assert response.status_code == 200

    segments = response.json()
    assert segments["High Value"]["customer_count"] == 2
    assert segments["Mid Value"]["customer_count"] == 3
    assert segments["Standard"]["customer_count"] == 4

from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

from fastapi import FastAPI

app = FastAPI(
    title="Customer Analytics Dashboard Demo",
    description="Privacy-safe analytics API powered by fictional customer data.",
    version="1.0.0",
)

DATA_FILE = Path(__file__).resolve().parents[2] / "data" / "sample_customers.csv"


def load_customers() -> list[dict]:
    with DATA_FILE.open(encoding="utf-8", newline="") as source:
        rows = list(csv.DictReader(source))

    for row in rows:
        row["portfolio_value"] = float(row["portfolio_value"])
        row["active"] = row["active"].lower() == "true"
        row["previous_period"] = row["previous_period"].lower() == "true"
    return rows


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/api/customers")
def customers() -> list[dict]:
    return load_customers()


@app.get("/api/summary")
def summary() -> dict:
    rows = load_customers()
    previous = [row for row in rows if row["previous_period"]]
    active = [row for row in rows if row["active"]]
    retained = [row for row in rows if row["previous_period"] and row["active"]]
    churned = [row for row in rows if row["previous_period"] and not row["active"]]
    new = [row for row in rows if not row["previous_period"] and row["active"]]
    vip = [row for row in active if row["segment"] == "High Value"]

    previous_count = len(previous)
    return {
        "total_customers": len(rows),
        "active_customers": len(active),
        "new_customers": len(new),
        "retained_customers": len(retained),
        "churned_customers": len(churned),
        "vip_customers": len(vip),
        "total_portfolio_value": sum(row["portfolio_value"] for row in active),
        "retention_rate": round(len(retained) * 100 / previous_count, 2)
        if previous_count
        else 0,
        "churn_rate": round(len(churned) * 100 / previous_count, 2)
        if previous_count
        else 0,
    }


@app.get("/api/segments")
def segments() -> dict:
    rows = load_customers()
    counts = Counter(row["segment"] for row in rows if row["active"])
    values = {
        segment: sum(
            row["portfolio_value"]
            for row in rows
            if row["active"] and row["segment"] == segment
        )
        for segment in counts
    }
    return {
        segment: {
            "customer_count": counts[segment],
            "portfolio_value": values[segment],
        }
        for segment in sorted(counts)
    }

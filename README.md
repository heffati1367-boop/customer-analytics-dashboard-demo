# Customer Analytics Dashboard Demo

A privacy-safe portfolio project demonstrating customer analytics, KPI design, segmentation, and API development with synthetic data.

> **Privacy notice:** This repository contains no real customer records, employer data, internal banking logic, or confidential files. Every sample record is fictional.

## What this project demonstrates

- Customer segmentation by portfolio value
- New, retained, and churned customer analysis
- VIP customer identification
- Executive KPI summaries
- A documented FastAPI analytics backend
- Reproducible analysis using synthetic CSV data

## Tech stack

- Python
- FastAPI
- SQL and analytical KPI concepts
- React dashboard (planned)
- Power BI-oriented metric design

## Quick start

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

Open `http://127.0.0.1:8000/docs` to explore the API.

## Available endpoints

- `GET /health` — service status
- `GET /api/customers` — fictional customer records
- `GET /api/summary` — executive KPIs
- `GET /api/segments` — portfolio segments

## KPI definitions

- **Active customers:** customers marked active in the sample period
- **Churn rate:** churned customers divided by the previous-period customer base
- **Retention rate:** retained customers divided by the previous-period customer base
- **VIP customers:** customers in the high-value segment

## Roadmap

- Add an interactive React dashboard
- Add trend charts and filters
- Add automated tests
- Add screenshots and a live demo

## Author

**Hossein Effati**  
Data & BI Analyst | Customer Analytics | Python, SQL, Power BI  
[LinkedIn](https://www.linkedin.com/in/hossein-effati)

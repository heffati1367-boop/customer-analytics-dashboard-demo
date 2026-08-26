# Customer Analytics Dashboard Demo

A privacy-safe, full-stack portfolio project demonstrating customer analytics, KPI design, segmentation, API development, and dashboard visualization with synthetic data.

> **Privacy notice:** This repository contains no real customer records, employer data, internal banking logic, or confidential files. Every sample record is fictional.

## What this project demonstrates

- Customer segmentation by portfolio value
- New, retained, and churned customer analysis
- VIP customer identification
- Executive KPI summaries
- Interactive customer filtering
- Responsive data visualization
- A documented FastAPI analytics backend
- Reproducible analysis using synthetic CSV data

## Tech stack

- Python and FastAPI
- React and Vite
- Recharts
- SQL and analytical KPI concepts
- Power BI-oriented metric design

## Quick start

### 1. Start the API

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

The API documentation is available at `http://127.0.0.1:8000/docs`.

### 2. Start the dashboard

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Available endpoints

- `GET /health` — service status
- `GET /api/customers` — fictional customer records
- `GET /api/summary` — executive KPIs
- `GET /api/segments` — portfolio segments

## KPI definitions

- **Active customers:** customers marked active in the sample period
- **New customers:** active customers absent from the previous period
- **Churn rate:** churned customers divided by the previous-period customer base
- **Retention rate:** retained customers divided by the previous-period customer base
- **VIP customers:** active customers in the high-value segment

## Project structure

```text
backend/app/main.py       FastAPI analytics service
data/sample_customers.csv Fictional demonstration dataset
frontend/src/App.jsx      Interactive React dashboard
frontend/src/styles.css   Responsive dashboard styling
```

## Roadmap

- Add automated tests and CI
- Add multi-period trend data
- Add screenshots and a hosted live demo

## Author

**Hossein Effati**  
Data & BI Analyst | Customer Analytics | Python, SQL, Power BI  
[LinkedIn](https://www.linkedin.com/in/hossein-effati)

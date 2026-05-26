# Breathe ESG Prototype

A prototype ESG ingestion and analyst review platform built using Django REST Framework and React.

The system ingests emissions/activity data from multiple enterprise source types, normalizes records, calculates CO₂e emissions, flags suspicious activity, and supports analyst approval workflows before audit locking.

---

# Features

## Multi-Source ESG Ingestion

Supports:
- SAP fuel/procurement exports
- Utility electricity data
- Corporate travel activity

---

# ESG Processing

- Scope 1 / 2 / 3 categorization
- Unit normalization
- CO₂e emissions calculation
- Emission factor handling
- Suspicious record detection

---

# Analyst Review Workflow

Analysts can:
- review uploaded records
- filter by source
- identify suspicious activity
- approve records
- add analyst notes

Approved rows become locked for audit workflows.

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- SQLite

## Frontend
- React
- Axios

---

# Architecture

## Backend Responsibilities
- ingestion pipelines
- normalization
- emissions calculations
- audit tracking
- validation

## Frontend Responsibilities
- upload workflows
- analyst dashboard
- filtering
- review actions

---

# Source Handling

## SAP
CSV export representing operational fuel/procurement activity.

## Utility
CSV electricity usage export from utility/facilities systems.

## Travel
CSV export representing Concur/Navan-style travel activity.

---

# ESG Workflow

1. Upload source data
2. Normalize activity records
3. Calculate CO₂e emissions
4. Flag suspicious rows
5. Analyst review
6. Approve and audit lock

---

# Deployment

Frontend:
Vercel

Backend:
Render

---

# Future Improvements

- authentication and RBAC
- live SAP/Concur integrations
- PDF utility bill parsing
- advanced validation engine
- regional emission factor datasets

---


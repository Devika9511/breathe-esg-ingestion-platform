# DECISIONS.md

# Overview

This document explains architectural and product decisions made during implementation.

The assignment intentionally contained ambiguity to evaluate engineering judgment, therefore several realistic assumptions were made.

---

# Source Handling Decisions

## 1. SAP Data

### Chosen Format
CSV flat-file export.

### Why

Real SAP systems support:
- IDocs
- BAPIs
- OData APIs
- Flat-file exports

For a 4-day prototype, CSV ingestion was chosen because:
- many enterprise sustainability teams still export SAP data manually
- flat files are common during ESG onboarding
- CSV ingestion allows faster validation and normalization workflows

### Assumptions

Handled:
- fuel/procurement activity data
- Scope 1 operational fuel consumption

Ignored:
- multilingual headers
- plant code mapping tables
- SAP authentication flows

---

## 2. Utility Electricity Data

### Chosen Format
CSV export from utility portals.

### Why

Many facilities teams download:
- monthly CSV usage exports
- billing reports
- meter consumption summaries

CSV was chosen instead of PDFs because:
- parsing PDFs reliably requires OCR pipelines
- CSV ingestion is more realistic for an MVP prototype

### Assumptions

Handled:
- electricity usage in kWh
- billing period consumption

Ignored:
- tariff structures
- time-of-use pricing
- multiple meter aggregation

---

## 3. Corporate Travel Data

### Chosen Format
CSV export representing Concur/Navan-style travel reports.

### Why

Travel platforms often expose:
- APIs
- downloadable expense reports
- trip summaries

CSV uploads were chosen because:
- analyst uploads are common during ESG onboarding
- reduces integration complexity for prototype scope

### Assumptions

Handled:
- travel distance activity
- Scope 3 categorization

Ignored:
- airport code mapping
- hotel stay calculations
- flight class adjustments

---

# Validation Decisions

The platform validates:
- missing values
- negative activity values
- suspiciously large usage values

Suspicious rows are highlighted for analyst review.

Purpose:
Simulate real ESG quality-review workflows.

---

# Emissions Calculation Decisions

Emission factors were simplified using fixed values.

Examples:
- Fuel → 2.68
- Electricity → 0.82
- Travel → 0.15

Reason:
The assignment prioritizes ingestion and workflow design over scientific emissions accuracy.

In production:
- regional grid factors
- supplier-specific factors
- annual emissions factor updates
would be required.

---

# Analyst Workflow Decisions

Analysts can:
- review uploaded records
- identify suspicious rows
- approve records
- leave approval notes

Approved rows become audit locked.

Purpose:
Reflect enterprise ESG governance workflows.

---

# Deployment Decisions

Frontend:
- React
- deployed on Vercel

Backend:
- Django REST API
- deployed on Render

Reason:
Fast deployment with minimal infrastructure overhead for MVP delivery.
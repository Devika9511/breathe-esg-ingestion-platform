# SOURCES.md

# Research Sources and Assumptions

The assignment required researching realistic ESG data source structures before designing ingestion pipelines.

The following assumptions and formats were selected after reviewing common enterprise ESG workflows.

---

# 1. SAP Fuel and Procurement Data

## Research

Reviewed common SAP export approaches:
- flat-file exports
- SAP OData services
- procurement transaction exports
- ERP-generated CSV reports

Observed characteristics:
- inconsistent naming conventions
- operational fuel usage records
- ERP-specific terminology
- mixed units

---

## Prototype Choice

Chosen ingestion format:
CSV upload representing exported SAP operational fuel activity.

Example fields:
- material_desc
- fuel_volume
- fuel_unit
- posting_date

---

## Why This Was Chosen

CSV exports are realistic during enterprise ESG onboarding because:
- many sustainability teams manually export operational data
- ESG tooling often begins with spreadsheet onboarding
- CSV workflows reduce integration complexity during early implementation

---

## What Would Break in Production

Real SAP deployments would require:
- authentication
- connector middleware
- multilingual field handling
- plant mapping tables
- procurement hierarchy normalization
- automated scheduling

---

# 2. Utility Electricity Data

## Research

Reviewed:
- utility portal exports
- electricity billing reports
- facilities energy reporting formats

Observed characteristics:
- meter-based reporting
- billing periods
- kWh usage
- tariff structures

---

## Prototype Choice

Chosen ingestion format:
CSV utility export.

Example fields:
- meter_id
- kwh_usage
- billing_period_end

---

## Why This Was Chosen

Utility CSV exports are common because:
- facilities teams often download monthly reports manually
- CSV exports are easier to validate during onboarding
- PDF parsing would increase implementation complexity significantly

---

## What Would Break in Production

Real deployments may require:
- OCR parsing
- utility API integrations
- renewable energy tracking
- tariff calculations
- regional emissions factors

---

# 3. Corporate Travel Data

## Research

Reviewed:
- Concur-style travel exports
- Navan reporting structures
- travel expense workflows

Observed characteristics:
- trip categories
- flight distance activity
- hotel and transport segmentation
- traveler metadata

---

## Prototype Choice

Chosen ingestion format:
CSV travel activity export.

Example fields:
- employee_id
- trip_type
- distance_km

---

## Why This Was Chosen

CSV uploads are realistic because:
- many ESG onboarding processes still involve analyst uploads
- reduces dependency on third-party authentication
- keeps prototype scope manageable

---

## What Would Break in Production

Real travel integrations would require:
- airport code calculations
- flight class multipliers
- currency normalization
- traveler privacy controls
- hotel emissions calculations

---

# Overall Prototype Assumptions

The system prioritizes:
- ingestion flexibility
- normalization workflows
- analyst review processes
- audit traceability

The prototype intentionally simplifies:
- authentication
- live enterprise integrations
- regional emissions modeling

to focus on ESG onboarding workflows within the assignment timeline.
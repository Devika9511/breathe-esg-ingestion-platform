# MODEL.md

## Overview

The application is designed as a lightweight ESG emissions ingestion and analyst review platform.

The system ingests emissions and activity data from multiple enterprise data sources including:

- SAP fuel/procurement exports
- Utility electricity data
- Corporate travel platforms

The platform normalizes uploaded records, calculates CO₂e emissions, validates suspicious values, and enables analyst approval before audit locking.

---

# Core Models

## Company

Represents a tenant/company onboarded into the ESG platform.

Fields:
- id
- name
- created_at

Purpose:
Supports multi-tenancy for future scalability.

---

## DataSource

Tracks the origin of uploaded ESG records.

Fields:
- company
- source_type
- uploaded_at

Supported source types:
- SAP
- UTILITY
- TRAVEL

Purpose:
Maintains source-of-truth tracking for auditing and traceability.

---

## EmissionRecord

Stores normalized ESG activity data.

Fields:
- source
- category
- scope
- amount
- unit
- normalized_value
- emission_factor
- co2e_emissions
- status
- is_flagged
- validation_error
- analyst_note
- locked_for_audit
- record_date

Purpose:
Central ESG activity and emissions storage.

---

## AuditLog

Tracks analyst actions for auditability.

Fields:
- record
- action
- timestamp

Purpose:
Maintains immutable analyst review history.

---

# ESG Design Decisions

## Scope Categorization

The platform supports:
- Scope 1
- Scope 2
- Scope 3

Examples:
- Fuel combustion → Scope 1
- Electricity usage → Scope 2
- Business travel → Scope 3

---

## Unit Normalization

Units are normalized before emissions calculations.

Examples:
- Liters
- kWh
- KM

Purpose:
Ensures consistent downstream emissions calculations.

---

## Source-of-Truth Tracking

Every record stores:
- upload source
- upload timestamp
- analyst action history

This improves:
- traceability
- audit readiness
- compliance workflows

---

## Audit Locking

Approved records are locked for audit review.

Purpose:
Prevents accidental modification after analyst sign-off.

---

## Validation Strategy

The platform flags:
- extremely large values
- invalid amounts
- suspicious consumption patterns

Flagged rows require analyst review before audit approval.
# TRADEOFFS.md

# Tradeoffs and Non-Implemented Features

Given the 4-day prototype constraint, several deliberate tradeoffs were made to prioritize realistic ESG ingestion workflows, audit review, and data normalization.

The following features were intentionally simplified or excluded.

---

# 1. No Real-Time SAP / Concur Integrations

## Tradeoff

The system uses CSV uploads instead of live enterprise integrations.

## Why

Real integrations require:
- authentication
- enterprise credentials
- connector middleware
- vendor onboarding
- API contracts

These integrations are time-intensive and environment-dependent.

## Prototype Goal

Focus was placed on:
- ingestion flexibility
- normalization
- analyst review workflows

rather than enterprise connectivity setup.

---

# 2. No Authentication / Role-Based Access

## Tradeoff

The platform does not implement:
- login systems
- RBAC
- multi-user permissions

## Why

The assignment primarily evaluates:
- ESG ingestion workflows
- data modeling
- analyst review design

Authentication was excluded to prioritize core ESG functionality.

## Production Expectation

A production system would require:
- analyst/admin roles
- SSO integration
- audit-safe permission management

---

# 3. Simplified Emission Factors

## Tradeoff

Static emission factors were used.

Examples:
- Fuel → 2.68
- Electricity → 0.82
- Travel → 0.15

## Why

Real ESG systems use:
- geography-specific factors
- annually updated datasets
- supplier-specific emissions mappings

The prototype prioritizes workflow demonstration over scientific precision.

---

# 4. No PDF Utility Bill Parsing

## Tradeoff

Utility ingestion supports CSV exports only.

## Why

PDF parsing introduces:
- OCR complexity
- inconsistent layouts
- extraction instability

CSV exports were considered sufficient for demonstrating ingestion architecture.

---

# 5. Simplified Travel Emissions

## Tradeoff

Travel emissions are calculated using simple distance-based assumptions.

## Why

Real travel emissions depend on:
- flight class
- aircraft type
- hotel category
- airport mappings
- transportation modes

The simplified implementation allowed focus on analyst workflows and ESG normalization.

---

# 6. Limited Validation Rules

## Tradeoff

Validation currently flags:
- negative values
- extremely large activity values

## Why

The prototype demonstrates the concept of suspicious-record review without implementing a full ESG validation engine.

---

# 7. SQLite Instead of Production Database

## Tradeoff

SQLite was used for local development.

## Why

SQLite provides:
- rapid setup
- simple deployment
- minimal operational overhead

Production deployments would likely use:
- PostgreSQL
- managed cloud databases
- partitioned storage strategies

---

# Final Reflection

The implementation intentionally prioritized:
- realistic ESG ingestion flows
- audit traceability
- analyst review workflows
- explainable architectural decisions

over enterprise-scale completeness.
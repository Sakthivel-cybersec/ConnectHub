# ConnectHub - Reports Backend API Contract

## 1. Required Endpoints

| Method | Endpoint | Purpose | Permission |
| GET | /api/reports/summary | Total contacts and category counts | reports:view |
| GET | /api/reports/contacts | Contact report data | reports:view |
| GET | /api/reports/export | Export report as CSV | reports:export |

## 2. Summary Response

- Total contacts
- Employee count
- Client count
- Vendor count
- Business Partner count
- Category distribution

All values must come from actual MongoDB Contact records.

## 3. Contact Report

- Return actual contact records.
- Support pagination if required.
- Support relevant filters.
- Date filtering must use the confirmed Contact model date fields.

## 4. CSV Export

Existing frontend export columns:

Name, Email, Phone, Company, Category, Status, Location

CSV requirements:
- Escape commas, quotes and special characters safely.
- Include correct CSV headers.
- Export actual database records.
- Do not return sample data.

## 5. Role Permissions

| Role | View Reports | Export |
| Admin | Yes | Yes |
| Manager | Yes | Yes |
| Employee | No | No |
| Viewer | No | No |

## 6. Dependencies To Confirm

- Ash: Contact model fields and timestamp availability.
- Ash: Category reference format.
- Sak: Authentication and permission middleware.
- Team: Required report date filters and pagination.

## 7. Implementation Status

Design draft only. No report APIs or database aggregations have been implemented yet.

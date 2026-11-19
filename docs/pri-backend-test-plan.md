# ConnectHub - Categories and Reports Backend Test Plan

## Categories API Tests

- [ ] List categories successfully.
- [ ] Create category with valid input.
- [ ] Reject missing category name.
- [ ] Reject duplicate category name.
- [ ] Retrieve category by valid ID.
- [ ] Return 404 for unknown category ID.
- [ ] Reject invalid MongoDB ID.
- [ ] Update category successfully.
- [ ] Reject invalid update input.
- [ ] Delete category without linked contacts.
- [ ] Prevent deletion when contacts are linked.

## Reports API Tests

- [ ] Summary total matches Contact database count.
- [ ] Category counts match actual Contact records.
- [ ] Contacts report returns actual database records.
- [ ] Date filters use confirmed Contact timestamp fields.
- [ ] CSV contains the expected headers.
- [ ] CSV correctly escapes commas and quotation marks.
- [ ] CSV export contains actual database records.

## Authentication and RBAC Tests

- [ ] Unauthenticated category requests are rejected.
- [ ] Admin can view and manage categories.
- [ ] Manager can view categories only.
- [ ] Employee can view categories only.
- [ ] Viewer can view categories only.
- [ ] Unauthenticated report requests are rejected.
- [ ] Admin can view and export reports.
- [ ] Manager can view and export reports.
- [ ] Employee cannot access reports.
- [ ] Viewer cannot access reports.

## Test Evidence

Actual test results, commands and output must be recorded after implementation. No test is marked passed before execution.

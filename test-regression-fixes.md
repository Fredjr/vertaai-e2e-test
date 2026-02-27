# PR #31: Regression Fixes Validation

This PR tests the fixes for:
1. Regression #1: Inconsistent counts (3 warnings vs 1 finding)
2. Regression #2: Docs repo failing service checks

Expected behavior:
- Counts should be consistent across all sections
- DOCS repo should NOT fail tier-1 service checks
- Suppressed obligations should be shown separately with reasons
- Evidence search should show searched paths

Test file to trigger classification.

# Complex E2E Test Scenario: API Breaking Change

**Date:** 2026-02-28  
**Test ID:** track-a-e2e-001  
**Repository:** vertaai-e2e-test  
**Objective:** Exercise complete Track A implementation with all Phase 1-6 features

## 🎯 Test Scenario

This PR simulates a realistic complex scenario to test the governance pipeline with:
- Breaking API changes
- OpenAPI spec inconsistencies
- Schema changes without migrations
- Authentication changes
- Incomplete documentation

## ✅ Expected Track A Features

1. Vector Confidence Model (3 components)
2. Stable Fingerprints (SHA-256)
3. Runtime Validation (20 invariants)
4. Message Catalog (0% freeform prose)
5. IR-Aware Rendering
6. Risk Scoring
7. Evidence Collection

See individual files for details.

## Track A E2E Test - Trigger Re-evaluation

This update triggers a re-evaluation with the latest Railway deployment that includes:
- ✅ Vector Confidence Model (3 components)
- ✅ Stable Fingerprints (SHA-256)
- ✅ Runtime Validation (20 invariants)
- ✅ Message Catalog (0% freeform prose)

**Deployment fixes applied:**
- Fixed duplicate `baselineFailures` declaration
- Fixed `validateSemantics` import in evaluationNormalizer
- Fixed `validateSemantics` import in ultimateOutputRenderer

**Expected in this evaluation:**
All Track A features should now be visible in the governance output.


# Cross-Artifact Comparators E2E Test Scenario

## 🎯 Test Objective
This PR validates all 5 Track A Task 2 cross-artifact comparators by creating intentional mismatches between related artifacts.

## 🔍 Expected Comparator Triggers

### 1. ✅ OpenAPI ↔ Code Parity Comparator
**File Changed:** `openapi.yaml`
**Mismatch:** New endpoint `/api/users/{id}/profile` added to OpenAPI spec but not implemented in code
**Expected Finding:** `OPENAPI_CODE_MISMATCH`
**Expected Message:** "OpenAPI spec changed but implementation not updated: openapi.yaml"

### 2. ✅ Schema ↔ Migration Parity Comparator
**File Changed:** `src/schema.prisma`
**Mismatch:** New field `phoneNumber` added to User model but no migration file created
**Expected Finding:** `SCHEMA_MIGRATION_MISSING`
**Expected Message:** "Schema changed but no migration file added: src/schema.prisma"

### 3. ✅ Contract ↔ Implementation Parity Comparator
**File Changed:** `src/types.ts`
**Mismatch:** New methods `findByEmail()` and `countUsers()` added to UserRepository interface but not implemented
**Expected Finding:** `CONTRACT_IMPLEMENTATION_MISMATCH`
**Expected Message:** "Contract changed but implementation not updated: src/types.ts"

### 4. ✅ Documentation ↔ Code Parity Comparator
**File Changed:** `src/api/routes.ts`
**Mismatch:** New routes DELETE and PATCH added but README not updated
**Expected Finding:** `DOC_CODE_MISMATCH`
**Expected Message:** "Code changed in documented areas but docs not updated: src/api/routes.ts"

### 5. ✅ Test ↔ Implementation Parity Comparator
**File Changed:** `src/userService.ts`
**Mismatch:** New methods `deleteUser()` and `updateUser()` added but no tests created
**Expected Finding:** `TEST_IMPLEMENTATION_MISSING`
**Expected Message:** "Implementation changed but tests not updated: src/userService.ts"

## 📊 Expected Governance Output

### Decision
**Expected:** ⚠️ WARN (5 cross-artifact warnings)

### Findings Summary
- 5 cross-artifact consistency violations detected
- All findings should have structured messages from catalog
- All findings should include remediation guidance
- All findings should have confidence scores

### Track A Features to Validate
- ✅ Vector Confidence Model (3 components per finding)
- ✅ Stable Fingerprints (SHA-256 hash)
- ✅ Runtime Validation (20 invariants)
- ✅ Message Catalog (0% freeform prose)
- ✅ IR-Aware Rendering
- ✅ Risk Scoring (4-component model)
- ✅ Evidence Collection (file references)

## 🔧 Remediation Guidance Expected

Each finding should include specific remediation steps:
1. OpenAPI: "Update code implementation to match OpenAPI spec changes"
2. Schema: "Add migration file for schema changes in: src/schema.prisma"
3. Contract: "Update implementation to match contract changes"
4. Documentation: "Update documentation for code changes in: src/api/routes.ts"
5. Tests: "Add tests for implementation changes in: src/userService.ts"

## ✅ Success Criteria
- All 5 comparators triggered
- All findings displayed in governance output
- All messages from catalog (no freeform prose)
- Confidence scores present for each finding
- Evidence collection working
- Risk scores calculated
- Remediation guidance provided

# Test PR #27 - Baseline Pack with requires.localArtifacts Support

This PR tests the baseline contract integrity pack **after implementing support for requires.localArtifacts**.

## 🎯 What's New

### Bug #4: New Rule Pattern Not Implemented ✅
- **Issue**: Rules using `requires.localArtifacts`, `checks.invariants`, and `decision` blocks were showing as "NOT_EVALUABLE" with undefined reasons
- **Root Cause**: Pack evaluator didn't know how to evaluate the new baseline pack pattern
- **Fix**: Implemented `evaluateNewPatternRule()` function to handle:
  - ✅ `requires.localArtifacts.anyOf` - Check if any matching file exists
  - ✅ `requires.localArtifacts.allOf` - Check if all matching files exist
  - ✅ `decision.onViolation` - Extract decision (simple string or branch-specific)
  - ✅ `decision.onMissingExternalEvidence` - Extract decision for missing evidence
- **Commit**: `44090a9`
- **File**: `apps/api/src/services/gatekeeper/yaml-dsl/packEvaluator.ts`

## ✅ Expected Behavior

The **Test** baseline pack should now evaluate rules correctly:

### Rules That Should Work Now
1. ✅ **Check-Run Must Always Be Posted** - PASS (uses old pattern with comparator)
2. ✅ **CODEOWNERS File Required** - FAIL → WARN (no CODEOWNERS file in PR)
3. ✅ **Service Owner Required** - FAIL → WARN (no catalog-info.yaml in PR)
4. ✅ **Runbook Required (Tier-1)** - FAIL → WARN (no runbook file in PR)

### Rules Still Not Implemented (Future Work)
5. ❓ **Ownership↔Docs Parity** - NOT_EVALUABLE (uses `checks.invariants`)
6. ❓ **Alert Routing Ownership** - NOT_EVALUABLE (uses `checks.invariants`)
7. ❓ **Waiver Policy** - NOT_EVALUABLE (uses approval logic)

## 📊 Expected Coverage

- **Evaluable**: 4 rules (1 comparator-based + 3 requires.localArtifacts-based)
- **Not Evaluable**: 3 rules (invariants and approval logic not yet implemented)
- **Total**: 7 rules

## 🔍 Verification Checklist

- [ ] Check run name is "VertaAI / Baseline Contract Integrity"
- [ ] 4 rules are evaluated (not NOT_EVALUABLE)
- [ ] 3 rules show as NOT_EVALUABLE (invariants/approvals)
- [ ] Coverage shows 4/7 evaluable
- [ ] Rules with `requires.localArtifacts` show proper PASS/FAIL status
- [ ] Decisions are extracted correctly from `decision.onViolation`
- [ ] Pack mode is WARN (non-blocking)

---

## 📋 All Bugs Fixed So Far

| Bug | Issue | Fix | Commit |
|-----|-------|-----|--------|
| **#1** | `TypeError: rule.obligations is not iterable` | Handle rules without obligations array | `21441da` |
| **#2** | ARCHIVED packs still evaluating | Exclude ARCHIVED packs from pack selector | `9ba0958` |
| **#3** | Packs never matching PRs | Use base branch instead of head branch | `7488582` |
| **#4** | New rule pattern not implemented | Implement `evaluateNewPatternRule()` for requires.localArtifacts | `44090a9` |

---

Pull Request created by [Augment Code](https://www.augmentcode.com/) with guidance from the PR author


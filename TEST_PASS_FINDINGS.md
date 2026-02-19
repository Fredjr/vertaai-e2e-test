# Test: Pass Findings Display in Observe Mode

This PR tests that the GitHub Check output shows **ALL findings** in observe mode, including pass findings.

## Objective

Verify that when a policy pack is in observe mode, the GitHub Check displays:
- ✅ **Pass findings** - Rules that passed
- ⚠️ **Warning findings** - Rules that warned
- ❌ **Blocking findings** - Rules that would block (but don't in observe mode)
- ❓ **Unknown findings** - Rules that couldn't evaluate

## Expected Behavior

The GitHub Check should show a section like:

```
## ✅ Passing Checks

### Observe Secret Patterns
Reason: No secrets detected in diff
Code: PASS

### Observe Approval Patterns
Reason: PR has 0 approvals (observation only)
Code: PASS
```

## Why This Matters

In observe mode, users want to see **all signals being monitored**, not just failures. This is critical for the "observe and learn" phase where teams are evaluating which rules to enforce.

## Test Configuration

- **Pack**: Production Test Pack - Observe Core
- **Template**: verta.observe-core.v1
- **Mode**: observe
- **Scope**: Fredjr/vertaai-e2e-test
- **Expected Findings**: 3 total (should all be visible)

---

**Related**: PR #12 - Initial test that revealed this issue

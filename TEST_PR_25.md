# Test Change for PR #25

This PR tests the baseline contract integrity pack after fixing the pack selector and conflict detector.

## Expected Behavior

The **Test** baseline pack should now evaluate correctly with all 7 rules.

## Changes
- Added test file to trigger pack evaluation
- Should see 'VertaAI / Baseline Contract Integrity' check run
- Should NOT see 'Observe Core Pack' anymore

## Verification
- Check that only the 'Test' pack is evaluated
- Verify all 7 rules are shown in the output
- Confirm pack mode is 'warn' (non-blocking)


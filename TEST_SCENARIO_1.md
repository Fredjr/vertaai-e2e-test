# Test Scenario 1: Observe Mode

This PR tests the basic YAML DSL Policy Pack system in observe mode.

## Changes:
- Added this test file to trigger policy pack evaluation

## Expected Results:
- GitHub Check should be created
- Status should be PASS (observe mode never blocks)
- Findings should be logged in check output

## Testing Done:
- Manual testing of observe mode
- Verified policy pack configuration


## Update

Triggering webhook after fixing PackStatus enum issue.


## Update 2

Triggering webhook after updating pack scope.


## Update 3

Triggering webhook after removing branch filter from pack.

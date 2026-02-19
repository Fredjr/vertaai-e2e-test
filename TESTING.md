# Testing YAML DSL Policy Pack

This file is created to trigger the webhook with a more significant change.

## Test Details

- **Scenario**: 1 - Observe Mode
- **Pack**: Production Test Pack - Observe Core
- **Expected**: GitHub Check "VertaAI Observe Core" should appear

## Changes Made

1. Fixed PackStatus enum issue (ACTIVE vs active)
2. Fixed branch filter (removed to match all branches)
3. Fixed ES module require() issue (import * as yaml)

## Current Status

Waiting for YAML DSL GitHub Check to appear...

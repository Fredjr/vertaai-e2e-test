# Test Scenario 4: Gate Status Facts

This PR tests cross-gate dependencies using gate status facts.

## Test Steps:
1. Wait for initial "VertaAI Policy Pack" check to complete
2. Add label "deploy" to trigger "Deploy Gate" pack
3. Verify Deploy Gate queries previous gate status
4. Verify Deploy Gate makes correct decision based on previous gate

## Expected Behavior:
- Deploy Gate should query gate.contractIntegrity.status fact
- Deploy Gate should query gate.contractIntegrity.findings fact
- If previous gate passed, Deploy Gate should pass
- If previous gate failed/blocked, Deploy Gate should block


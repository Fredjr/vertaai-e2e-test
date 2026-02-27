# PR #30: Top-Tier Output Validation

This PR tests all 4 critical gaps fixed in commit ef34c2f:

1. Policy Activation Chain - Show signals → overlays → obligations
2. Evidence Transparency - Show searched paths, closest matches, guidance
3. Tier Inference Transparency - Show heuristics, not assertions
4. Risk Math Refinement - Drop 1.0 multiplier, confidence-weight tier risk

Expected output should include:
- 🎯 Policy Activation section
- 🔍 Evidence Search with searched paths
- Tier heuristic (not assertion)
- Confidence-weighted risk scores
- Actionable file path templates


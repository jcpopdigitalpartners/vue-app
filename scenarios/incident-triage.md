---
id: incident-triage
title: The 3 AM Pager
summary: Error rates spike after a config change. Walk through triage without jumping to conclusions.
mentalModelGoal: Develop a systematic incident mental model — observe symptoms, form hypotheses, validate assumptions, then act.
keyConcepts:
  - Blast radius
  - Hypothesis testing
  - Correlation vs causation
  - Rollback criteria
---

## Context

At 3:14 AM your on-call phone fires: error rate on the checkout service jumped from 0.1% to 4%. A teammate merged a feature flag change two hours ago. Logs show timeouts talking to the payment provider, but the provider status page is green.

## Questions

### incident-q1

type: reflection

What three facts would you gather first to understand blast radius before changing anything?

> Hint: Who is affected, which endpoints, and whether the trend is worsening or stable.

> Insight: Effective triage starts with scope — percent of users, geographic or tenant patterns, and whether errors are increasing. Scope tells you urgency and whether rollback is proportional.

### incident-q2

type: multiple_choice
correct: 2

The feature flag change correlates in time with the spike. What is the most disciplined next step?

1. Immediately revert the flag — correlation proves causation
2. Compare error rates between flag-on and flag-off cohorts if available
3. Wait for the payment provider to acknowledge an outage
4. Scale up checkout pods to absorb timeouts

> Insight: Correlation invites investigation, not automatic action. Cohort comparison or canary analysis separates coincidence from cause before you rollback or scale.

### incident-q3

type: reflection

Write a one-sentence hypothesis and one observation that would falsify it.

> Insight: Science-style mental models keep incidents manageable — a falsifiable hypothesis prevents endless log scrolling and makes rollback decisions explicit.

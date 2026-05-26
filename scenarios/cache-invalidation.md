---
id: cache-invalidation
title: The Stale Dashboard
summary: A metrics dashboard shows yesterday's numbers after a deploy. Trace the failure through caching layers.
mentalModelGoal: Build a layered mental model of caching — where data lives, what invalidates it, and how symptoms map to failure points.
keyConcepts:
  - TTL
  - Cache invalidation
  - Origin vs edge
  - Consistency vs latency
---

## Context

You maintain a SaaS analytics product. After a routine deploy, support tickets arrive: customer dashboards show stale conversion rates from 18 hours ago. The API responds quickly, Redis hit rates look healthy, and the CDN cache headers were not changed in this release.

## Questions

### cache-q1

type: reflection

Before checking any tools, list every place this dashboard data might be cached between the database and the user's browser.

> Hint: Think in hops — browser, CDN, application, database query cache, materialized views.

> Insight: A useful mental model treats caching as a stack of independent stores. Each layer has its own TTL, key scheme, and invalidation trigger. Stale data often means one layer was updated while another was not.

### cache-q2

type: multiple_choice
correct: 2

Redis hit rates are high and response times are fast. What does that suggest about the stale data problem?

1. The cache is working correctly — stale data must come from the database
2. High hit rate means Redis is serving cached entries, which may not have been invalidated
3. Fast responses prove the CDN is the only layer involved
4. Hit rate is unrelated to data freshness

> Insight: Performance metrics describe speed, not correctness. A healthy hit rate can mask stale entries if invalidation failed or keys were never busted after the deploy.

### cache-q3

type: reflection

Design an invalidation strategy for this deploy. What event should trigger a bust at each layer, and what could go wrong?

> Hint: Consider deploy hooks, versioned cache keys, and time-based expiry as fallbacks.

> Insight: Strong mental models pair proactive invalidation (events, version bumps) with defensive expiry (TTL). Relying on only one strategy leaves blind spots when deploys skip hooks or keys collide.

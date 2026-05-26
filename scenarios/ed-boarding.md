---
id: ed-boarding
title: The Boarded Patient
summary: Eight ED patients await inpatient beds while the hospital runs at capacity. Reason through flow, not just bed count.
mentalModelGoal: Build a hospital operations mental model — patient flow is a queueing system where constraints move between departments, not a single “bed problem.”
keyConcepts:
  - Patient flow vs bed inventory
  - Constraint shifting
  - Discharge before admit
  - Operational leading indicators
---

## Context

Saturday 6:00 PM at Riverside General. The ED is at 125% of licensed capacity. Eight patients have “boarded” status — admitted in the chart but still physically in ED bays, average wait 5.2 hours for an inpatient bed. Bed management reports 4 open med-surg beds, but 3 are blocked for isolation pending environmental services, and 2 expected discharges have not left yet because transport and pharmacy discharge meds are delayed. Nursing leadership asks whether to open overflow beds in post-op recovery; the CMO wants to know why “we have beds on the board” but patients are still in the ED.

## Questions

### boarding-q1

type: reflection

Map the patient journey from “ED decides to admit” to “patient in inpatient room.” Where can time accumulate even when a bed appears “available” on the census board?

> Hint: Think handoffs — bed assignment, EVS turnover, transport, nurse report, and orders still in the ED.

> Insight: A bed on the board is not the same as a bed ready for a patient. Operations mental models separate **inventory** (licensed beds), **effective capacity** (clean, staffed, appropriate acuity), and **flow** (how fast patients move through each gate). Boarding usually signals a bottleneck downstream of the ED, not failure to admit.

### boarding-q2

type: multiple_choice
correct: 3

Bed management shows 4 open med-surg beds, yet boarding hours keep rising. Which explanation best fits a systems view?

1. The ED is admitting too many patients — demand is the only problem
2. Open beds are miscounted; the board is always wrong
3. Beds exist on paper but are not **throughput-ready** (blocked, wrong level of care, or discharges not completed)
4. Boarding will resolve automatically once the night shift arrives

> Insight: Census displays compress many states into one number. Blocked beds, pending discharges, acuity mismatch (e.g., no monitored bed for a patient who needs tele), and staffing limits all create **hidden queues**. Fixing boarding usually means attacking the slowest gate in the chain — often discharge acceleration or EVS/transport — not pressuring the ED to stop admitting.

### boarding-q3

type: reflection

You have 30 minutes with the house supervisor. Propose two **leading indicators** you would track tonight (not just boarding count) and one intervention that targets flow rather than opening expensive overflow space.

> Hint: Consider discharge completion rate, EVS turnaround, time from bed request to patient in room, and left-without-being-seen rate as balancing metrics.

> Insight: Strong clinical operations mental models favor **flow metrics** over static counts. Boarding hours is a lagging indicator; time-in-stage by handoff (ED → bed assigned → room ready → patient moved) exposes where to intervene. Discharge-before-admit and reducing “bed not ready” reasons often outperform adding surge beds, which can mask the constraint without relieving it.

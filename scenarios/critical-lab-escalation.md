---
id: critical-lab-escalation
title: The Panic Value
summary: A critical potassium result was auto-faxed to the wrong unit. Trace the closed-loop workflow before harm occurs.
mentalModelGoal: Develop a patient-safety operations mental model for diagnostic results — critical values are a communication protocol with timing, roles, and closure, not “a lab number.”
keyConcepts:
  - Closed-loop communication
  - Critical value escalation
  - Role clarity (who acts vs who is notified)
  - Swiss cheese / defense in depth
---

## Context

Monday 10:40 AM. The core lab releases a critical potassium of 6.4 mmol/L for Mr. Alvarez, a 68-year-old on the **4 East medical** service. The LIS routes the alert to the **6 West** nurse station printer and in-basket because his prior encounter from a weekend ED visit still has an old location flag. The covering intern is in a procedure; the attending is clinic-based until noon. A ward clerk acknowledges the fax log “received” but does not escalate because they are not sure it is their unit. At 11:15, phlebotomy is on the floor for routine draws and mentions Mr. Alvarez “looked weak” when they saw him in the hallway — still on 4 East.

## Questions

### lab-q1

type: reflection

List every step in the **ideal** critical-value workflow from result verification in the lab to confirmed treatment at the bedside. Who must **act**, who may only be **informed**, and where did this case break down?

> Hint: Lab verification, routing rules, recipient acknowledgment, clinician read-back, repeat lab, treatment order, and documentation of closure.

> Insight: Critical values are a **closed-loop** process: detect → deliver to the responsible clinician → acknowledge → act → document. Informing the wrong care team creates a false sense of completion (“someone got the fax”) while the patient’s nurse and physician never enter the loop. Operations mental models treat routing and escalation as safety equipment, not clerical overhead.

### lab-q2

type: multiple_choice
correct: 2

The fax log shows “received” at 6 West. Why is that insufficient evidence that the patient is safe?

1. Faxes are always unreliable; labs should only use pagers
2. Receipt at a location ≠ **clinical acknowledgment** by the responsible licensed clinician for that patient
3. Critical values below 7.0 are never truly emergent
4. The clerk’s acknowledgment is equivalent to the attending’s read-back

> Insight: **Acknowledgment layers** matter. Device delivery, clerical receipt, and clinician read-back with understanding are different defenses. Patient safety workflows require closure with the team that has authority and proximity to assess the patient — usually the primary nurse and covering physician on the correct unit.

### lab-q3

type: reflection

Design two **defense-in-depth** changes (people, process, or technology) that would have prevented this near-miss without blaming an individual clerk. What would you measure to know the fix is working?

> Hint: ADT/LIS location sync, dual notification paths, escalation timers, and “unacknowledged critical” dashboards.

> Insight: Hospital ops mental models use **Swiss cheese** thinking: no single fix is perfect. Pair accurate patient location in the LIS with timed escalation when unacknowledged after N minutes, plus a real-time ops dashboard of open criticals by unit. Measure **time-to-acknowledgment**, **time-to-treatment**, and **wrong-unit routing rate** — not just whether alerts were sent.

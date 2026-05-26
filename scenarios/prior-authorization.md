---
id: prior-authorization
title: The Pending Infusion
summary: A biologic infusion is scheduled in 72 hours but the payer prior auth is still in limbo. Navigate the ops workflow before the patient misses care.
mentalModelGoal: Build a prior-authorization mental model — PA is a cross-functional workflow with clinical, administrative, and payer gates; delay is a patient-access failure, not “billing paperwork.”
keyConcepts:
  - Medical necessity documentation
  - Payer rules vs clinical urgency
  - Peer-to-peer and appeals
  - Time-to-therapy as an access metric
---

## Context

Tuesday 9:00 AM at Lakeside Rheumatology–Oncology infusion suite. Ms. Rivera, 54, with moderate–severe rheumatoid arthritis, is scheduled Thursday 8:00 AM for her **first** infliximab infusion. Her commercial plan requires prior authorization for biologics. The ordering rheumatologist submitted PA through the EHR on Friday with step-therapy attestation and recent CDAI score. Monday afternoon the clearinghouse shows status **“Additional information requested”** — the payer wants six weeks of methotrexate trial documentation, but the patient failed MTX six months ago and switched to hydroxychloroquine. Specialty pharmacy will not ship drug until PA shows **approved**. Ms. Rivera took off work for Thursday, arranged childcare, and has a 90-minute drive each way. The infusion nurse coordinator asks whether to cancel the chair slot or start an appeal today.

## Questions

### prior-auth-q1

type: reflection

Map the prior-authorization workflow from **order signed** to **patient infused** — include clinical, administrative, payer, and pharmacy steps. Where is Ms. Rivera stuck right now, and who owns the next action?

> Hint: Clinical documentation, submission channel, payer clinical review, denial/RFI, peer-to-peer, appeal, approval transmission, specialty pharmacy receipt, and scheduling confirmation.

> Insight: Prior auth is not a single form — it is a **state machine**: ordered → submitted → in review → (approved | denied | RFI) → fulfilled. Each state has an owner (clinician, PA coordinator, payer nurse, pharmacy). Stuck patients usually mean an unclear owner or missing clinical artifact at a payer gate, not “insurance being slow” in the abstract.

### prior-auth-q2

type: multiple_choice
correct: 2

The payer requests six weeks of methotrexate trial proof despite documented intolerance in the chart. What is the most operationally sound next step before Thursday?

1. Cancel the infusion and reschedule in 4–6 weeks when the payer responds
2. Submit a targeted RFI response with intolerance documentation **and** initiate peer-to-peer (or expedited appeal) while preserving the chair if clinically appropriate
3. Start infliximab anyway; the hospital eats the cost if PA fails
4. Switch to a different biologic without telling the payer to avoid PA rules

> Insight: **RFI responses must be clinically legible to payer medical reviewers** — timelines, intolerances, objective scores — not chart dumps. Parallel **peer-to-peer** escalates medical necessity in real time. Cancelling without escalation trains the system to accept delay as normal; starting drug without approval creates compliance and patient-billing risk.

### prior-auth-q3

type: reflection

Propose two **operational metrics** your clinic would track for biologic starts and one process change that reduces time-to-therapy without cutting clinical review corners.

> Hint: Consider submission-to-decision hours, percent approved on first submission, chair cancellation rate due to PA, and bridge/exception pathways where policy allows.

> Insight: Strong PA mental models treat **time-to-therapy** and **appointment integrity** as access metrics, like wait time for surgery. Standardize payer-specific checklists at order entry, route RFIs to a dedicated coordinator within 4 business hours, and measure **first-pass approval rate** to improve documentation quality — not to game medical necessity.

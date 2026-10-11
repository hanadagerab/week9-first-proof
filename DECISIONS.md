# WEEK 9 — BUILD DECISIONS

Product: First-proof Hiring Handoff Lab
Role: Operator
Status: Initial setup

## Product decisions

1. First-proof appears only after candidate consideration.
2. Existing evidence is checked before creating a new task.
3. Bounded tasks use fictional training material only.
4. AI prepares evidence; a human reviewer makes the final decision.
5. Every AI draft is visibly labeled simulated.
6. No universal skill score, candidate ranking, or eligibility filter.
7. Reviewer rejection means no portable proof, not candidate failure.
8. A changed constraint tests transfer beyond memorization.
9. Neutral onboarding must not reveal assessment answers.
10. Employer commitment must exist before the pilot.
11. Valid proof waives the first work-sample test.
12. Without employer commitment, no opportunity claim is made.
13. Proof is worker-owned conceptually.
14. No personal-data persistence or database in v1.
15. No revenue or ROI claims.
16. Insufficient junior-role demand is a product-level kill condition.
17. Check existing recognized evidence, including CONOCER, before duplicating certification.

## Technical decisions

- Next.js + TypeScript + Tailwind CSS.
- Local fictional demo data.
- Deterministic simulated AI output.
- GitHub public repository.
- Vercel deployment.
- Terminal-only development.

## Build history

- Initial Next.js project created.
- Git initialized on main.
- Documentation structure prepared.

## Tomorrow's first move

Add the full PACKET and build the visual foundation.

## Phase 6 — Evidence integrity and hiring consequence

### Evidence state integrity
- Editing a base-task answer invalidates the submitted transfer response.
- Editing a transfer response invalidates downstream review state.
- Earlier evidence cannot reuse a previous human-review decision.
- The safeguard was tested locally by changing Case C01 and verifying that the transfer fields reset.

### Hiring consequence simulation
- Guided developer responses remain explicitly disclosed as assisted.
- Developer-assisted answers do not establish independent capability.
- A separate hypothetical qualifying-proof scenario demonstrates the employer's workflow rule.
- The hypothetical scenario assumes verification; it does not claim actual independent verification.
- Simulated waiver requires a non-rejected reviewer claim and employer commitment.
- Reviewer rejection prevents portable proof and the waiver.
- No employer commitment means no opportunity claim.

### Local testing
- Consideration checkpoint tested.
- Evidence-first workflow tested.
- Four-case assessment submitted.
- Changed-constraint follow-up submitted.
- Evidence invalidation tested after editing C01.
- Human Review Modify tested.
- Reviewer Reject tested.
- Employer commitment ON/OFF tested.
- Demo restart tested.
- TypeScript, ESLint, and production build passed.

### Remaining work
- Public GitHub repository.
- First Vercel deployment.
- Deployed mechanical testing and genuine bug-fix cycle.
- Complete packet diagrams and mockup assets.
- Fresh, neutral Persona Test with deployed screenshots.
- Final production verification and raw BUILDCHAT export.

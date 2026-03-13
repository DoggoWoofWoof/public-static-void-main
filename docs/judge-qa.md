# Judge Q&A Prep

## Q: "Can refugees manipulate their own score?"
**A:** No. Refugees can only submit self-declared information (profile, family, education, skills, needs). This data is reviewed by officers before it affects scoring. Refugees cannot directly verify themselves, overwrite accepted official data, or trigger formal state transitions.

## Q: "How is the ML model trained? Is it real data?"
**A:** For the hackathon, the model is trained on synthetic structured case data generated from policy-consistent evidence combinations. The synthetic label generator assigns different weights to each evidence class (official gets highest weight, self-declared gets lowest).

## Q: "What if the model is wrong?"
**A:** Every score includes a human-readable explanation — top contributing factors and blocking constraints. Officers always see *why* a score is what it is. The score is a tool for officers, not a final decision.

## Q: "How do you handle family links?"
**A:** Family links start as "declared" and go through trust states: declared → candidate_match → verified (or disputed). Officers verify links. A verified family link contributes positively to scoring.

## Q: "What about privacy?"
**A:** RLS policies restrict data access by role. Refugees see only their own case. The refugee portal has no direct communication channel — announcements are one-way from authorities. No social features.

## Q: "Is this just a UNHCR clone?"
**A:** No. UNHCR PRIMES focuses on registration logistics. BorderBridge focuses on transparent identity *confidence* scoring with an evidence graph. It's designed to complement existing systems at the data interoperability layer, not replace them.

## Q: "What evidence types do you support?"
**A:** Three classes:
- **Official:** biometric match, government record, verified NGO record
- **Corroborated:** family/employer/school confirmations
- **Self-declared:** profile details, reported family, education claims, skill declarations

Each class has different weight in the scoring model.

## Q: "What's the announcement system?"
**A:** One-way, authority-posted targeted notices. Types: appointment reminders, food/shelter/medical, document requests, screening updates, employment pathways, school enrollment. Refugees cannot reply or post.

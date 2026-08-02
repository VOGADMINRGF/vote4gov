# Vote4Gov Participation Resonance Network

**Status:** public prototype  
**Scope:** repository `vote4gov`

## Purpose

Vote4Gov no longer ends a public statement with a generic contact button. Each major thesis opens a dedicated, shareable topic room. The room asks a precise question and invites:

- counterarguments,
- sources and corrections,
- practical experience,
- alternative solutions,
- open questions,
- qualified agreement.

## Topic URLs

Topic rooms use one stable page with a topic parameter:

- `/themenraum?thema=atlas`
- `/themenraum?thema=beteiligung`
- `/themenraum?thema=ordnung`
- `/themenraum?thema=befaehigung`
- `/themenraum?thema=qualitaet`
- `/themenraum?thema=grenzenlos`
- `/themenraum?thema=gegenfragen`
- `/themenraum?thema=quellen`
- `/themenraum?thema=civic-tech`
- `/themenraum?thema=parteienfrage`

Each URL can be shared directly or opened through an on-demand QR code.

## Privacy and progressive enhancement

- Drafts are stored only in the visitor's browser through `localStorage`.
- No server-side submission happens silently.
- The user decides whether to copy, share, email or transfer a structured draft to the practical participation environment.
- QR images are loaded only after explicit interaction. The QR dialog discloses that an external QR rendering service is used.
- Every room remains usable without QR rendering.

## Civic-tech transparency

The public landscape page names Decidim, CONSUL Democracy and Polis as relevant open-source work. The own implementation is shown in the same landscape and must be judged by the same criteria. The page is not a ranking.

## Party thesis

The party page separates:

1. constitutional and statutory facts,
2. institutional consequences,
3. political analysis,
4. open normative questions.

The thesis is not anti-party. It tests whether an open democratic space should exist independently before a possible electoral vehicle is chosen.

## Quality gate

Before publication, verify:

- every major main-page thesis has one specific room,
- QR handoff opens the correct room,
- keyboard and mobile navigation work,
- local drafts survive a reload,
- no contribution is transmitted without an explicit user action,
- civic-tech descriptions link to official project sources,
- legal claims link to official German sources,
- the own implementation is not presented more favorably than documented evidence supports.

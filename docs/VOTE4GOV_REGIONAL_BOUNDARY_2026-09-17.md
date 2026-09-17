# Vote4Gov Regional Boundary — 2026-09-17

Status: LEGACY REGIONAL SPLIT IMPLEMENTED

## Canonical roles

- Vote4Gov: system review, theses, institutional questions and international comparison.
- VoiceOpenGov: people, membership, regional community, local activation and territorial entry points.
- eDebatte: sources, counterpositions, dossiers, alternatives, participation, voting and impact.

## Final regional truth

- `/systeme-laender` is the canonical Vote4Gov surface for comparing political systems, levels and international contexts.
- `/regionen` and `/regionen.html` permanently redirect to `/systeme-laender`.
- The former Vote4Gov territorial HTML hierarchy under `/de/` has been removed from the repository.
- The former Germany hub redirects to `/systeme-laender#deutschland`.
- The 16 former German state URLs permanently redirect to their matching VoiceOpenGov region pages.
- The former Europe hub redirects to `/systeme-laender#europa`.
- The former worldwide, Africa, Asia, Latin America/Caribbean, North America and Oceania hubs redirect to `/systeme-laender#international`.
- eDebatte remains the handoff for evidence and dossier work.
- VoiceOpenGov remains the handoff for regional community and local activation.

## Content retention decision

The 16 state pages were reviewed as thin templated mixed pages. Their recurring analytical content was limited to general principles such as separating state/municipal responsibility, recognising city-state or district layers and keeping regional effects visible. They did not contain a distinct sourced state-specific analysis that justified maintaining a second public territorial surface at Vote4Gov.

The global/continent pages contained reusable comparison principles rather than distinct dossiers. Their useful material has been consolidated into `/systeme-laender`, including:

- context before model transfer;
- subregions instead of treating continents as uniform political systems;
- cross-border effects and shared responsibilities;
- multilingual access without creating parallel factual realities;
- Germany's federal/state/local layering including city-state specifics.

## Redirect matrix

### Vote4Gov analytical retention

- `/de/deutschland` → `/systeme-laender#deutschland`
- `/de/europa` → `/systeme-laender#europa`
- `/de/weltweit` → `/systeme-laender#international`
- `/de/afrika` → `/systeme-laender#international`
- `/de/asien` → `/systeme-laender#international`
- `/de/lateinamerika-karibik` → `/systeme-laender#international`
- `/de/nordamerika` → `/systeme-laender#international`
- `/de/ozeanien` → `/systeme-laender#international`

### VoiceOpenGov regional ownership

All former Vote4Gov state routes under `/de/deutschland/<state>` redirect permanently to:

`https://www.voiceopengov.org/regionen/deutschland/<state>`

for the exact 16 German state slugs.

## Definition of done

The legacy regional split is considered complete only while CI proves all of the following:

- no territorial `de/**/*.html` pages exist in Vote4Gov;
- every retired German state path has an explicit permanent VoiceOpenGov redirect;
- retired Germany/Europe/world-region hubs redirect to the retained Vote4Gov analytical surface;
- `/systeme-laender` contains the retained comparison principles and the VoiceOpenGov/eDebatte boundary;
- the sitemap does not advertise retired territorial URLs;
- static links remain valid;
- browser regression passes at desktop, mobile, 320 px and no-JS where applicable.

If a future country or region deserves a Vote4Gov page, it must be an independently substantive analytical review rather than a territorial/community landing page.

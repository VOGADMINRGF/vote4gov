# Vote4Gov Regional Boundary — 2026-09-17

Status: SAFE BOUNDARY IMPLEMENTED / LEGACY SPLIT PENDING

## Canonical roles

- Vote4Gov: system review, theses, institutional questions and international comparison.
- VoiceOpenGov: people, membership, regional community, local activation and territorial entry points.
- eDebatte: sources, counterpositions, dossiers, alternatives, participation, voting and impact.

## Current safe state

- `/systeme-laender` remains the canonical Vote4Gov surface for comparing political systems and levels.
- `/regionen` and `/regionen.html` already redirect to `/systeme-laender`.
- Vote4Gov `sitemap.xml` does not advertise the legacy `/de/*` territorial pages.
- `vercel.json` sends `X-Robots-Tag: noindex, follow` for `/de/:path*`.
- `/systeme-laender` now links explicitly to `https://www.voiceopengov.org/regionen` for regional community and local activation.
- eDebatte remains the handoff for evidence and dossier work.

## Why the legacy `/de/*` pages are not bulk-redirected yet

A sample review of `/de/deutschland/berlin/` shows mixed content: part analytical system/context material, part regional participation/community framing. A blind redirect would either discard useful Vote4Gov analysis or pretend that an analytical page is equivalent to a VoiceOpenGov community page.

Therefore each legacy page must be classified before redirect:

1. retain/rewrite analytical material at Vote4Gov;
2. move community/territorial intent to VoiceOpenGov;
3. preserve eDebatte handoffs for evidence work;
4. only then apply a 301 where no distinct Vote4Gov analytical page remains.

## Definition of done for the legacy split

A legacy territorial page is only complete when:

- its analytical content has an explicit keep/move/delete decision;
- any retained Vote4Gov page has a distinct analytical title and purpose;
- community language points to VoiceOpenGov rather than implying a Vote4Gov regional organization;
- evidence/dossier work points to eDebatte;
- the old URL either redirects intentionally or remains noindex for a documented reason;
- sitemap, canonical, breadcrumbs and internal links agree with that decision.

No page should be marked migrated merely because a target URL exists.

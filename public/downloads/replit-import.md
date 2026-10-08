# AllSail — TMG’s Safe Anchoring, Lagoon 42

Import this file into Replit Agent as the product brief. Build the course described here. Do not invent extra lessons, change the quiz answers, or rehost the films.

## What to ship

A mobile-first training site for AllSail (Pittwater, Church Point). Two modules on one page, a working deployment calculator, and a downloadable SCORM 1.2 package for the anchoring module.

Title: **TMG’s Safe Anchoring – Lagoon 42**

Stack: Vite, React, plain CSS or Tailwind. No accounts, no database. Persist the learner’s place in `localStorage`. Also speak SCORM 1.2 when an LMS provides `window.API`.

## Brand

From the AllSail Impulso brochure. Do not use a dark green chart, gold serif, or a night-time compass card.

| Token | Hex | Use |
|---|---|---|
| Paper | `#F6F2EC` | Page background |
| Surface | `#EFE9DD` | Cards |
| Navy | `#0B2430` | Text, wordmark “ALL” |
| Coral | `#D45A42` | Wordmark “SAIL”, primary buttons, the second title line |
| Teal | `#0E4A5C` | Small caps labels |
| Line | `#D8D0C2` | Borders |

Wordmark: Times, `ALL` in navy and `SAIL` in coral. Under it, tracked small caps: `PITTWATER · CHURCH POINT`. Body type: Outfit, or Helvetica if Outfit is unavailable. Light colour scheme. No horizontal scroll at 390px. Buttons at least 44px tall.

Share card, if you make one: paper left half, navy sea and paper sky on the right, a white Lagoon 42 under sail, title **TMG’s Safe Anchoring – Lagoon 42**. No green water.

## Films — embed only

AllSail may show these films inside the lesson. Do not download, trim, or re-upload them. Use the YouTube nocookie embed, and only after the learner taps a branded poster. Poster: navy field, coral Play button, title in paper type. Credit the maker on the poster and under the film.

1. Anchoring — TMG Yachts, Joe Fox, Lagoon 42.  
   Watch: https://youtu.be/i_SqmhP4hPU  
   Embed: `https://www.youtube-nocookie.com/embed/i_SqmhP4hPU`  
   Notes: https://www.themultihullgroup.com/inspire-and-learn-how-to-anchor-and-set-up-bridle/
2. Approach — TMG Yachts Australia, Joe Fox, Lagoon 42, “Catamaran Manoeuvring Tips & Leaving a Marina” (Docking Part 1).  
   Watch: https://youtu.be/wagOy9IpjMY  
   Embed: `https://www.youtube-nocookie.com/embed/wagOy9IpjMY`  
   Credit line: TMG Yachts Australia. Site: https://tmgyachts.com/

## Shell

Sticky header. Wordmark on the left. Two module switches: **Scope** and **Approach**. Approach opens first. A step rail under the header. One column, max width 48rem. Coral pill = current step. Next and Back at the bottom of each step.

## Module A — Scope (anchoring)

Steps, in order: Brief, Six, Scope, Swing, Chart, Bridle, Quiz, Record.

Safety rule, say it in plain language on the brief: scope the rode for the **highest** water in the next 24 hours, and check the swing circle at the **lowest** water. Both gates must pass. Do not anchor in a mooring field.

### Six components (Joe Fox, Lagoon 42)

1. The anchor
2. Wind and tidal flow
3. How much chain you drop
4. Setting the hook
5. The bridle
6. Communication and maneuvering between bow and helm

Prep before the anchor goes down: remote out of the hatch and onto the deck; bridle and gear clear of the chain; prime the anchor over the roller with a touch of chain.

Light, benign wind in the film: 3–4× depth. Around 20 knots, ready for about 25: 5, 6, or 7×. This course briefs a 24-hour stay at **7:1**, applied to roller-to-seabed at high water, not to the depth showing when you drop.

Windlass in the film has no counter and pays out 1 metre every 2 seconds. 15 m is 30 seconds. A counter is better. The clock is the backup.

### Calculator

Inputs, with the assessment defaults:

| Input | Default |
|---|---|
| Chart depth | 4.0 m |
| Bow-roller height above the water (freeboard) | 1.2 m |
| Length overall | 12.8 m |
| Draft | 1.22 m |
| Bridle reach forward of the bows | 5.5 m |
| Bridle loop (extra chain after the hook) | 6 m |
| Chain on board | 80 m |
| Clearance to nearest hazard | 80 m |
| Scope target | 7 |
| Stay start | 16:00 |
| Drop is between mooring buoys | off |
| Tide extremes | 03:10 / 0.3 m, 09:25 / 1.9 m, 15:40 / 0.4 m, 21:55 / 1.7 m |

Let the learner edit every field and add or remove tide rows. Refuse a scope target below 4. Require at least two tide times, unique, as `HH:MM`.

Tide between extremes is a cosine interpolation, not a straight line. Wrap the extremes across midnight so a 24-hour stay that starts at 16:00 still sees the next morning’s high.

```
rollerToSeabed = chartDepth + tideHeight + freeboard
workingRode    = scopeTarget × rollerToSeabed(at the highest tide in the stay)
horizontal     = √(workingRode² − rollerToSeabed²)
swingRadius    = horizontal + bridleReach + lengthOverall
totalVeer      = workingRode + bridleLoop
underKeel      = (chartDepth + tideHeight) − draft
```

Scope is worst at the deepest moment. Swing is worst at the shallowest moment, because the same rode lies flatter and the circle grows. The bridle loop unloads the windlass. It is not extra scope and it is not the swing radius.

A plan is cleared only when all of these are true:

- Not a mooring field.
- `totalVeer` does not exceed chain on board.
- Low-water swing radius does not exceed clearance.
- Low-water under-keel clearance is at least 0.5 m.

Show high-water scope, low-water swing ratio, working rode, total veer, swing radius, and a 24-hour chart (tide and swing). Also show the two wrong answers: 7 × chart depth alone, and 7 × (chart depth + freeboard) with the tide ignored. On the assessment numbers those are 28.0 m and 36.4 m. The correct working rode is 7 × (4.0 + 1.9 + 1.2) = **49.7 m**.

Windlass time on the record: `totalVeer × 2` seconds.

There is a second preset, “swing trap”: same plan, clearance 60 m. That plan must fail. Low-water swing reaches the yacht. Do not offer “shorten the rode until it fits” as a pass. Cutting scope to buy room is how boats drag on the top of the tide.

### Quiz A — 80% to pass

One question at a time. Four choices. Show why the right one is right after they answer. Score is correct ÷ 10, rounded to a percent. The correct choice is the first one listed here. You may shuffle the display order, but the key must stay this choice.

1. **Six components.** Anchor; wind and tidal flow; how much chain you drop; setting the hook; the bridle; communication and maneuvering. Not abandon-ship kit, not instruments, not a sail plan.
2. **Prep.** Remote on deck; bridle and gear clear of the chain; prime the anchor over the roller with a touch of chain.
3. **Light air.** Three to four times the depth.
4. **About 20 knots.** About 5, 6, or 7 times the depth.
5. **No counter.** 15 metres is 30 seconds.
6. **Which high sets the scope.** 1.9 m at 09:25 — the highest water while you are on the hook. Not the next high (1.7 m at 21:55), not the low, not the average.
7. **Working rode.** 49.7 m — 7 × (4.0 + 1.9 + 1.2). Not 28.0, not 36.4, not 41.3.
8. **Low-water swing radius.** Horizontal reach plus 5.5 m of bridle plus 12.8 m of boat. Not the rode alone, not rode plus the loop, not the hull alone.
9. **60 m to the next yacht.** Do not deploy. Low-water swing reaches that yacht. Shortening the rode to shrink the circle gives up 7:1 at high water. Do not deploy between mooring buoys.
10. **Bridle.** Hook over one whole link, sprung pin home, then another 5–6 m so the chain hangs in a slack loop. Do not pass the hook through the link.

Pass also requires a cleared deployment on the assessment plan (clearance 80 m, not the 60 m trap, not a mooring field). 80% with a failed plan is not a pass.

### SCORM 1.2

Package id `com.highwaterscope.catamaran-anchor.12`. Organisation title `High Water Scope — Catamaran Anchor Safety`. Item title `High Water Scope`. Mastery score 80. One SCO: `index.html`, plus `course.css` and `engine.js`.

`engine.js` finds `window.API` (or `window.parent.API`, then `window.top`). If none, run in preview and store `cmi.*` in `sessionStorage`.

Write, and commit:

- `cmi.core.lesson_location` — step id
- `cmi.suspend_data` — JSON `{ step, answers, deployCleared, bestScore }`
- `cmi.core.exit` — `suspend`
- `cmi.core.score.raw`, `min` 0, `max` 100 — best percent
- `cmi.core.lesson_status` — `passed` only if best ≥ 80 and the deployment was cleared; `failed` if a finished sitting is under 80; otherwise `incomplete`

Call `LMSInitialize`, `LMSSetValue`, `LMSCommit`, `LMSFinish`. Finish on `pagehide`. On return, restore the step and the answers. Offer a zip of those three files from the Record step.

## Module B — Approach (follow-on)

Credit TMG Yachts Australia. Steps: Film, Wind, Astern, Quiz, Result. This module is the approach, not the anchoring setup.

Three rules, on the film step and again in the quiz:

1. **Rear to the wind.** The stern points into the wind. You reverse onto the mooring or the dock. Head to wind is how you drop the hook, not how you come onto a buoy.
2. **Reverse with both engines.** Revs matched. Opposite throttles are the spin Joe uses to pivot off a fender. That spin is wrong for this approach.
3. **Lock the steering off.** Propeller wash throws free rudders off centre and the boat yaws even when the throttles match. Locked amidships, only the throttles steer.

Wind off the pontoon: stern toward that face, both engines in reverse, wheel locked. Ease them and the wind blows you back off. That is the abort.

Wind onto the pontoon, 15–20 knots, and you are still bow-on: do not finish bow-first. Go round until the stern is to the wind, then reverse in. Both engines ahead will drag the stern along the pontoon.

If the stern walks off while both throttles are matched in reverse, check the lock first. Do not add helm, and do not put one engine ahead.

### Quiz B — 80% to pass

Same pattern. Correct choice is the one written here.

1. **Committing to a mooring.** The stern. Put the rear to the wind and back up onto the pickup.
2. **Wind blowing off the pontoon.** Stern toward the pontoon, both engines in reverse, steering locked.
3. **15–20 knots onto the pontoon, still bow-on.** Go round until the stern is to the wind, then reverse in on both engines with the wheel locked.
4. **Final approach.** Both in reverse, revs matched.
5. **Why lock the wheel.** Propeller thrust washes the rudders. Free, they twist off centre.
6. **Stern walks off.** The wheel is no longer locked. Lock it off again. Do not add helm.

Store this module’s progress in `localStorage`. It does not have to be inside the SCORM package.

## Out of scope

No sign-in. No payments. No map. No second boat. Do not rewrite Joe’s method. Do not add a green nautical chart as the brand.

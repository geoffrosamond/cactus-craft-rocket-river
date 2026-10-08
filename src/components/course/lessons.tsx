import { FILM } from "@/lib/anchor/course";
import { ASSESSMENT, buildPlan, metres, ratioText } from "@/lib/anchor/model";

const plan = buildPlan(ASSESSMENT);

function Rule({ index, title, children }: { index: string; title: string; children: string }) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-4">
      <span className="font-serif text-xl text-brass">{index}</span>
      <div>
        <p className="font-medium text-fg">{title}</p>
        <p className="mt-1 text-sm text-muted">{children}</p>
      </div>
    </li>
  );
}

export function BriefLesson() {
  return (
    <article className="space-y-5">
      <p className="font-serif text-3xl leading-tight text-fg">Scope the high. Swing the low.</p>
      <p className="text-muted">
        Built from {FILM.maker}’s film of {FILM.instructor} anchoring a {FILM.boat}. He shows the six parts of the job
        and the chain multiples he actually uses. He does not run a 24-hour tide. A deployment is not successful here
        until both of those numbers have been taken off the tide chart for the whole stay.
      </p>
      <p>
        <a className="text-brass underline decoration-line underline-offset-4" href={FILM.url}>
          Watch the film
        </a>
        <span className="text-muted"> · </span>
        <a className="text-brass underline decoration-line underline-offset-4" href={FILM.blog}>
          Read TMG’s notes
        </a>
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-surface p-4">
          <p className="text-sm text-muted">Scope ratio, checked at high water</p>
          <p className="mt-2 font-serif text-2xl">Rode ÷ roller depth</p>
          <p className="mt-2 text-sm text-muted">
            Deepest moment of the next 24 hours. Add the bow roller. This is when a short scope lifts the anchor.
          </p>
        </div>
        <div className="rounded-md border border-line bg-surface p-4">
          <p className="text-sm text-muted">Swing ratio, checked at low water</p>
          <p className="mt-2 font-serif text-2xl">Reach ÷ roller depth</p>
          <p className="mt-2 text-sm text-muted">
            Shallowest moment. The same chain reaches further across the bottom, and the stern is still a boat-length
            beyond that.
          </p>
        </div>
      </div>
      <p className="text-sm text-muted">
        Passed means 80% on the quiz and a recorded plan for the assessment anchorage that clears both gates. The
        sample tides are a worked chart, not a forecast for any real harbour.
      </p>
    </article>
  );
}

export function SixLesson() {
  return (
    <article>
      <h1 className="font-serif text-3xl leading-tight">The six components in the film</h1>
      <p className="mt-3 text-muted">
        On the {FILM.boat} the draft is just over 1.2 m, so the bays he uses are shallow. Shallow water is exactly
        where a short scope fails first. The wind in the film is a light northerly. He still plans as if it could
        reach 25 knots.
      </p>
      <ol className="mt-4">
        <Rule index="01" title="The anchor">
          Nothing else in the list matters if the hook on the roller is the wrong gear, fouled, or not over the edge
          before you commit.
        </Rule>
        <Rule index="02" title="Wind and tidal flow">
          They decide which way you will lie, and the tide chart decides how much water you will have later. He
          anchors head to wind.
        </Rule>
        <Rule index="03" title="How much chain">
          Light and benign: 3–4× depth. Around 20 knots: 5–7×. More chain holds only if the anchor has been set.
        </Rule>
        <Rule index="04" title="Setting it">
          Reverse until the chain is tight at a shallow angle. Ease off. The boat should spring back. Then a transit
          on two fixed marks — not a moving animal, not another boat.
        </Rule>
        <Rule index="05" title="The bridle">
          Two lines, one hook, load shared between the hulls. Centre of effort moves about 5–6 m forward, which damps
          the horsing a catamaran does around a single bow roller.
        </Rule>
        <Rule index="06" title="Communication and maneuvering">
          Bow and helm are about 8 m apart. Agree the plan and the hand signals before you enter. Short-handed, he
          primes the anchor on the bow and runs the remote from the helm.
        </Rule>
      </ol>
    </article>
  );
}

export function ScopeLesson() {
  return (
    <article className="space-y-4">
      <h1 className="font-serif text-3xl leading-tight">The multiple is applied at high water</h1>
      <p className="text-muted">
        Scope is rode length divided by the distance from the bow roller to the seabed. The film’s multiples are
        right. The depth they multiply is not the number on the sounder at the moment you drop.
      </p>
      <p className="rounded-md border border-line bg-surface-2 px-4 py-3 font-medium text-brass">
        D(t) = chart depth + tide(t) + freeboard
        <br />
        Working rode L = scope target × the largest D in the 24-hour stay
      </p>
      <p>
        Freeboard is in the sum because the chain leaves the roller, not the waterline. A comment on the film makes
        the same point: 4 m of water and 1 m of roller is a 5 m drop, not a 4 m drop.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-line p-3">
          <p className="text-sm text-muted">Chart depth only</p>
          <p className="mt-1 font-serif text-2xl">{metres(plan.naiveChartOnly)}</p>
          <p className="text-sm text-fail">Becomes {ratioText(plan.naiveChartOnlyScope)} at high water</p>
        </div>
        <div className="rounded-md border border-line p-3">
          <p className="text-sm text-muted">Add the roller, ignore the tide</p>
          <p className="mt-1 font-serif text-2xl">{metres(plan.naiveNoTide)}</p>
          <p className="text-sm text-fail">Becomes {ratioText(plan.naiveNoTideScope)} at high water</p>
        </div>
        <div className="rounded-md border border-brass p-3">
          <p className="text-sm text-muted">High water of the stay</p>
          <p className="mt-1 font-serif text-2xl">{metres(plan.workingRode)}</p>
          <p className="text-sm text-brass">Holds {ratioText(plan.scopeAtHigh)}</p>
        </div>
      </div>
      <p className="text-sm text-muted">
        Assessment chart: 4.0 m below datum, roller 1.2 m, highest tide in the stay {plan.high.tide.toFixed(1)} m at{" "}
        {plan.high.time}. Roller-to-seabed {metres(plan.high.vertical)}. At 7:1, for about 20 knots, that is{" "}
        {metres(plan.workingRode)} of working chain. The pull angle off the seabed is {plan.pullAngleAtHigh.toFixed(1)}
        °. At 3:1 that angle is about 19°, which is why a light-air minimum is not an overnight plan once the tide
        has a say.
      </p>
      <p>
        After the hook is on, veer another {metres(ASSESSMENT.bridleLoop)} so the bridle takes the load. That loop is
        not scope. Total off the gypsy: {metres(plan.totalVeer)}.
      </p>
    </article>
  );
}

export function SwingLesson() {
  return (
    <article className="space-y-4">
      <h1 className="font-serif text-3xl leading-tight">The circle is largest at low water</h1>
      <p className="text-muted">
        For a taut rode the horizontal reach is the other side of the same triangle. Divide that reach by the
        roller-depth and you have the swing ratio. It is fixed by the scope you actually have at that moment:
      </p>
      <p className="rounded-md border border-line bg-surface-2 px-4 py-3 font-medium text-brass">
        Swing ratio W = √(scope² − 1)
        <br />
        Swing radius = √(L² − D²) + bridle reach + length overall
      </p>
      <p>
        D is smallest at low water, so W and the radius are largest then. On the assessment stay the low is{" "}
        {plan.low.tide.toFixed(1)} m at {plan.low.time}. Roller-depth {metres(plan.low.vertical)}. Scope there opens
        out to {ratioText(plan.scopeAtLow)}, swing ratio {ratioText(plan.swingRatioAtLow)}, radius{" "}
        {metres(plan.swingAtLow)}.
      </p>
      <p>
        At high water the same chain is a smaller circle, {metres(plan.swingAtHigh)}. Clearing the high-water circle
        and then going to sleep is how you meet the boat that was “just outside” you at dusk.
      </p>
      <p className="text-sm text-muted">
        The bridle damps yaw. Joe moves the centre of effort 5–6 m forward. That distance is added to the radius
        because the stern is that far beyond the chain’s reach. It does not cancel the circle. Do not anchor between
        mooring buoys: they barely swing, and you do.
      </p>
      <p>
        Under-keel is the other low-water check. Water depth at the low is {metres(plan.waterLow)}. Draft{" "}
        {metres(ASSESSMENT.draft)} leaves {metres(plan.underKeelLow)}. This module wants at least half a metre.
      </p>
    </article>
  );
}

export function BridleLesson() {
  return (
    <article className="space-y-4">
      <h1 className="font-serif text-3xl leading-tight">Set it, then unload the windlass</h1>
      <p className="text-muted">
        The arithmetic does not set the anchor. This is the film’s order, once the 24-hour rode is already decided.
      </p>
      <ol className="mt-2">
        <Rule index="01" title="Read the bay before you enter">
          Contours, a flat patch, and the uncharted shallows. Put a waypoint on the spot. Do not pick a hole between
          mooring buoys because it looks empty.
        </Rule>
        <Rule index="02" title="Stop, head to wind, then drop">
          Signal the bow. Let the anchor go. Only once it is on the bottom, motor astern so the chain lays out
          instead of piling on the shank.
        </Rule>
        <Rule index="03" title="Know when it has landed">
          While it is hanging, the chain is tight across the deck. When it touches, that tension goes. Depth and the
          windlass rate tell you the same thing if you cannot see it.
        </Rule>
        <Rule index="04" title="Set, then prove it">
          A firm astern pull. Tight chain, shallow angle, and the boat springs forward when you ease the throttles.
          Take a transit on fixed shore marks. If the marks walk, you are dragging. Reset.
        </Rule>
        <Rule index="05" title="Bridle on a whole link">
          Hook over one complete link. Sprung pin home. Do not pass the hook through the link — it jams on the way
          up. Veer another 5–6 m. The chain from roller to hook hangs in a loop. The windlass is no longer towing the
          boat.
        </Rule>
        <Rule index="06" title="Leave the same way">
          Engines on so the winch has power. Bridle up first, and clear of the chain. Edge the boat forward onto the
          anchor. Arm signals for where the chain leads. Do not drive over it, and do not let the windlass drag the
          boat.
        </Rule>
      </ol>
      <p className="text-sm text-muted">
        No counter on that windlass: 1 metre every 2 seconds. The assessment veer of {metres(plan.totalVeer)} is{" "}
        {plan.windlassSeconds.toFixed(0)} seconds under that rule. Use it as a check, not as a substitute for
        knowing what you meant to put out.
      </p>
    </article>
  );
}

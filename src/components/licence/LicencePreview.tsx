export function LicencePreview() {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-6 text-fg">
      <p className="text-xs tracking-widest text-muted">DRAFT · NOT LEGAL ADVICE · NOT SIGNED</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight">Content licence</h1>
      <p className="mt-3 text-sm text-muted">Date: [●] 2026</p>
      <a
        className="mt-4 inline-flex h-11 items-center bg-brass px-4 text-sm font-medium text-brass-ink"
        href="/downloads/tmg-youtube-content-licence.pdf"
        download
      >
        Download PDF
      </a>

      <h2 className="mt-8 font-serif text-2xl">Parties</h2>
      <ol className="mt-3 list-decimal space-y-3 pl-5">
        <li>
          <strong>TMG Yachts Pty Ltd</strong> ABN 73 606 621 238, ACN 606 621 238, of The Quays Marina, 1856 Pittwater
          Road, Church Point NSW 2105 (Licensor).
        </li>
        <li>
          <strong>[Full legal name of the Juvin8 entity]</strong> ABN [●], of [address] (Producer), trading as
          Juvin8.ai.
        </li>
        <li>
          <strong>Cintra Pty Ltd</strong> ABN 17 106 425 736, ACN 106 425 736, of New South Wales 2105, trading as
          AllSAIL (End User).
        </li>
      </ol>

      <h2 className="mt-8 font-serif text-2xl">Background</h2>
      <div className="mt-3 space-y-3">
        <p>
          A. The Licensor publishes boating films on the YouTube channel TMG Yachts, including the films in Schedule 1.
          Joe Fox appears in those films. A YouTube upload is not, by itself, a licence to build a commercial course
          around them.
        </p>
        <p>
          B. The Producer builds e-learning modules. The End User wants to use two of those modules to train people who
          sail with AllSAIL on Pittwater.
        </p>
        <p>C. The Licensor is willing to licence the films for that use only, on the terms below.</p>
      </div>

      <h2 className="mt-8 font-serif text-2xl">1. What is licensed</h2>
      <div className="mt-3 space-y-3">
        <p>
          1.1 The Licensor grants the Producer a non-exclusive licence to include the Films in the Modules, and to
          license each finished Module to the End User, so that the End User may show the Films to Authorised Viewers.
        </p>
        <p>
          1.2 Authorised Viewers are the End User’s employees, contractors, charter crew, and paying or booked
          customers of AllSAIL, and no one else.
        </p>
        <p>
          1.3 The licence covers Australia only. It may be used for training on Pittwater or online for those same
          viewers. It is not a licence to offer the Modules to the public, or to any other sailing school.
        </p>
        <p>
          1.4 The Producer may sublicense only to the End User, and only for the Modules. The End User may not
          sublicense or lend them on.
        </p>
      </div>

      <h2 className="mt-8 font-serif text-2xl">2. How the films may be shown</h2>
      <div className="mt-3 space-y-3">
        <p>
          2.1 The Films stay on YouTube and play only through the official player, from the URLs in Schedule 1.
          Playback starts after the viewer presses play on a poster that names TMG Yachts.
        </p>
        <p>
          2.2 Do not download, rip, trim, dub, subtitle, re-upload, or store a copy of a Film, and do not put a video
          file inside a SCORM package. A SCORM package may hold the lesson text and the quiz. It must not hold the
          picture or sound of a Film.
        </p>
        <p>2.3 The Films are shown whole. No cut-down and no advertisement inside the player.</p>
        <p>
          2.4 YouTube’s terms still apply. If YouTube removes a Film or disables embedding, the licence for that Film
          pauses until the Licensor supplies another official embed, or ends for that Film if none is supplied within
          30 days.
        </p>
      </div>

      <h2 className="mt-8 font-serif text-2xl">3. Credit</h2>
      <div className="mt-3 space-y-3">
        <p>
          3.1 Every screen that offers a Film, and the first screen of each Module, must say in substance: “Film by TMG
          Yachts. Instructor: Joe Fox. Used with permission. The course text and quiz are by Juvin8.ai for AllSAIL.”
        </p>
        <p>
          3.2 Do not say that TMG Yachts wrote the course, marked the quiz, certified the learner, or approved the boat
          for sea. A pass mark is not a TMG qualification.
        </p>
      </div>

      <h2 className="mt-8 font-serif text-2xl">4. The modules</h2>
      <p className="mt-3">
        Copyright in the Films stays with the Licensor. Copyright in the original course text, quiz, and calculator
        stays with the Producer. The Modules may explain high-water scope, low-water swing, and a stern-to-wind
        approach. That explanation must stay fair to what is said on screen.
      </p>

      <h2 className="mt-8 font-serif text-2xl">5. Fee and term</h2>
      <p className="mt-3">
        The Producer pays the fee in Schedule 3, plus GST, within 14 days of a tax invoice. The licence starts when
        the last party signs and runs for the term in Schedule 3. On ending, the players come out of the Modules
        within 7 days. No copy of a Film is kept.
      </p>

      <h2 className="mt-8 font-serif text-2xl">6. Promises</h2>
      <div className="mt-3 space-y-3">
        <p>
          The Licensor warrants that it can grant this licence, including Joe Fox’s performance in the Films. The Films
          are training aids, not advice for a particular anchorage or berth. Liability is capped at the fees paid in
          the previous 12 months, except where the Australian Consumer Law does not allow a cap.
        </p>
        <p>
          The Producer and the End User will not present AllSAIL or Juvin8.ai as part of TMG Yachts, and will not issue
          a certificate in TMG’s name. New South Wales law governs the agreement.
        </p>
      </div>

      <h2 className="mt-8 font-serif text-2xl">Schedule 1 — The Films</h2>
      <div className="mt-3 overflow-x-auto border border-line">
        <table className="w-full text-left text-sm">
          <thead className="text-muted">
            <tr className="border-b border-line">
              <th className="px-3 py-2 font-medium">Film</th>
              <th className="px-3 py-2 font-medium">Instructor</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line">
              <td className="px-3 py-2">How to Anchor and Set Up a Bridle on a Catamaran</td>
              <td className="px-3 py-2">Joe Fox, Lagoon 42</td>
            </tr>
            <tr>
              <td className="px-3 py-2">Catamaran Manoeuvring Tips & Leaving a Marina</td>
              <td className="px-3 py-2">Joe Fox, TMG Yachts</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">https://youtu.be/i_SqmhP4hPU and https://youtu.be/wagOy9IpjMY</p>

      <h2 className="mt-8 font-serif text-2xl">Schedule 2 — The Modules</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5">
        <li>TMG’s Safe Anchoring – Lagoon 42, also called High Water Scope, using Film 1.</li>
        <li>Approach: stern to the wind, both engines in reverse, wheel locked, using Film 2.</li>
      </ol>

      <h2 className="mt-8 font-serif text-2xl">Schedule 3 — Still blank</h2>
      <div className="mt-3 overflow-x-auto border border-line">
        <table className="w-full text-left text-sm">
          <tbody>
            <tr className="border-b border-line">
              <th className="px-3 py-2 text-left font-medium">Fee</th>
              <td className="px-3 py-2">A$ [●] plus GST, paid by the Producer</td>
            </tr>
            <tr className="border-b border-line">
              <th className="px-3 py-2 text-left font-medium">Term</th>
              <td className="px-3 py-2">[●] years</td>
            </tr>
            <tr>
              <th className="px-3 py-2 text-left font-medium">Licensor email</th>
              <td className="px-3 py-2">tmg@tmgyachts.com</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-muted">
        Signing blocks for TMG Yachts Pty Ltd, the Producer, and Cintra Pty Ltd trading as AllSAIL are on the PDF.
      </p>
    </article>
  );
}

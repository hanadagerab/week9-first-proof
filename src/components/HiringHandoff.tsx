"use client";

import { useState } from "react";
import type { ReviewResult } from "./HumanReview";

type HiringHandoffProps = {
  review: ReviewResult;
  assistance: string;
  onBack: () => void;
  onRestart: () => void;
};

export default function HiringHandoff({
  review,
  assistance,
  onBack,
  onRestart,
}: HiringHandoffProps) {
  const [commitment, setCommitment] = useState(true);

  const hasClaim =
    review.decision !== "reject" && Boolean(review.claim);

  // A guided developer test cannot establish independent capability.
  const independentVerification = false;

  const waiverAvailable =
    hasClaim && commitment && independentVerification;

  return (
    <section className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-[#237d70]">
        STEP 08 / HIRING HANDOFF
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Evidence meets a hiring decision.
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        Laura Méndez reviews the outcome for Daniela Ruiz,
        who entered consideration before First-proof was used.
        This is a fictional hiring-process simulation.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Fictional candidate
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Daniela Ruiz
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Junior Customer Operations Coordinator
            </p>
          </div>

          <span className="rounded-full bg-[#edf5f3] px-3 py-2 text-xs font-semibold text-[#176457]">
            Already in consideration
          </span>
        </div>

        <p className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
          First-proof did not determine eligibility or initial review order.
          It cannot rank candidates or automatically reject them.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold">
          Human review outcome
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          {review.reviewer} · Simulated reviewer action
        </p>

        {hasClaim ? (
          <>
            <div className="mt-5 rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Human-reviewed narrow observation
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {review.claim}
              </p>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Reviewer decision: {review.decision}
            </p>
          </>
        ) : (
          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <h3 className="font-semibold">
              No portable proof generated.
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              No negative score or failed-candidate record is created.
              The normal hiring process may continue independently.
            </p>
          </div>
        )}

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-sm font-semibold">
            Reviewer explanation
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {review.reason}
          </p>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-sm font-semibold">
            Assistance disclosure
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {assistance}
          </p>
          <p className="mt-3 text-sm text-amber-800">
            Independent capability was not established in this
            guided developer test.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#237d70]">
          Simulated employer agreement
        </p>

        <h2 className="mt-3 text-xl font-semibold">
          Pre-agreed hiring consequence
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Norte Components agreed before the fictional pilot that
          qualifying, independently verified First-proof evidence
          would replace the first work-sample test.
        </p>

        <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">
          <input
            type="checkbox"
            checked={commitment}
            onChange={(event) => setCommitment(event.target.checked)}
            className="h-4 w-4 accent-[#237d70]"
          />
          <span className="text-sm font-medium">
            Employer commitment existed before the pilot
          </span>
        </label>

        <div className="mt-5 rounded-xl bg-[#edf5f3] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#176457]">
            Named hiring step
          </p>
          <p className="mt-2 text-lg font-semibold">
            First work-sample test
          </p>

          {waiverAvailable ? (
            <p className="mt-3 text-sm font-semibold text-[#176457]">
              First work-sample test waived
            </p>
          ) : !commitment ? (
            <p className="mt-3 text-sm leading-7 text-slate-700">
              No employer workflow consequence was committed
              before this pilot. No opportunity claim can be made.
            </p>
          ) : !hasClaim ? (
            <p className="mt-3 text-sm leading-7 text-slate-700">
              No portable proof exists. The first work-sample
              test is not waived.
            </p>
          ) : (
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Human-reviewed evidence exists, but independent
              capability was not established. The first work-sample
              test is not waived in this guided developer run.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold">Scope and limitations</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This observation does not predict future job performance.
          No proof is not a negative worker record. The proof record
          is conceptually worker-owned. If the target role has no
          meaningful junior hiring demand, First-proof is not the
          binding solution.
        </p>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          onClick={onBack}
          className="rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold"
        >
          ← Back to human review
        </button>

        <button
          onClick={onRestart}
          className="rounded-xl bg-[#173e46] px-6 py-4 text-sm font-semibold text-white"
        >
          Restart fictional demo →
        </button>
      </div>
    </section>
  );
}

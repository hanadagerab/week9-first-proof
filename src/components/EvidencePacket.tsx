
"use client";

import type { ReviewResult } from "./HumanReview";

type Answer = {
  decision: string;
  rationale: string;
};

type EvidencePacketProps = {
  reviewResult: ReviewResult | null;
  original: Answer;
  revised: Answer;
  assistance: string;
  onAssistanceChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

const decisionLabels: Record<string, string> = {
  resolve: "Resolve within authority",
  escalate: "Escalate",
  clarify: "Ask for clarification",
};

export default function EvidencePacket({
  reviewResult,
  original,
  revised,
  assistance,
  onAssistanceChange,
  onContinue,
  onBack,
}: EvidencePacketProps) {
  const validAssistance =
    assistance.trim().length >= 10 &&
    assistance.trim().length <= 500;

  const statuses = [
    {
      title: "Artifact exists",
      detail: "Four fictional case responses have been recorded.",
      status: "Recorded",
    },
    {
      title: "Structural consistency",
      detail:
        "Required fields were validated. Factual accuracy and judgment have not been independently verified.",
      status: "Checked",
    },
    {
      title: "Changed-constraint response",
      detail:
        "The original and revised decisions are available for comparison.",
      status: "Recorded",
    },
    {
      title: "Human verification",
      detail:
        reviewResult?.decision === "reject"
        ? "A fictional human reviewer rejected the proposed claim. No portable proof was generated."
        : reviewResult
          ? "A fictional reviewer decision was recorded. This does not establish independently verified capability."
          : "A trained human reviewer must inspect the evidence before any portable claim exists.",
      status:
        reviewResult?.decision === "reject"
          ? "Rejected · no portable proof"
          : reviewResult
            ? "Reviewed · fictional demo"
            : "Pending",
    },
  ];

  return (
    <section className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-[#237d70]">
        STEP 06 / EVIDENCE PACKET
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Evidence before interpretation.
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        This packet separates observable records, structural checks,
        simulated AI interpretation, and human verification.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold">Evidence status</h2>

        <div className="mt-5 divide-y divide-slate-100">
          {statuses.map((item, index) => (
            <div key={item.title} className="flex gap-4 py-5">
              <span className="font-mono text-sm text-[#237d70]">
                0{index + 1}
              </span>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    {item.title}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {item.status}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold">
          Recorded decision change
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Original decision", answer: original },
            { label: "Changed constraint", answer: revised },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {item.label}
              </p>

              <p className="mt-3 text-sm font-semibold">
                {decisionLabels[item.answer.decision] ?? "Not recorded"}
              </p>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {item.answer.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold">
          Assistance and authorship
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          This guided developer test used example responses supplied
          during the build. It is not an independent assessment of
          Daniela&apos;s capability.
        </p>

        <label
          htmlFor="assistance"
          className="mt-5 block text-sm font-semibold"
        >
          Assistance disclosure
        </label>

        <textarea
          id="assistance"
          value={assistance}
          onChange={(event) =>
            onAssistanceChange(event.target.value)
          }
          maxLength={500}
          rows={3}
          className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
        />

        {!validAssistance && (
          <p className="mt-2 text-xs text-amber-700">
            Provide an assistance disclosure of 10–500 characters.
          </p>
        )}
      </div>

      <div className="mt-5 rounded-2xl border border-[#c7ded8] bg-[#edf5f3] p-7">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#176457]">
          Simulated AI draft
        </span>

        <h2 className="mt-5 text-xl font-semibold">
          Proposed narrow observation
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-700">
          Under a fictional customer-delivery scenario, Daniela
          recorded an initial decision and a subsequent decision
          after the delivery record became disputed. The written
          response references the revised information and the
          authority boundaries described in the task.
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          This deterministic simulated draft describes submitted
          evidence. It does not independently verify judgment,
          establish general capability, or predict future performance.
        </p>

        <p className="mt-4 text-sm font-medium text-[#176457]">
          Human review required. No portable proof generated yet.
        </p>
      </div>

      <button
        disabled={!validAssistance}
        onClick={onContinue}
        className="mt-7 w-full rounded-xl bg-[#173e46] px-6 py-4 font-semibold text-white transition hover:bg-[#245861] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Continue to human review →
      </button>

      <button
        onClick={onBack}
        className="mt-5 text-sm text-slate-500 hover:text-slate-900"
      >
        ← Back to changed constraint
      </button>
    </section>
  );
}

"use client";

import { useState } from "react";

export type ReviewResult = {
  decision: "confirm" | "modify" | "reject";
  claim: string | null;
  reason: string;
  reviewer: string;
};

type Answer = {
  decision: string;
  rationale: string;
};

type HumanReviewProps = {
  original: Answer;
  revised: Answer;
  assistance: string;
  onComplete: (result: ReviewResult) => void;
  onBack: () => void;
};

const proposedClaim =
  "Under a fictional customer-delivery dispute, Daniela documented an initial decision and a revised decision after the carrier record became disputed, with written reasoning referencing the updated information and stated authority boundaries.";

export default function HumanReview({
  original,
  revised,
  assistance,
  onComplete,
  onBack,
}: HumanReviewProps) {
  const [decision, setDecision] = useState<
    "confirm" | "modify" | "reject" | ""
  >("");

  const [modifiedClaim, setModifiedClaim] = useState(proposedClaim);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const submitReview = () => {
    if (!decision) {
      setError("Select a reviewer decision.");
      return;
    }

    if (reason.trim().length < 15 || reason.trim().length > 500) {
      setError("Provide a reviewer reason of 15–500 characters.");
      return;
    }

    if (
      decision === "modify" &&
      (modifiedClaim.trim().length < 30 ||
        modifiedClaim.trim().length > 500)
    ) {
      setError("Modified claims must contain 30–500 characters.");
      return;
    }

    const claim =
      decision === "reject"
        ? null
        : decision === "modify"
          ? modifiedClaim.trim()
          : proposedClaim;

    onComplete({
      decision,
      claim,
      reason: reason.trim(),
      reviewer: "Marco Silva · Fictional human reviewer",
    });
  };

  return (
    <section className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-[#237d70]">
        STEP 07 / HUMAN REVIEW
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        A human decides what the evidence supports.
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        Marco Silva, a fictional trained reviewer, inspects the
        evidence before deciding whether a narrow claim can be
        generated. The simulated AI draft is not verification.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Assigned reviewer
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Marco Silva
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fictional trained First-proof reviewer
            </p>
          </div>

          <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            Human decision pending
          </span>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-6">
          <h3 className="font-semibold">Evidence under review</h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Original response
              </p>
              <p className="mt-3 text-sm font-medium">
                {original.decision}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {original.rationale}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Changed-constraint response
              </p>
              <p className="mt-3 text-sm font-medium">
                {revised.decision}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {revised.rationale}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-lg font-semibold">
          Assistance and limitations
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {assistance}
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          This guided demonstration uses fictional tasks and
          developer-provided example responses. It cannot establish
          independent performance or predict future employment success.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[#c7ded8] bg-[#edf5f3] p-7">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#176457]">
          Simulated AI draft
        </span>

        <p className="mt-4 text-sm leading-7 text-slate-700">
          {proposedClaim}
        </p>

        <p className="mt-3 text-xs text-slate-500">
          Draft only. The reviewer must confirm, narrow, or reject it.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold">
          Reviewer decision
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              id: "confirm",
              label: "Confirm",
              description: "Evidence supports the narrow claim.",
            },
            {
              id: "modify",
              label: "Modify",
              description: "Evidence supports different wording.",
            },
            {
              id: "reject",
              label: "Reject",
              description: "No portable proof is generated.",
            },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setDecision(option.id as "confirm" | "modify" | "reject");
                setError("");
              }}
              className={`rounded-xl border p-4 text-left transition ${
                decision === option.id
                  ? "border-[#237d70] bg-[#edf5f3]"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className="text-sm font-semibold">{option.label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {option.description}
              </p>
            </button>
          ))}
        </div>

        {decision === "modify" && (
          <div className="mt-6">
            <label
              htmlFor="modified-claim"
              className="block text-sm font-semibold"
            >
              Reviewer-edited claim
            </label>

            <textarea
              id="modified-claim"
              value={modifiedClaim}
              onChange={(event) => setModifiedClaim(event.target.value)}
              maxLength={500}
              rows={5}
              className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
            />
          </div>
        )}

        <label
          htmlFor="review-reason"
          className="mt-6 block text-sm font-semibold"
        >
          Reason for reviewer decision
        </label>

        <textarea
          id="review-reason"
          value={reason}
          onChange={(event) => {
            setReason(event.target.value);
            setError("");
          }}
          maxLength={500}
          rows={4}
          placeholder="Explain which evidence supports or limits your decision..."
          className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
        />

        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            {error}
          </p>
        )}

        <button
          onClick={submitReview}
          className="mt-7 w-full rounded-xl bg-[#173e46] px-6 py-4 font-semibold text-white transition hover:bg-[#245861]"
        >
          Record human reviewer decision →
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-6 text-sm text-slate-500 hover:text-slate-900"
      >
        ← Back to evidence packet
      </button>
    </section>
  );
}

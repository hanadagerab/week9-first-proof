"use client";

import type { ReviewResult } from "./HumanReview";

type Props = {
  assistance: string;
  reviewResult: ReviewResult | null;
};

export default function EmployerVerificationSummary({
  assistance,
  reviewResult,
}: Props) {
  const rejected = reviewResult?.decision === "reject";

  const rows = [
    {
      question: "Who completed the assessment?",
      answer:
        "Fictional candidate: Daniela Ruiz. The answers were entered during a guided developer demonstration, not independently by Daniela.",
    },
    {
      question: "What assistance was provided?",
      answer:
        assistance.trim() ||
        "Developer-provided example responses were used in this guided demonstration.",
    },
    {
      question: "What was actually observed?",
      answer:
        "Four recorded case decisions, written explanations, and a revised response after the delivery information changed.",
    },
    {
      question: "Who reviewed the evidence?",
      answer: reviewResult
        ? `${reviewResult.reviewer} recorded a fictional human-review decision.`
        : "No human-review decision has been recorded yet.",
    },
    {
      question: "What claim is supported?",
      answer: rejected
        ? "The proposed claim was rejected. No portable proof was generated."
        : reviewResult?.claim
          ? `${reviewResult.claim} This describes recorded activity, not independently proven capability.`
          : "No human-reviewed claim has been recorded yet.",
    },
    {
      question: "What remains unproven?",
      answer:
        "Independent performance, transferable judgment, and future job performance.",
    },
  ];

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#237d70]">
        Employer verification summary
      </p>

      <h2 className="mt-3 text-2xl font-semibold text-slate-900">
        What does this evidence actually show?
      </h2>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="font-semibold text-amber-900">
          Independent candidate performance was not verified.
        </p>
        <p className="mt-2 text-sm leading-6 text-amber-900">
          This fictional demonstration used developer-provided
          example responses. It demonstrates the workflow, not
          independent candidate capability.
        </p>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.question} className="py-4">
            <h3 className="text-sm font-semibold text-slate-900">
              {row.question}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {row.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-[#edf5f3] p-5">
        <p className="text-sm font-semibold text-[#176457]">
          What this means for hiring
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          This guided test does not justify skipping a hiring
          assessment. Any scenario showing a waived assessment
          is hypothetical and assumes independent verification.
        </p>
      </div>
    </section>
  );
}

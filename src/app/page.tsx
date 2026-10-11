"use client";

import { useState } from "react";
import EvidencePacket from "@/components/EvidencePacket";
import HumanReview, { type ReviewResult } from "@/components/HumanReview";
import HiringHandoff from "@/components/HiringHandoff";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [considered, setConsidered] = useState(true);
  const [stage, setStage] = useState<"consideration" | "evidence" | "onboarding" | "task" | "transfer" | "packet" | "review" | "handoff">("consideration");


  const cases = [
    {
      id: "C01",
      title: "Delivery confirmation",
      description:
        "A customer asks whether an order marked dispatched yesterday has arrived. The tracking record shows delivery completed, and the customer requests the confirmation reference. Your role allows you to share recorded shipment information.",
    },
    {
      id: "C02",
      title: "Requested quantity change",
      description:
        "A customer requests an increase from 100 to 160 units on an order already released to production. You can document requests and communicate approved changes, but cannot independently change released production quantities.",
    },
    {
      id: "C03",
      title: "Missing shipment information",
      description:
        "A customer asks when a replacement component will arrive. The available record contains an order number but no confirmed dispatch date. You may check the record and request additional information.",
    },
    {
      id: "C04",
      title: "Invoice reference",
      description:
        "A customer asks for a copy of an invoice associated with a completed order. The invoice is available in the approved customer record, and your role permits sharing existing invoice documents.",
    },
  ];

  const [answers, setAnswers] = useState<
    Record<string, { decision: string; rationale: string }>
  >({});

  const [taskError, setTaskError] = useState("");

  const updateAnswer = (
    id: string,
    field: "decision" | "rationale",
    value: string
  ) => {
    setAnswers((previous) => ({
      ...previous,
      [id]: {
        decision: previous[id]?.decision ?? "",
        rationale: previous[id]?.rationale ?? "",
        [field]: value,
      },
    }));

    // Changing base evidence invalidates every downstream decision.
    setBaseSubmitted(false);
    setTransferSubmitted(false);
    setTransferDecision("");
    setTransferRationale("");
    setReviewResult(null);
    setTaskError("");
  };


  const [baseSubmitted, setBaseSubmitted] = useState(false);
  const [transferDecision, setTransferDecision] = useState("");
  const [transferRationale, setTransferRationale] = useState("");
  const [transferError, setTransferError] = useState("");
  const [transferSubmitted, setTransferSubmitted] = useState(false);
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [assistanceDisclosure, setAssistanceDisclosure] = useState(
    "Developer-provided example responses used in this guided fictional test."
  );


  const restartDemo = () => {
    setStarted(false);
    setConsidered(true);
    setStage("consideration");
    setAnswers({});
    setTaskError("");
    setBaseSubmitted(false);
    setTransferDecision("");
    setTransferRationale("");
    setTransferError("");
    setTransferSubmitted(false);
    setReviewResult(null);
    setAssistanceDisclosure(
      "Developer-provided example responses used in this guided fictional test."
    );
  };

  const submitTransfer = () => {
    if (!baseSubmitted) {
      setTransferError("Complete the base task first.");
      return;
    }

    if (
      !["resolve", "escalate", "clarify"].includes(transferDecision) ||
      transferRationale.trim().length < 20 ||
      transferRationale.trim().length > 500
    ) {
      setTransferError(
        "Choose an action and provide a rationale of 20–500 characters."
      );
      return;
    }

    setTransferSubmitted(true);
    setTransferError("");
  };

  const submitTask = () => {
    const valid = cases.every((item) => {
      const answer = answers[item.id];
      return (
        answer &&
        ["resolve", "escalate", "clarify"].includes(answer.decision) &&
        answer.rationale.trim().length >= 15 &&
        answer.rationale.trim().length <= 500
      );
    });

    if (!valid) {
      setTaskError(
        "Complete all four decisions and provide a rationale of 15–500 characters for each case."
      );
      return;
    }

    setTaskError("");
    setBaseSubmitted(true);
    setTransferSubmitted(false);
    setTransferDecision("");
    setTransferRationale("");
    setStage("transfer");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#17253d]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173e46] text-lg font-semibold text-white">
              F
            </div>
            <div>
              <p className="font-semibold tracking-tight">First-proof</p>
              <p className="text-xs text-slate-500">Hiring Handoff Lab</p>
            </div>
          </div>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
            Fictional demo data
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-[#dceee9] px-3 py-1 font-medium text-[#176457]">
            Week 09 / Operator
          </span>
          <span>Evidence → Review → Hiring action</span>
        </div>

        {!started ? (
          <section className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#237d70]">
                A different kind of hiring evidence
              </p>
              <h1 className="max-w-xl text-5xl font-semibold leading-[1.12] tracking-tight md:text-6xl">
                Proof should change what happens next.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                First-proof turns bounded, observable work evidence into a
                narrow human-reviewed claim connected to one pre-agreed hiring
                action.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500">
                Not a candidate ranking, universal credential, or automated
                hiring decision. This simulation uses invented people and
                training materials only.
              </p>
              <button
                onClick={() => setStarted(true)}
                className="mt-8 rounded-xl bg-[#173e46] px-7 py-4 font-semibold text-white shadow-sm transition hover:bg-[#245861]"
              >
                Explore the hiring handoff →
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_65px_rgba(20,40,60,0.07)]">
              <div className="mb-7 flex items-center justify-between">
                <span className="text-sm font-semibold">Handoff preview</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                  Simulation
                </span>
              </div>
              {[
                ["01", "Candidate already in consideration"],
                ["02", "Existing evidence reviewed first"],
                ["03", "Bounded demonstration if needed"],
                ["04", "Human reviewer decides"],
                ["05", "Named hiring step changes"],
              ].map(([number, text]) => (
                <div
                  key={number}
                  className="flex gap-4 border-t border-slate-100 py-5"
                >
                  <span className="font-mono text-sm text-[#237d70]">
                    {number}
                  </span>
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
              <div className="mt-4 rounded-xl bg-[#edf5f3] p-4 text-sm text-[#245e54]">
                Valid proof → First work-sample test waived
                <p className="mt-1 text-xs opacity-75">
                  Simulated employer commitment, agreed before the pilot.
                </p>
              </div>
            </div>
          </section>





        ) : stage === "handoff" && reviewResult && baseSubmitted && transferSubmitted ? (
          <HiringHandoff
            review={reviewResult}
            assistance={assistanceDisclosure}
            onBack={() => setStage("review")}
            onRestart={restartDemo}
          />
        ) : stage === "review" && baseSubmitted && transferSubmitted ? (
          <HumanReview
            original={answers["C01"]}
            revised={{
              decision: transferDecision,
              rationale: transferRationale,
            }}
            assistance={assistanceDisclosure}
            onComplete={(result) => {
              setReviewResult(result);
              setStage("handoff");
            }}
            onBack={() => setStage("packet")}
          />
        ) : stage === "packet" && baseSubmitted && transferSubmitted ? (
          <EvidencePacket
              reviewResult={reviewResult}
            original={answers["C01"]}
            revised={{
              decision: transferDecision,
              rationale: transferRationale,
            }}
            assistance={assistanceDisclosure}
            onAssistanceChange={setAssistanceDisclosure}
            onContinue={() =>
              setStage("review")
            }
            onBack={() => setStage("transfer")}
          />
        ) : stage === "transfer" && baseSubmitted ? (
          <section className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-[#237d70]">
              STEP 05 / CHANGED-CONSTRAINT FOLLOW-UP
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              The situation has changed.
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              You have already submitted your original case decisions.
              New information has now become available. Review it and
              decide how you would proceed.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-[#237d70]">
                ORIGINAL CASE · C01
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Delivery confirmation
              </h2>

              <div className="mt-5 rounded-xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Your original decision
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  {answers["C01"]?.decision === "resolve"
                    ? "Resolve within authority"
                    : answers["C01"]?.decision === "escalate"
                    ? "Escalate"
                    : "Ask for clarification"}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {answers["C01"]?.rationale}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                  New information
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  The customer reports that the shipment was not received.
                  A newly updated carrier record now marks the delivery
                  confirmation as disputed. Your role still permits sharing
                  recorded shipment information, but you cannot independently
                  certify disputed delivery records or authorize replacements.
                </p>
              </div>

              {!transferSubmitted ? (
                <>
                  <label
                    htmlFor="transfer-decision"
                    className="mt-7 block text-sm font-semibold"
                  >
                    What would you do now?
                  </label>

                  <select
                    id="transfer-decision"
                    value={transferDecision}
                    onChange={(event) => {
                      setTransferDecision(event.target.value);
                      setTransferSubmitted(false);
                      setReviewResult(null);
                      setTransferError("");
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm"
                  >
                    <option value="">Select an action</option>
                    <option value="resolve">Resolve within authority</option>
                    <option value="escalate">Escalate</option>
                    <option value="clarify">Ask for clarification</option>
                  </select>

                  <label
                    htmlFor="transfer-rationale"
                    className="mt-6 block text-sm font-semibold"
                  >
                    Explain why you would keep or change your decision
                  </label>

                  <textarea
                    id="transfer-rationale"
                    value={transferRationale}
                    onChange={(event) => {
                      setTransferRationale(event.target.value);
                      setTransferSubmitted(false);
                      setReviewResult(null);
                      setTransferError("");
                    }}
                    maxLength={500}
                    rows={5}
                    placeholder="Explain how the new information affects your decision..."
                    className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
                  />

                  <p className="mt-2 text-right text-xs text-slate-400">
                    {transferRationale.length}/500
                  </p>

                  {transferError && (
                    <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                      {transferError}
                    </p>
                  )}

                  <button
                    onClick={submitTransfer}
                    className="mt-7 w-full rounded-xl bg-[#173e46] px-6 py-4 font-semibold text-white hover:bg-[#245861]"
                  >
                    Submit changed-constraint response →
                  </button>
                </>
              ) : (
                <div className="mt-7 rounded-xl bg-[#edf5f3] p-6">
                  <h3 className="font-semibold text-[#176457]">
                    Response captured
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Your original and revised decisions have been recorded
                    in the local demo state. No capability has been
                    verified and no portable proof exists yet.
                  </p>
                  <p className="mt-4 text-sm text-slate-600">
                    Next: open the structured evidence packet below.
                  </p>
                  <button
                    onClick={() => setStage("packet")}
                    className="mt-5 rounded-xl bg-[#173e46] px-6 py-3 text-sm font-semibold text-white"
                  >
                    Open evidence packet →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setStage("task")}
              className="mt-6 text-sm text-slate-500 hover:text-slate-900"
            >
              ← Back to base task
            </button>
          </section>
        ) : stage === "task" ? (
          <section className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-[#237d70]">
              STEP 04 / BOUNDED TRAINING TASK
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Customer operations · Case decisions
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Review each invented case. Select an action and explain
              the reasoning behind your decision.
              No correctness feedback is shown during this task.
            </p>

            <div className="mt-5 rounded-xl bg-[#edf5f3] p-4 text-sm text-[#176457]">
              Fictional training materials only · No productive work
              · No employment decision
            </div>

            <div className="mt-8 space-y-5">
              {cases.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <p className="text-xs font-semibold tracking-widest text-[#237d70]">
                    CASE {item.id}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <label
                    htmlFor={"decision-" + item.id}
                    className="mt-6 block text-sm font-semibold"
                  >
                    Your action
                  </label>

                  <select
                    id={"decision-" + item.id}
                    value={answers[item.id]?.decision ?? ""}
                    onChange={(event) =>
                      updateAnswer(item.id, "decision", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm"
                  >
                    <option value="">Select an action</option>
                    <option value="resolve">Resolve within authority</option>
                    <option value="escalate">Escalate</option>
                    <option value="clarify">Ask for clarification</option>
                  </select>

                  <label
                    htmlFor={"rationale-" + item.id}
                    className="mt-5 block text-sm font-semibold"
                  >
                    Explain your reasoning
                  </label>

                  <textarea
                    id={"rationale-" + item.id}
                    value={answers[item.id]?.rationale ?? ""}
                    onChange={(event) =>
                      updateAnswer(item.id, "rationale", event.target.value)
                    }
                    maxLength={500}
                    rows={3}
                    placeholder="Explain what information and authority informed your decision..."
                    className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
                  />
                  <p className="mt-2 text-right text-xs text-slate-400">
                    {answers[item.id]?.rationale?.length ?? 0}/500
                  </p>
                </article>
              ))}
            </div>

            {taskError && (
              <p role="alert" className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                {taskError}
              </p>
            )}

            <button
              onClick={submitTask}
              className="mt-7 w-full rounded-xl bg-[#173e46] px-6 py-4 font-semibold text-white transition hover:bg-[#245861]"
            >
              Submit four case decisions →
            </button>

            <button
              onClick={() => setStage("onboarding")}
              className="mt-5 text-sm text-slate-500 hover:text-slate-900"
            >
              ← Back to onboarding
            </button>
          </section>
        ) : stage === "onboarding" ? (
          <section className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-[#237d70]">
              STEP 03 / NEUTRAL ONBOARDING
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Your operating environment.
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              You will work through fictional customer-operations cases.
              Read the working conditions before beginning.
              No real customer information or productive employer work
              is involved.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Operating context",
                  body: "You are supporting customer operations at a fictional manufacturing company. Each case provides the information available at that moment.",
                },
                {
                  title: "Available actions",
                  body: "For each case, choose Resolve within authority, Escalate, or Ask for clarification. Explain your choice in your own words.",
                },
                {
                  title: "Authority boundary",
                  body: "You may act only within the authority explicitly described in each case. Do not assume permissions that have not been provided.",
                },
                {
                  title: "Time and tools",
                  body: "Suggested time: 15 minutes. You may use the case information and your own notes. No external tools or AI assistance are required.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold">
                Asking for clarification
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                If you need additional information, select
                Ask for clarification and explain what is missing.
                Your response will be recorded as part of the
                fictional demonstration.
              </p>
            </div>

            <div className="mt-6 rounded-xl bg-[#edf5f3] p-5 text-sm leading-7 text-[#176457]">
              Training simulation only. Responses are not employment
              decisions, hiring recommendations, or predictions of
              future performance.
            </div>

            <button
              onClick={() =>
                setStage("task")
              }
              className="mt-7 w-full rounded-xl bg-[#173e46] px-6 py-4 font-semibold text-white transition hover:bg-[#245861]"
            >
              Begin fictional assessment →
            </button>

            <button
              onClick={() => setStage("evidence")}
              className="mt-5 text-sm text-slate-500 hover:text-slate-900"
            >
              ← Back to existing evidence
            </button>
          </section>
        ) : stage === "evidence" ? (
          <section className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-[#237d70]">
              STEP 02 / EXISTING EVIDENCE
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Start with what already exists.
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Before asking Daniela to complete new work, First-proof checks
              whether her existing records support the specific capability
              the employer needs to understand.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                {
                  title: "Customer follow-up log",
                  source: "Closed customer contact record",
                  supports: "Documented follow-up and case ownership",
                  gap: "Does not establish judgment under plant-specific constraints.",
                },
                {
                  title: "Issue-resolution notes",
                  source: "Prior customer-service task record",
                  supports: "Clear documentation of routine resolutions",
                  gap: "Does not establish behavior when authority changes.",
                },
                {
                  title: "Escalation record",
                  source: "Previous-context escalation artifact",
                  supports: "Evidence that an issue was referred for review",
                  gap: "Does not establish transfer to the target operating context.",
                },
              ].map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-[#237d70]">
                        TRACE 0{index + 1}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.source}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      Fictional · attributed in demo
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        What it supports
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {item.supports}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        What remains unproven
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {item.gap}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#c7ded8] bg-[#edf5f3] p-6">
              <p className="text-sm font-semibold text-[#176457]">
                Evidence sufficiency decision
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                Existing traces are useful, but insufficient.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                These records support aspects of customer handling, but do
                not establish escalation judgment under changed conditions
                in the target plant context. A bounded training
                demonstration is therefore needed.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Check recognized evidence first, including relevant
                existing competency certification. No new certification
                is claimed here.
              </p>
            </div>

            <button
              onClick={() => setStage("onboarding")}
              className="mt-7 w-full rounded-xl bg-[#173e46] px-6 py-4 font-semibold text-white transition hover:bg-[#245861]"
            >
              Continue to bounded training task →
            </button>

            <button
              onClick={() => setStage("consideration")}
              className="mt-5 text-sm text-slate-500 hover:text-slate-900"
            >
              ← Back to consideration
            </button>
          </section>
        ) : (
          <section className="mx-auto max-w-3xl">
            <div className="mb-6">
              <p className="text-sm font-medium text-[#237d70]">
                STEP 01 / CONSIDERATION
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                Before evidence enters the process.
              </h1>
              <p className="mt-3 text-slate-600">
                First-proof is available only after the employer has already
                placed the candidate in consideration.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Fictional candidate
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Daniela Ruiz</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Junior Customer Operations Coordinator
                  </p>
                </div>
                <span className="rounded-full bg-[#e5f4ee] px-3 py-2 text-xs font-semibold text-[#176457]">
                  {considered
                    ? "Already in consideration"
                    : "Not in consideration"}
                </span>
              </div>

              <div className="my-7 border-t border-slate-100" />

              <p className="mb-4 text-sm font-semibold">
                Candidate consideration status
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setConsidered(true)}
                  className={`rounded-xl border p-4 text-left text-sm ${
                    considered
                      ? "border-[#237d70] bg-[#edf5f3] text-[#176457]"
                      : "border-slate-200"
                  }`}
                >
                  Already in consideration
                </button>
                <button
                  onClick={() => setConsidered(false)}
                  className={`rounded-xl border p-4 text-left text-sm ${
                    !considered
                      ? "border-slate-600 bg-slate-100"
                      : "border-slate-200"
                  }`}
                >
                  Not in consideration
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                First-proof did not determine application eligibility or initial
                review order. It cannot rank candidates or automatically reject
                anyone.
              </div>

              {considered ? (
                <div className="mt-6 rounded-xl bg-[#edf5f3] p-4 text-sm text-[#176457]">
                  Consideration confirmed. Existing evidence review is the
                  next stage.
                </div>
              ) : (
                <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                  Evidence access locked. The candidate must first enter the
                  normal hiring consideration process.
                </div>
              )}

              <button
                disabled={!considered}
                onClick={() =>
                  setStage("evidence")
                }
                className="mt-7 w-full rounded-xl bg-[#173e46] px-6 py-4 font-semibold text-white transition hover:bg-[#245861] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Continue to existing evidence →
              </button>
            </div>

            <button
              onClick={() => setStarted(false)}
              className="mt-6 text-sm text-slate-500 hover:text-slate-900"
            >
              ← Back to overview
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

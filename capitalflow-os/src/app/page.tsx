"use client";

import { useMemo, useState } from "react";
import {
  defaultPlanInput,
  generateAsciiPlan,
  type PlanInput,
  type SkillFocus,
} from "@/lib/plan";

const budgetOptions: Record<
  PlanInput["budget"],
  { label: string; range: string }
> = {
  lean: { label: "Lean Ops", range: "$75-$150/mo" },
  balanced: { label: "Balanced", range: "$250-$400/mo" },
  aggressive: { label: "Aggressive", range: "$600-$1k/mo" },
};

const skillLabels: Record<SkillFocus, string> = {
  "content-led": "Content-Led (SEO, storytelling, thought leadership)",
  "automation-led": "Automation-Led (systems, no-code wiring, API loops)",
  "product-led": "Product-Led (asset creation, UX, packaging)",
  "community-led": "Community-Led (audience, retention, partnerships)",
};

export default function Home() {
  const [planInput, setPlanInput] = useState<PlanInput>(defaultPlanInput);
  const [copied, setCopied] = useState(false);

  const planOutput = useMemo(
    () => generateAsciiPlan(planInput),
    [planInput],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(planOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-terminal-black pb-24 text-terminal-green">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 md:px-10">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.35em] text-terminal-amber">
            CapitalFlow ERP // Passive Income OS
          </p>
          <h1 className="text-4xl font-semibold text-terminal-green md:text-5xl">
            Deploy parallel income stacks with hacker-terminal precision.
          </h1>
          <p className="max-w-3xl text-lg text-terminal-muted">
            Feed the mission parameters. CapitalFlow synthesizes strategy,
            content assets, automation plays, and revenue projections inside a
            command-line dashboard built for velocity.
          </p>
        </header>

        <section className="grid gap-6 rounded-xl border border-terminal-emerald-40 bg-terminal-panel p-6 shadow-terminal md:grid-cols-[minmax(0,380px)_1fr] md:gap-10">
          <form className="flex flex-col gap-5 text-terminal-green">
            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="targetNiche"
                className="text-xs uppercase tracking-[0.25em] text-terminal-amber"
              >
                Target niche
              </label>
              <input
                id="targetNiche"
                className="rounded border border-terminal-emerald-50 bg-terminal-black px-3 py-2 font-mono text-sm focus:border-terminal-emerald focus:outline-none"
                value={planInput.targetNiche}
                onChange={(event) =>
                  setPlanInput((prev) => ({
                    ...prev,
                    targetNiche: event.target.value,
                  }))
                }
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="goal"
                className="text-xs uppercase tracking-[0.25em] text-terminal-amber"
              >
                Primary objective
              </label>
              <textarea
                id="goal"
                className="min-h-[92px] rounded border border-terminal-emerald-50 bg-terminal-black px-3 py-2 font-mono text-sm focus:border-terminal-emerald focus:outline-none"
                value={planInput.goal}
                onChange={(event) =>
                  setPlanInput((prev) => ({
                    ...prev,
                    goal: event.target.value,
                  }))
                }
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="monetization"
                className="text-xs uppercase tracking-[0.25em] text-terminal-amber"
              >
                Monetization track
              </label>
              <input
                id="monetization"
                className="rounded border border-terminal-emerald-50 bg-terminal-black px-3 py-2 font-mono text-sm focus:border-terminal-emerald focus:outline-none"
                value={planInput.monetization}
                onChange={(event) =>
                  setPlanInput((prev) => ({
                    ...prev,
                    monetization: event.target.value,
                  }))
                }
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="budget"
                className="text-xs uppercase tracking-[0.25em] text-terminal-amber"
              >
                Capital bandwidth
              </label>
              <select
                id="budget"
                className="rounded border border-terminal-emerald-50 bg-terminal-black px-3 py-2 font-mono text-sm focus:border-terminal-emerald focus:outline-none"
                value={planInput.budget}
                onChange={(event) =>
                  setPlanInput((prev) => ({
                    ...prev,
                    budget: event.target.value as PlanInput["budget"],
                  }))
                }
              >
                {Object.entries(budgetOptions).map(([value, meta]) => (
                  <option key={value} value={value}>
                    {meta.label} - {meta.range}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="skillFocus"
                className="text-xs uppercase tracking-[0.25em] text-terminal-amber"
              >
                Skill dominance
              </label>
              <select
                id="skillFocus"
                className="rounded border border-terminal-emerald-50 bg-terminal-black px-3 py-2 font-mono text-sm focus:border-terminal-emerald focus:outline-none"
                value={planInput.skillFocus}
                onChange={(event) =>
                  setPlanInput((prev) => ({
                    ...prev,
                    skillFocus: event.target.value as SkillFocus,
                  }))
                }
              >
                {Object.entries(skillLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="timePerWeek"
                className="text-xs uppercase tracking-[0.25em] text-terminal-amber"
              >
                Focus hours / week
              </label>
              <input
                id="timePerWeek"
                type="number"
                min={4}
                max={40}
                className="rounded border border-terminal-emerald-50 bg-terminal-black px-3 py-2 font-mono text-sm focus:border-terminal-emerald focus:outline-none"
                value={planInput.timePerWeek}
                onChange={(event) =>
                  setPlanInput((prev) => ({
                    ...prev,
                    timePerWeek: Number(event.target.value || 0),
                  }))
                }
              />
            </fieldset>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-2 flex items-center justify-center gap-2 rounded border border-terminal-emerald-60 bg-terminal-black px-4 py-2 font-mono text-sm uppercase tracking-[0.3em] text-terminal-emerald transition hover-terminal-fill"
            >
              {copied ? "Copied Mission Payload" : "Copy Mission Payload"}
            </button>
          </form>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded border border-terminal-emerald-50 bg-terminal-black-60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-terminal-amber">
                  Ops Tempo
                </p>
                <p className="mt-1 text-2xl font-semibold text-terminal-green">
                  {planInput.timePerWeek}h/wk
                </p>
              </div>
              <div className="rounded border border-terminal-emerald-50 bg-terminal-black-60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-terminal-amber">
                  Capital
                </p>
                <p className="mt-1 text-2xl font-semibold text-terminal-green">
                  {budgetOptions[planInput.budget].range}
                </p>
              </div>
              <div className="rounded border border-terminal-emerald-50 bg-terminal-black-60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-terminal-amber">
                  Skill Stack
                </p>
                <p className="mt-1 text-sm text-terminal-muted">
                  {skillLabels[planInput.skillFocus]}
                </p>
              </div>
            </div>
            <pre className="w-full overflow-x-auto rounded-xl border border-terminal-emerald-50 bg-terminal-black-70 p-4 font-mono text-[13px] leading-relaxed tracking-tight text-terminal-green shadow-terminal">
              {planOutput}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

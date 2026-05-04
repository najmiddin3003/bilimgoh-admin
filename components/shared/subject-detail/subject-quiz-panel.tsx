"use client";

import { useState } from "react";
import type { SubjectQuizPage } from "@/lib/subject-page-data";

type SubjectQuizPanelProps = {
  quizPages: SubjectQuizPage[];
};

export function SubjectQuizPanel({ quizPages }: SubjectQuizPanelProps) {
  const [activePage, setActivePage] = useState(0);
  const page = quizPages[activePage] ?? quizPages[0];

  if (!page) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Test savollari
        </h2>
        <div className="flex gap-1">
          {quizPages.map((_, index) => (
            <button
              key={quizPages[index]?.pageIndex ?? index}
              type="button"
              onClick={() => setActivePage(index)}
              className={`grid h-9 min-w-9 place-items-center rounded-lg border px-2 text-sm font-medium transition ${
                activePage === index
                  ? "border-blue-500 bg-blue-600 text-white dark:border-blue-400"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-4">
        {page.questions.map((question) => (
          <li
            key={question.id}
            className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-600 dark:bg-slate-800/80"
          >
            <p className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-100">
              {question.prompt}
            </p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10"
                >
                  <input type="radio" name={question.id} className="h-4 w-4 accent-blue-600" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{option.key}.</span>
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

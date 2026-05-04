"use client";

import { useState } from "react";
import type {
  SubjectQuizOption,
  SubjectQuizPage,
  SubjectQuizQuestion,
} from "@/lib/subject-page-data";
import { InlineText } from "@/components/shared/subject-detail/inline-field";

type SubjectQuizPanelProps = {
  quizPages: SubjectQuizPage[];
  onQuizChange?: (next: SubjectQuizPage[]) => void;
};

function newQuestionId(pageIndex: number, n: number) {
  return `q-${pageIndex}-${n}-${Date.now()}`;
}

export function SubjectQuizPanel({ quizPages, onQuizChange }: SubjectQuizPanelProps) {
  const [activePage, setActivePage] = useState(0);
  const page = quizPages[activePage] ?? quizPages[0];
  const editable = Boolean(onQuizChange);

  const setPages = (updater: (prev: SubjectQuizPage[]) => SubjectQuizPage[]) => {
    if (!onQuizChange) return;
    onQuizChange(updater(quizPages));
  };

  const updatePageQuestions = (questions: SubjectQuizQuestion[]) => {
    if (!page) return;
    setPages((prev) =>
      prev.map((p, i) => (i === activePage ? { ...p, questions } : p))
    );
  };

  const updateQuestion = (qid: string, patch: Partial<SubjectQuizQuestion>) => {
    if (!page) return;
    updatePageQuestions(
      page.questions.map((q) => (q.id === qid ? { ...q, ...patch } : q))
    );
  };

  const updateOption = (qid: string, key: string, text: string) => {
    if (!page) return;
    const q = page.questions.find((x) => x.id === qid);
    if (!q) return;
    const options: SubjectQuizOption[] = q.options.map((o) =>
      o.key === key ? { ...o, text } : o
    );
    updateQuestion(qid, { options });
  };

  const setOptionKey = (qid: string, oldKey: string, newKey: string) => {
    if (!page || oldKey === newKey) return;
    const q = page.questions.find((x) => x.id === qid);
    if (!q) return;
    const options: SubjectQuizOption[] = q.options.map((o) =>
      o.key === oldKey ? { ...o, key: newKey } : o
    );
    updateQuestion(qid, { options });
  };

  const addOption = (qid: string) => {
    if (!page) return;
    const q = page.questions.find((x) => x.id === qid);
    if (!q) return;
    const used = new Set(q.options.map((o) => o.key));
    const keys = ["A", "B", "C", "D", "E", "F"];
    const key = keys.find((k) => !used) ?? `V${q.options.length + 1}`;
    updateQuestion(qid, {
      options: [...q.options, { key, text: "Variant" }],
    });
  };

  const removeOption = (qid: string, key: string) => {
    if (!page) return;
    const q = page.questions.find((x) => x.id === qid);
    if (!q || q.options.length <= 1) return;
    updateQuestion(qid, {
      options: q.options.filter((o) => o.key !== key),
    });
  };

  const addQuestion = () => {
    if (!page) return;
    const n = page.questions.length + 1;
    const next: SubjectQuizQuestion = {
      id: newQuestionId(page.pageIndex, n),
      prompt: "Savol matni",
      options: [
        { key: "A", text: "Variant A" },
        { key: "B", text: "Variant B" },
      ],
    };
    updatePageQuestions([...page.questions, next]);
  };

  const removeQuestion = (qid: string) => {
    if (!page) return;
    updatePageQuestions(page.questions.filter((q) => q.id !== qid));
  };

  if (!page) return null;

  if (!editable) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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
                    <input
                      type="radio"
                      name={question.id}
                      className="h-4 w-4 accent-blue-600"
                    />
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {option.key}.
                    </span>
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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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

      <div className="space-y-6">
        {page.questions.map((question) => (
          <div
            key={question.id}
            className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-600 dark:bg-slate-800/50"
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeQuestion(question.id)}
                className="text-xs text-rose-600 hover:underline dark:text-rose-400"
              >
                Savolni o‘chirish
              </button>
            </div>
            <InlineText
              multiline
              value={question.prompt}
              onChange={(v) => updateQuestion(question.id, { prompt: v })}
              className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-100"
            />
            <div className="space-y-2">
              {question.options.map((option) => (
                <div
                  key={`${question.id}-${option.key}`}
                  className="flex flex-wrap items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-600 dark:bg-slate-900"
                >
                  <select
                    value={option.key}
                    onChange={(e) =>
                      setOptionKey(question.id, option.key, e.target.value)
                    }
                    className="mt-1 h-8 w-11 shrink-0 rounded border border-slate-200 bg-white text-sm font-bold dark:border-slate-600 dark:bg-slate-800"
                    aria-label="Kalit"
                  >
                    {["A", "B", "C", "D", "E", "F"].map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                  <div className="min-w-0 flex-1 text-sm text-slate-800 dark:text-slate-200">
                    <InlineText
                      value={option.text}
                      onChange={(t) => updateOption(question.id, option.key, t)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOption(question.id, option.key)}
                    className="shrink-0 text-xs text-slate-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addOption(question.id)}
                className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                + variant
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full rounded-xl border border-dashed border-slate-300 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          + Savol qo‘shish
        </button>
      </div>
    </div>
  );
}

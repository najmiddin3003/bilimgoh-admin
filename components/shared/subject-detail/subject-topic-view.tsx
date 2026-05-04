"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { SubjectExample, SubjectPageData } from "@/lib/subject-page-data";
import {
  InlineImageUrl,
  InlineNumber,
  InlineText,
} from "@/components/shared/subject-detail/inline-field";
import { SubjectQuizPanel } from "@/components/shared/subject-detail/subject-quiz-panel";

type SubjectTopicViewProps = {
  data: SubjectPageData;
};

export function SubjectTopicView({ data }: SubjectTopicViewProps) {
  const [page, setPage] = useState<SubjectPageData>(data);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const setExamples = useCallback((examples: SubjectExample[]) => {
    setPage((p) => ({ ...p, examples }));
  }, []);

  const readImageFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setPage((p) => ({ ...p, contentImage: result }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
          <Link
            href="/subjects"
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
          >
            ← Fanlar ro&apos;yxati
          </Link>
        </div>
      </header>

      <div className="bg-blue-600 px-4 py-8 text-center dark:bg-blue-700">
        <InlineText
          value={page.topicBanner}
          onChange={(v) => setPage((p) => ({ ...p, topicBanner: v }))}
          className="text-2xl font-bold uppercase tracking-wide text-white md:text-3xl"
          inputClassName="border-white bg-blue-800 text-white placeholder:text-blue-200"
        />
        <div className="mt-3">
          <InlineText
            value={page.title}
            onChange={(v) => setPage((p) => ({ ...p, title: v }))}
            className="text-sm text-blue-100"
            inputClassName="border-white bg-blue-800 text-white"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div
              role="heading"
              aria-level={2}
              className="mb-5 text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              <InlineText
                value={page.grammarSectionTitle}
                onChange={(v) =>
                  setPage((p) => ({ ...p, grammarSectionTitle: v }))
                }
                className="block"
              />
            </div>

            <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              Video havola (embed URL)
            </p>
            <InlineText
              value={page.videoEmbedSrc}
              onChange={(v) => setPage((p) => ({ ...p, videoEmbedSrc: v }))}
              className="mb-3 block font-mono text-xs text-slate-700 dark:text-slate-300"
              inputClassName="font-mono text-xs"
            />
            <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
              <iframe
                title="Mavzu videosi"
                src={page.videoEmbedSrc}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              Rasm URL
            </p>
            <InlineImageUrl
              value={page.contentImage}
              onChange={(v) => setPage((p) => ({ ...p, contentImage: v }))}
              className="mb-2 block text-slate-700 dark:text-slate-300"
            />
            <input
              ref={imageFileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              tabIndex={-1}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) readImageFile(f);
                e.target.value = "";
              }}
            />
            <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
              Rasm fayl: rasminga yoki pastdagi joyga bosing
            </p>

            {page.contentImage ? (
              <button
                type="button"
                onClick={() => imageFileRef.current?.click()}
                className="group relative mb-6 w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 text-left ring-offset-2 transition hover:ring-2 hover:ring-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600"
                aria-label="Rasmni almashtirish uchun fayl tanlash"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={page.contentImage}
                  alt=""
                  className="h-auto w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-medium text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                  Yangi rasm tanlash
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => imageFileRef.current?.click()}
                className="mb-6 flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-sm text-slate-500 transition hover:border-blue-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:bg-slate-800/80"
              >
                Rasm qo‘shish (fayl tanlash)
              </button>
            )}

            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              Misollar
            </p>
            <div className="space-y-2">
              {page.examples.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-2 py-2 dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="pt-1.5 text-rose-500" aria-hidden>
                    ❌
                  </span>
                  <div className="min-w-0 flex-1 text-sm">
                    <InlineText
                      value={row.wrong}
                      onChange={(v) => {
                        const next = [...page.examples];
                        next[index] = { ...row, wrong: v };
                        setExamples(next);
                      }}
                      className="text-rose-700 dark:text-rose-300"
                    />
                  </div>
                  <span className="pt-1.5 text-slate-300">|</span>
                  <span className="pt-1.5 text-emerald-500" aria-hidden>
                    ✅
                  </span>
                  <div className="min-w-0 flex-1 text-sm">
                    <InlineText
                      value={row.correct}
                      onChange={(v) => {
                        const next = [...page.examples];
                        next[index] = { ...row, correct: v };
                        setExamples(next);
                      }}
                      className="text-emerald-700 dark:text-emerald-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setExamples(page.examples.filter((_, i) => i !== index))
                    }
                    className="shrink-0 rounded p-1 text-slate-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/30"
                    aria-label="Qatorni o‘chirish"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setExamples([
                    ...page.examples,
                    { wrong: "", correct: "" },
                  ])
                }
                className="w-full rounded-lg border border-dashed border-slate-300 py-2 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-400"
              >
                + Misol qo‘shish
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm dark:border-slate-700">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  O&apos;quvchilar
                </dt>
                <dd className="text-lg text-slate-900 dark:text-slate-100">
                  <InlineNumber
                    value={page.students}
                    onChange={(v) => setPage((p) => ({ ...p, students: v }))}
                  />
                </dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Darslar</dt>
                <dd className="text-lg text-slate-900 dark:text-slate-100">
                  <InlineNumber
                    value={page.lessons}
                    onChange={(v) => setPage((p) => ({ ...p, lessons: v }))}
                  />
                </dd>
              </div>
            </dl>
          </div>

          <SubjectQuizPanel
            quizPages={page.quizPages}
            onQuizChange={(quizPages) => setPage((p) => ({ ...p, quizPages }))}
          />
        </div>
      </div>
    </div>
  );
}

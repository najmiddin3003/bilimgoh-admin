import Link from "next/link";
import type { SubjectPageData } from "@/lib/subject-page-data";
import { SubjectQuizPanel } from "@/components/shared/subject-detail/subject-quiz-panel";

type SubjectTopicViewProps = {
  data: SubjectPageData;
};

export function SubjectTopicView({ data }: SubjectTopicViewProps) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link
            href="/subjects"
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
          >
            ← Fanlar ro&apos;yxati
          </Link>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">EduAdmin</span>
        </div>
      </header>

      <div className="bg-blue-600 py-6 text-center dark:bg-blue-700">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
          {data.topicBanner}
        </h1>
        <p className="mt-2 text-sm text-blue-100">{data.title}</p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {data.grammarSectionTitle}
            </h2>

            <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
              <iframe
                title="Mavzu videosi"
                src={data.videoEmbedSrc}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {data.contentImage ? (
              <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-600">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.contentImage}
                  alt={data.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : null}

            <div className="space-y-3">
              {data.examples.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="inline-flex items-center gap-1 font-medium text-rose-600 dark:text-rose-400">
                    <span aria-hidden>❌</span> {row.wrong}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                    <span aria-hidden>✅</span> {row.correct}
                  </span>
                </div>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm dark:border-slate-700">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">O&apos;quvchilar</dt>
                <dd className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {data.students}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Darslar</dt>
                <dd className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {data.lessons}
                </dd>
              </div>
            </dl>
          </div>

          <SubjectQuizPanel quizPages={data.quizPages} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SubjectCardProps = {
  id: number;
  short: string;
  image?: string;
  category?: string;
  title: string;
  description: string;
  students: number;
  lessons: number;
};

export function SubjectCard({
  id,
  short,
  image,
  category,
  title,
  description,
  students,
  lessons,
}: SubjectCardProps) {
  const router = useRouter();
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeModals = useCallback(() => {
    setArchiveModalOpen(false);
    setDeleteModalOpen(false);
  }, []);

  useEffect(() => {
    if (!archiveModalOpen && !deleteModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModals();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [archiveModalOpen, deleteModalOpen, closeModals]);

  useEffect(() => {
    if (!archiveModalOpen && !deleteModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [archiveModalOpen, deleteModalOpen]);

  const archiveTitleId = `subject-card-${id}-archive-title`;
  const deleteTitleId = `subject-card-${id}-delete-title`;
  const canUseDom = typeof document !== "undefined";

  return (
    <>
    <article
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/subject/${id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(`/subject/${id}`);
        }
      }}
      className="hover:translate-y-[-10px] duration-200 transition-transform group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm outline-none ring-blue-500/40 focus-visible:ring-2 dark:border-slate-700 dark:bg-slate-800"
    >
      <div
        className="pointer-events-none absolute top-2 left-2 z-20 flex translate-y-2 items-center gap-1.5 rounded-xl border border-white/40 bg-white/70 p-1 shadow-lg backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 dark:border-slate-600/70 dark:bg-slate-900/70"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Archive"
          onClick={(event) => {
            event.stopPropagation();
            setArchiveModalOpen(true);
          }}
          className="grid h-8 w-8 scale-95 place-items-center rounded-lg text-amber-600 transition duration-200 hover:scale-100 hover:bg-amber-100/80 focus-visible:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group-hover:scale-100 dark:text-amber-300 dark:hover:bg-amber-500/20"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path d="M4 7h16M6 7v11h12V7M9 11h6" strokeWidth="1.8" />
            <rect x="3" y="4" width="18" height="3" rx="1" strokeWidth="1.8" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Edit"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/subject/${id}`);
          }}
          className="grid h-8 w-8 scale-95 place-items-center rounded-lg text-blue-600 transition duration-200 hover:scale-100 hover:bg-blue-100/80 focus-visible:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group-hover:scale-100 dark:text-blue-300 dark:hover:bg-blue-500/20"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path d="M4 20h4l10-10-4-4L4 16v4zM12 6l4 4" strokeWidth="1.8" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Delete"
          onClick={(event) => {
            event.stopPropagation();
            setDeleteModalOpen(true);
          }}
          className="grid h-8 w-8 scale-95 place-items-center rounded-lg text-rose-600 transition duration-200 hover:scale-100 hover:bg-rose-100/80 focus-visible:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 group-hover:scale-100 dark:text-rose-300 dark:hover:bg-rose-500/20"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path d="M5 7h14M9 7V5h6v2M8 7v12h8V7" strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      <div className="relative h-44 w-full">
        {image ? (
          <img
            src={image}
            alt={title}
            width={100}
            height={100}
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-blue-50 text-2xl font-semibold text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
            {short}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />
      </div>

      <div className="p-4">
        <div className="mb-2 absolute top-2 right-2 flex items-start justify-end">
          {category ? (
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {category}
            </span>
          ) : null}
        </div>

        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="mt-2 min-h-12 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400">
              O&apos;quvchilar
            </p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {students}
            </p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400">Darslar</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {lessons}
            </p>
          </div>
        </div>
      </div>
    </article>

    {canUseDom && archiveModalOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="presentation"
            onClick={closeModals}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={archiveTitleId}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-600 dark:bg-slate-900"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id={archiveTitleId} className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Arxivlash
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                &quot;{title}&quot; fanini arxivga o&apos;tkazishni xohlaysizmi? Arxivlangan fanlar ro&apos;yxatda alohida
                ko&apos;rinadi.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                  Arxivlash
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null}

    {canUseDom && deleteModalOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="presentation"
            onClick={closeModals}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={deleteTitleId}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-600 dark:bg-slate-900"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id={deleteTitleId} className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                O&apos;chirish
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                &quot;{title}&quot; fanini butunlay o&apos;chirishni tasdiqlaysizmi? Bu amalni qaytarib bo&apos;lmaydi.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  Ha, o&apos;chirish
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null}
    </>
  );
}

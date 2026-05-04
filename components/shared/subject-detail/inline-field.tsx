"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type InlineTextProps = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
};

/** Bosilganda oddiy input/textarea ochiladi; blur yoki Enter bilan saqlanadi */
export function InlineText({
  value,
  onChange,
  className,
  inputClassName,
  placeholder = "Bosib yozing…",
  multiline = false,
  disabled = false,
}: InlineTextProps) {
  const [active, setActive] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (!active) setDraft(value);
  }, [value, active]);

  if (disabled) {
    return <span className={className}>{value}</span>;
  }

  if (active) {
    const common =
      "w-full rounded-md border border-blue-500 bg-white px-2 py-1 text-inherit outline-none ring-2 ring-blue-500/20 dark:bg-slate-950";
    if (multiline) {
      return (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            onChange(draft.trim());
            setActive(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setDraft(value);
              setActive(false);
            }
          }}
          rows={4}
          autoFocus
          className={cn(common, "min-h-[4rem] resize-y", inputClassName, className)}
        />
      );
    }
    return (
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          onChange(draft);
          setActive(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange((e.target as HTMLInputElement).value);
            setActive(false);
          }
          if (e.key === "Escape") {
            setDraft(value);
            setActive(false);
          }
        }}
        autoFocus
        className={cn(common, inputClassName, className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value);
        setActive(true);
      }}
      className={cn(
        "inline-block min-h-[1.25em] w-full cursor-text rounded-md px-1 text-left transition hover:bg-blue-500/10 hover:ring-1 hover:ring-blue-400/40",
        className
      )}
    >
      {value ? (
        <span className="whitespace-pre-wrap break-words">{value}</span>
      ) : (
        <span className="text-slate-400 italic dark:text-slate-500">{placeholder}</span>
      )}
    </button>
  );
}

function isDataUrl(s: string) {
  return s.startsWith("data:");
}

type InlineImageUrlProps = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  inputClassName?: string;
};

/** Rasm URL: data:... uzun bo‘lsa ko‘rinishda qisqa matn; tahrirda HTTPS yozish yoki bo‘sh qoldirib saqlash (data saqlanadi) */
export function InlineImageUrl({
  value,
  onChange,
  className,
  inputClassName,
}: InlineImageUrlProps) {
  const [active, setActive] = useState(false);
  const [draft, setDraft] = useState("");

  const dataUrl = isDataUrl(value);

  useEffect(() => {
    if (!active) {
      setDraft(dataUrl ? "" : value);
    }
  }, [value, active, dataUrl]);

  if (active) {
    return (
      <input
        type="url"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={
          dataUrl
            ? "Yangi https://... havola (bo‘sh qoldirsangiz — joriy fayl saqlanadi)"
            : "https://..."
        }
        onBlur={() => {
          const t = draft.trim();
          if (t === "") {
            if (dataUrl) {
              onChange(value);
            } else {
              onChange("");
            }
          } else {
            onChange(t);
          }
          setActive(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
          }
          if (e.key === "Escape") {
            setDraft(dataUrl ? "" : value);
            setActive(false);
          }
        }}
        autoFocus
        className={cn(
          "w-full rounded-md border border-blue-500 bg-white px-2 py-1 font-mono text-xs outline-none ring-2 ring-blue-500/20 dark:bg-slate-950",
          inputClassName,
          className
        )}
      />
    );
  }

  const displayLabel = !value
    ? null
    : dataUrl
      ? "Mahalliy rasm (fayldan — data URL)"
      : value;

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(dataUrl ? "" : value);
        setActive(true);
      }}
      className={cn(
        "inline-block min-h-[1.25em] w-full cursor-text rounded-md px-1 text-left font-mono text-xs transition hover:bg-blue-500/10 hover:ring-1 hover:ring-blue-400/40",
        className
      )}
    >
      {displayLabel ? (
        <span
          className={cn(
            "break-all",
            dataUrl && "font-sans text-slate-600 dark:text-slate-300"
          )}
        >
          {displayLabel}
        </span>
      ) : (
        <span className="text-slate-400 italic dark:text-slate-500">
          Rasm URL (https yoki fayl)
        </span>
      )}
    </button>
  );
}

type InlineNumberProps = {
  value: number;
  onChange: (v: number) => void;
  className?: string;
  min?: number;
};

export function InlineNumber({
  value,
  onChange,
  className,
  min = 0,
}: InlineNumberProps) {
  const [active, setActive] = useState(false);
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    if (!active) setDraft(String(value));
  }, [value, active]);

  if (active) {
    return (
      <input
        type="number"
        min={min}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          const n = Number(draft);
          onChange(Number.isFinite(n) ? n : min);
          setActive(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const n = Number((e.target as HTMLInputElement).value);
            onChange(Number.isFinite(n) ? n : min);
            setActive(false);
          }
          if (e.key === "Escape") {
            setDraft(String(value));
            setActive(false);
          }
        }}
        autoFocus
        className={cn(
          "w-full max-w-[8rem] rounded-md border border-blue-500 bg-white px-2 py-0.5 font-semibold outline-none ring-2 ring-blue-500/20 dark:bg-slate-950",
          className
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={cn(
        "cursor-text rounded-md px-1 text-left font-semibold hover:bg-blue-500/10 hover:ring-1 hover:ring-blue-400/40",
        className
      )}
    >
      {value}
    </button>
  );
}

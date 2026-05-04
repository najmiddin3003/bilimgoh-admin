"use client";

import { subjectCards } from "@/constants";
import { SubjectCard } from "@/components/shared/cards/subject-card";
import { useMemo, useState } from "react";

export function SubjectsCardsSection() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  const categories = useMemo(() => {
    const values = new Set(subjectCards.map((subject) => subject.category));
    return ["Barchasi", ...values];
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjectCards.filter((subject) => {
      const matchesCategory =
        selectedCategory === "Barchasi" ? true : subject.category === selectedCategory;
      const matchesSearch = `${subject.title} ${subject.description}`
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [searchText, selectedCategory]);

  return (
    <section className="rounded-2xl bg-white/80 p-4 md:p-6 dark:bg-slate-900/80">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Fanlar</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Barcha fanlarni boshqarish, ma&apos;lumotlarni tahrirlash yoki o&apos;chirish.
          </p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + Yangi fan qo&apos;shish
        </button>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          type="text"
          placeholder="Fan nomi bo'yicha qidirish..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-blue-300 transition placeholder:text-slate-400 focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Natija: {filteredSubjects.length}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredSubjects.map((subject) => (
          <SubjectCard key={subject.id} {...subject} />
        ))}
      </div>

      {filteredSubjects.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Mos fan topilmadi. Qidiruv yoki filterni o&apos;zgartirib ko&apos;ring.
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Jami {filteredSubjects.length} ta fan
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {"<"}
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-blue-200 bg-blue-50 font-semibold text-blue-600 dark:border-blue-500/50 dark:bg-blue-500/20 dark:text-blue-300"
          >
            1
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            2
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            3
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}

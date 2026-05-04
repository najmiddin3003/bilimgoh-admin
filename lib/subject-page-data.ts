import { subjectCards } from "@/constants";

export type SubjectExample = { wrong: string; correct: string };

export type SubjectQuizOption = { key: string; text: string };

export type SubjectQuizQuestion = {
  id: string;
  prompt: string;
  options: SubjectQuizOption[];
};

export type SubjectQuizPage = {
  pageIndex: number;
  questions: SubjectQuizQuestion[];
};

export type SubjectPageData = {
  id: number;
  short: string;
  image?: string;
  category?: string;
  title: string;
  description: string;
  students: number;
  lessons: number;
  topicBanner: string;
  grammarSectionTitle: string;
  videoEmbedSrc: string;
  contentImage: string;
  examples: SubjectExample[];
  quizPages: SubjectQuizPage[];
};

function defaultQuizPages(topicLabel: string): SubjectQuizPage[] {
  return [1, 2, 3, 4].map((pageIndex) => ({
    pageIndex,
    questions: [
      {
        id: `${pageIndex}-1`,
        prompt: `${topicLabel} bo'yicha ${pageIndex}-sahifa. 1-savol`,
        options: [
          { key: "A", text: "Variant A" },
          { key: "B", text: "Variant B" },
          { key: "C", text: "Variant C" },
          { key: "D", text: "Variant D" },
        ],
      },
      {
        id: `${pageIndex}-2`,
        prompt: `${topicLabel} bo'yicha ${pageIndex}-sahifa. 2-savol`,
        options: [
          { key: "A", text: "Variant A" },
          { key: "B", text: "Variant B" },
          { key: "C", text: "Variant C" },
        ],
      },
    ],
  }));
}

function buildDefaultPageData(
  card: (typeof subjectCards)[number]
): Omit<SubjectPageData, keyof (typeof subjectCards)[number]> {
  return {
    topicBanner: card.title.toUpperCase(),
    grammarSectionTitle: "Mavzu bo'yicha grammatik qoidalar va misollar",
    videoEmbedSrc: "https://www.youtube.com/embed/0YFrGy6MJ8c",
    contentImage: card.image ?? "",
    examples: [
      { wrong: "Salom", correct: "Assalomu alaykum" },
      { wrong: "Men student", correct: "Men talabaman" },
    ],
    quizPages: defaultQuizPages(card.title),
  };
}

export function getSubjectPageData(id: string): SubjectPageData | null {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;

  const card = subjectCards.find((s) => s.id === numericId);
  if (!card) return null;

  const defaults = buildDefaultPageData(card);
  return { ...card, ...defaults };
}

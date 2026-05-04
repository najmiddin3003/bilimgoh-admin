import { SubjectsCardsSection } from "@/components/shared/cards/subjects-cards-section";

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <main className="ml-20 p-4 transition-all duration-300 md:ml-72 md:p-8">
        <SubjectsCardsSection />
      </main>
    </div>
  );
}

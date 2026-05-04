import { notFound } from "next/navigation";
import { getSubjectPageData } from "@/lib/subject-page-data";
import { SubjectTopicView } from "@/components/shared/subject-detail/subject-topic-view";

type SubjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SubjectByIdPage({ params }: SubjectPageProps) {
  const { id } = await params;
  const data = getSubjectPageData(id);
  if (!data) notFound();

  return <SubjectTopicView data={data} />;
}

export async function generateMetadata({ params }: SubjectPageProps) {
  const { id } = await params;
  const data = getSubjectPageData(id);
  if (!data) return { title: "Fan topilmadi" };

  return {
    title: `${data.title} — ${data.topicBanner}`,
    description: data.description,
  };
}

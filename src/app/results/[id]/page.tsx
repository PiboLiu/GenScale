import { ResultView } from "@/components/generator/result-view";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ResultView generationId={id} />;
}

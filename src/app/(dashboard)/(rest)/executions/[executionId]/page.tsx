import { requireAuth } from "@/lib/auth-utils";

interface Props {
  params: Promise<{ executionId: string }>;
}

const ExecutionIdPage = async ({ params }: Props) => {
  await requireAuth();

  const { executionId } = await params;

  return <div>Execution id: {executionId}</div>;
};

export default ExecutionIdPage;

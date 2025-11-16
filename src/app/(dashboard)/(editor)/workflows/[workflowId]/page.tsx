import { requireAuth } from "@/lib/auth-utils";

interface Props {
  params: Promise<{ workflowId: string }>;
}

const WorkflowIdPage = async ({ params }: Props) => {
  await requireAuth();

  const { workflowId } = await params;

  return <div>Workflow id: {workflowId}</div>;
};

export default WorkflowIdPage;

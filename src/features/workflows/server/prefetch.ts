import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getMany>;

export async function prefetchWorkflows(params: Input) {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
}

export async function prefetchWorkflow(id: string) {
  return prefetch(trpc.workflows.getOne.queryOptions({ id }));
}

import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.credentials.getMany>;

export async function prefetchCredentials(params: Input) {
  return prefetch(trpc.credentials.getMany.queryOptions(params));
}

export async function prefetchCredential(id: string) {
  return prefetch(trpc.credentials.getOne.queryOptions({ id }));
}

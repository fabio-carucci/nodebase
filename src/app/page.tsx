"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/features/auth/components/logout-button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";

const Home = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow created");
      },
      onError: () => {},
    }),
  );

  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-4 items-center justify-center">
      <span>Protected server component</span>
      <span>{JSON.stringify(data, null, 2)}</span>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Home;

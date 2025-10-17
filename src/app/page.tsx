import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Home = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-4 items-center justify-center">
      protected server component
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default Home;

import { caller } from "@/trpc/server";

const Home = async () => {
  const users = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-4 items-center justify-center">
      <h1>Users:</h1>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

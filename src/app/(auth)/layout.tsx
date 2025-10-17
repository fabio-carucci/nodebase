import { requireUnauth } from "@/lib/auth-utils";

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  // check if user is authenticated
  await requireUnauth();

  return <div>{children}</div>;
};

export default AuthLayout;

import AuthLayout from "@/features/auth/components/auth-layout";
import { requireUnauth } from "@/lib/auth-utils";

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  // check if user is authenticated
  await requireUnauth();

  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;

import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex flex-col gap-6 max-w-sm w-full">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image src="/logos/logo.svg" width={30} height={30} alt="Nodebase" />
          <span>Nodebase</span>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

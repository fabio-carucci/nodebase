import { requireAuth } from "@/lib/auth-utils";

interface Props {
  params: Promise<{ credentialId: string }>;
}

const CredentialsIdPage = async ({ params }: Props) => {
  await requireAuth();

  const { credentialId } = await params;

  return <div>Credential id: {credentialId}</div>;
};

export default CredentialsIdPage;

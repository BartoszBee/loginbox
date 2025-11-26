import ResetTokenForm from "./ResetTokenForm";

export default async function ResetTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <ResetTokenForm token={token} />;
}
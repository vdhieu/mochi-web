import { GetServerSideProps } from "next";
import { DashboardPage } from "~app/dashboard";
import { DashboardLayout } from "~app/dashboard/layout";
import { SEO } from "~app/layout/seo";
import { DiscordUser } from "~pages/api/oauth";
import { parseUser } from "~utils/user";

export interface DiscordUserProps {
  user: DiscordUser;
}

interface Props {
  user: DiscordUser | null;
}

export default function dashboard(props: DiscordUserProps) {
  return (
    <DashboardLayout user={props.user}>
      <SEO title="Dashboard" tailTitle />
      <DashboardPage />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async function (
  ctx
) {
  const user = parseUser(ctx);

  if (!user) {
    ctx.res.statusCode = 307;
    ctx.res.setHeader("Location", "/api/oauth");
    ctx.res.end();
  }

  return { props: { user } };
};

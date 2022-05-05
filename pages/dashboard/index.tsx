import { GetServerSideProps } from "next";
import { DashboardLayout } from "~app/dashboard/layout";
import { SEO } from "~app/layout/seo";
import { DiscordUser } from "~pages/api/oauth";
import { parseUser } from "~utils/user";

type Props = { user: DiscordUser | null };

export default function DashboardPage(props: Props) {
  return (
    <DashboardLayout>
      <SEO title="Dashboard" tailTitle />
      <div>
        {!props.user && (
          <h2 className="text-4xl font-bold text-center">
            You are being redirected.
          </h2>
        )}
        {props.user && (
          <p>
            Hey, {props.user.username}#{props.user.discriminator}
          </p>
        )}
      </div>
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

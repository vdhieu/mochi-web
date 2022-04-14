import { GetServerSideProps } from "next";
import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { DiscordUser } from "~pages/api/oauth";
import { parseUser } from "~utils/user";

type Props = { user: DiscordUser | null };

export default function DashboardPage(props: Props) {
  return (
    <Layout>
      <SEO title="Dashboard" tailTitle />
      <div className="max-w-5xl px-12 py-48 mx-auto">
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
    </Layout>
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

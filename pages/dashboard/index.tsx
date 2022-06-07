import { GetServerSideProps } from "next";
import { DashboardPage } from "~app/dashboard";
import { Layout } from "~app/layout/dashboard";
import { SEO } from "~app/layout/seo";
import { DiscordTokenProps, withAuth } from "~utils/oauth";

export default function dashboard(props: DiscordTokenProps) {
  return (
    <Layout {...props}>
      <SEO title="Dashboard" tailTitle />
      <DashboardPage />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<DiscordTokenProps> =
  withAuth;

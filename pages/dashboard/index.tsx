import { useRouter } from "next/router";
import { useEffect } from "react";
import { DashboardPage } from "~app/dashboard";
import { Layout } from "~app/layout/dashboard";
import { SEO } from "~app/layout/seo";
import { useUserAuth } from "~hooks/useUserAuth";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthorized, authorize, setToken } = useUserAuth();

  const { access_token } = router.query;

  useEffect(() => {
    if (!access_token) {
      if (isAuthorized() === false) authorize();
      return;
    }
    if (access_token && typeof access_token === "string")
      setToken(access_token);
  }, [access_token, authorize, isAuthorized, setToken]);

  return (
    <Layout>
      <SEO title="Dashboard" tailTitle />
      <DashboardPage />
    </Layout>
  );
}

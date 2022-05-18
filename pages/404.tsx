import { Layout } from "~app/layout/landing";
import { SEO } from "~app/layout/seo";

export default function notfound() {
  return (
    <Layout>
      <SEO title="404" tailTitle />
      <div className="max-w-5xl px-12 py-48 mx-auto">
        <h2 className="text-4xl font-bold text-center">
          🍡
          <br />
          not found!
        </h2>
      </div>
    </Layout>
  );
}

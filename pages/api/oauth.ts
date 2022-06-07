import "isomorphic-fetch";
import { NextApiRequest, NextApiResponse } from "next";

const { CLIENT_ID, APP_URI } = process.env;

const scope = ["identify"].join(" ");
const REDIRECT_URI = `${APP_URI}/api/oauth`;

const OAUTH_QS = new URLSearchParams({
  client_id: CLIENT_ID || "0",
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope,
}).toString();

const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

export default async function OauthPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.redirect("/");

  const { code = null, error: queryError = null } = req.query;

  if (queryError) return res.redirect("/?error=oauth");
  if (!code || typeof code !== "string") return res.redirect(OAUTH_URI);

  res.redirect(`/test?code=${code}`);
}

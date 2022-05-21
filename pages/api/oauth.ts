import "isomorphic-fetch";
import { NextApiRequest, NextApiResponse } from "next";
import { API } from "~constants/api";

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
}

const { CLIENT_SECRET, CLIENT_ID, APP_URI } = process.env;

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

  const body = new URLSearchParams({
    client_id: CLIENT_ID!,
    client_secret: CLIENT_SECRET!,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
    code,
    scope,
  }).toString();

  const oauth2 = await fetch("https://discord.com/api/oauth2/token", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body,
  });
  const { access_token = null } = await oauth2.json();

  if (!access_token || typeof access_token !== "string")
    return res.redirect("/?error=Cannot authorize");

  const { result, error: loginError } = await API.login(access_token);

  if (loginError) return res.redirect("/?error=Cannot authorize");

  if (result) return res.redirect(`/dashboard?token=${access_token}`);

  return res.redirect("/?error=Something went wrong");
}

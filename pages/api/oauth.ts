import cookie from "cookie";
import "isomorphic-fetch";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const RETURN_TO = "/dashboard";

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

const { CLIENT_SECRET, CLIENT_ID, APP_URI, JWT_SECRET, COOKIE_NAME } =
  process.env;

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

  const { code = null, error = null } = req.query;

  if (error) return res.redirect("/?error=oauth");
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

  if (!access_token || typeof access_token !== "string") {
    return res.redirect(OAUTH_URI);
  }

  const getUser = await fetch("http://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const me: DiscordUser | { unauthorized: true } = await getUser.json();

  if (!("id" in me)) return res.redirect(OAUTH_URI);

  const token = jwt.sign(me, JWT_SECRET!, { expiresIn: "24h" });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/",
    })
  );

  res.redirect(RETURN_TO);
}

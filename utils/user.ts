import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";
import { DiscordUser } from "~pages/api/oauth";

const { JWT_SECRET, COOKIE_NAME } = process.env;

export const parseUser = (
  ctx: GetServerSidePropsContext
): DiscordUser | null => {
  if (!ctx.req.headers.cookie) return null;

  const token = parse(ctx.req.headers.cookie)[COOKIE_NAME!];
  if (!token) return null;

  try {
    const { iat, exp, ...user } = verify(token, JWT_SECRET!) as DiscordUser & {
      iat: number;
      exp: number;
    };

    return user;
  } catch (e) {
    return null;
  }
};

import { parse } from "cookie";
import { GetServerSideProps } from "next";

export const DISCORD_STORAGE_KEY = "discord_token";

export interface DiscordTokenProps {
  discordToken: string;
}

export const withAuth: GetServerSideProps<DiscordTokenProps> = async function ({
  req,
}) {
  if (!req.headers.cookie) {
    return { redirect: { destination: "/api/oauth", permanent: false } };
  }

  const discordToken = parse(req.headers.cookie)[DISCORD_STORAGE_KEY];
  return { props: { discordToken } };
};

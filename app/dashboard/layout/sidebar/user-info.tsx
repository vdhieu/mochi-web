import { DiscordUserProps } from "~pages/dashboard";

export const UserInfo = ({ user }: DiscordUserProps) => (
  <div className="flex items-center gap-2 mt-auto mb-4">
    <img
      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=64`}
      alt={user.username}
      className="block w-6 h-6 rounded-full"
    />
    <span className="font-medium">
      Hello, {user.username}#{user.discriminator}
    </span>
  </div>
);

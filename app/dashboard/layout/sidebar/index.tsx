import { DiscordUserProps } from "~pages/dashboard";
import { Links } from "./links";
import { ServerSelect } from "./server-select";
import { UserInfo } from "./user-info";

export const Sidebar = (props: DiscordUserProps) => {
  return (
    <div className="flex flex-col px-6 border-r border-gray-200 bg-gray-50 w-96 py-9">
      <ServerSelect />
      <div className="mt-12" />
      <Links />
      <UserInfo user={props.user} />
    </div>
  );
};

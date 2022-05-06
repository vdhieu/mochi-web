import { DiscordUserProps } from "~pages/dashboard";
import { Links } from "./links";
import { ServerSelect } from "./server-select";
import { UserInfo } from "./user-info";

export const Sidebar = (props: DiscordUserProps) => {
  return (
    <div className="flex flex-col px-6 bg-gray-100 border-r border-gray-200 w-96 py-9">
      <ServerSelect />
      <div className="mt-12" />
      <Links />
      <UserInfo user={props.user} />
    </div>
  );
};

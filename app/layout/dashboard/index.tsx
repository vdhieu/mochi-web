import { DiscordUserProps } from "~pages/dashboard";
import { Sidebar } from "./sidebar";

interface Props extends DiscordUserProps {
  children: React.ReactNode;
}

export const Layout = (props: Props) => (
  <div className="flex w-screen h-screen overflow-hidden bg-gray-100">
    <Sidebar user={props.user} />
    <div className="flex-1 h-screen overflow-x-hidden overflow-y-auto">
      {props.children}
    </div>
  </div>
);

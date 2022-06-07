import { useEffect } from "react";
import { useUserAuth } from "~hooks/useUserAuth";
import { DiscordTokenProps } from "~utils/oauth";
import { Sidebar } from "./sidebar";

interface Props extends DiscordTokenProps {
  children: React.ReactNode;
}

export const Layout = (props: Props) => {
  const { isAuthorized, authorize } = useUserAuth(props.discordToken);

  useEffect(() => {
    if (isAuthorized() === false) authorize();
  }, []);

  if (process.browser && isAuthorized()) {
    return (
      <div className="flex w-screen h-screen overflow-hidden bg-gray-100">
        <Sidebar />
        <div className="flex-1 h-screen overflow-x-hidden overflow-y-auto">
          {props.children}
        </div>
      </div>
    );
  }

  return <>no authorize</>;
};

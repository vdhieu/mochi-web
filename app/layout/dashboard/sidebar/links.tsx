import {
  ChatAlt2Icon,
  ChatIcon,
  CogIcon,
  HandIcon,
  HeartIcon,
  TrendingUpIcon,
  UserGroupIcon,
  UsersIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { SVGProps } from "react";

interface ItemProps {
  name: string;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  path?: string;
}

const DASHBOARD_ROUTES: ItemProps[] = [
  {
    icon: ViewGridIcon,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: UsersIcon,
    name: "Leaderboard",
    path: "/leaderboard",
  },
  {
    icon: CogIcon,
    name: "Settings",
    path: "/settings",
  },
  {
    name: "Server management",
  },
  {
    icon: HandIcon,
    name: "Welcome",
    path: "/welcome",
  },
  {
    icon: ChatAlt2Icon,
    name: "Custom Commands",
    path: "/commands",
  },
  {
    icon: HeartIcon,
    name: "Reaction Roles",
    path: "/roles",
  },
  {
    name: "Engagement",
  },
  {
    icon: TrendingUpIcon,
    name: "Levels",
    path: "/levels",
  },
  {
    icon: UserGroupIcon,
    name: "NFT Ranking",
    path: "/ranking",
  },
  {
    name: "Utilities",
  },
  {
    icon: ChatIcon,
    name: "Embeds",
    path: "/embeds",
  },
];

const Item = (props: { item: ItemProps; active: boolean }) => {
  if (!props.item.icon || !props.item.path) return null;
  return (
    <button
      className={classNames(
        "relative px-4 py-3 rounded-lg flex items-center gap-2 w-full mb-2 group hover:z-10",
        "transition-shadow ease duration-200",
        props.active ? "bg-gray-800" : "bg-white hover:bg-gray-100"
      )}
    >
      <props.item.icon className="block w-6 h-6 text-gray-400 transition-transform duration-200 group-hover:transform group-hover:scale-110 ease" />
      <div
        className={classNames(
          "flex-1 text-sm font-medium truncate text-left",
          props.active && "text-white"
        )}
      >
        {props.item.name}
      </div>
    </button>
  );
};

export const Links = () => {
  return (
    <div className="flex-1 pr-2 overflow-y-auto scroller">
      {DASHBOARD_ROUTES.map((item, key) => {
        if (item.path)
          return (
            <Item key={item.path} item={item} active={item.path === "/"} />
          );
        return (
          <div key={key} className="mt-6 mb-4 text-sm font-semibold uppercase">
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

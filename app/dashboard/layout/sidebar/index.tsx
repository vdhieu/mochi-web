import { UsersIcon, ViewGridIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { ServerSelect } from "./server";

const DASHBOARD_ROUTES = [
  {
    icon: ViewGridIcon,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: UsersIcon,
    name: "Leaderboard",
    path: "/dashboard/leaderboard",
  },
];

export const Sidebar = () => {
  return (
    <div className="px-6 bg-gray-100 border-r border-gray-200 w-96 py-9">
      <ServerSelect />
      <div className="mt-12" />
      <div>
        {DASHBOARD_ROUTES.map((item) => {
          const active = item.path === "/dashboard";
          return (
            <button
              key={item.path}
              className={classNames(
                "px-4 py-3 rounded-lg hover:shadow-xl shadow-gray-50 flex items-center gap-2 w-full mb-2",
                active ? "bg-gray-800" : "bg-white"
              )}
            >
              <item.icon className="block w-6 h-6 text-gray-400" />
              <div
                className={classNames(
                  "flex-1 text-sm font-medium truncate text-left",
                  active && "text-white"
                )}
              >
                {item.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import { Sidebar } from "./sidebar";

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout = (props: Props) => (
  <div className="flex w-screen h-screen overflow-hidden">
    <Sidebar />
    <div className="flex-1 h-screen overflow-x-hidden overflow-y-auto">
      {props.children}
    </div>
  </div>
);

import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-wrap min-h-[100vh]">
      <Sidebar />
      <div className="bg-slate-200 flex-1 p-6 overflow-x-auto">{children}</div>
    </div>
  );
};

export default ProfileLayout;

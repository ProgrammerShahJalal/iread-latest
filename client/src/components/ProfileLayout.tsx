import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-slate-200 flex-1 p-6">{children}</div>
    </div>
  );
};

export default ProfileLayout;

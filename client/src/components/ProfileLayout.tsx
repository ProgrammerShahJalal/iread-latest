import { Suspense } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-wrap min-h-[100vh]">
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
      <div className="bg-slate-200 flex-1 p-6 overflow-x-auto">{children}</div>
    </div>
  );
};

export default ProfileLayout;
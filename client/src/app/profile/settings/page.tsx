import Sidebar from "../../../components/Sidebar";


const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-4">Manage your account settings here.</p>
      </div>
    </div>
  );
};

export default Settings;

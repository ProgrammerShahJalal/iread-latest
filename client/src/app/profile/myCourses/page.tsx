import Sidebar from "../../../components/Sidebar";


const MyCoursesPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="mt-4">This is the page for my courses</p>
      </div>
    </div>
  );
};

export default MyCoursesPage;

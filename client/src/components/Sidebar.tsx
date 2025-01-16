"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Profile", path: "/profile" },
    { name: "My Courses", path: "/profile/myCourses" },
    { name: "Settings", path: "/profile/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800">
      <nav className="mt-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`block px-4 py-2 mt-2 rounded ${
              pathname === link.path ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

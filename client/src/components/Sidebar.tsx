"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navLinks = [
    { name: "My Profile", path: "/profile" },
    { name: "My Events", path: `/profile/myEvents?uid=${user?.id}` },
    { name: "Settings", path: "/profile/settings" },
  ];

  // const handleLogout = () => {
  //   localStorage.removeItem("user"); // Remove user from localStorage
  //   setUser(null); // Reset user state
  //   router.push("/login"); // Redirect to login page
  // };

  return (
    <div className="w-64 h-screen">
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
      {/* <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Logout
                      </button> */}
    </div>
  );
};

export default Sidebar;

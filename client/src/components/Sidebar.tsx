"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const uidFromQuery = searchParams.get("uid");
      if (!uidFromQuery || uidFromQuery !== String(parsedUser.id)) {
        router.replace("/profile/404");
      }
    } else {
      router.replace("/profile/404");
    }
  }, [searchParams, router]);

  const navLinks = [
    { name: "My Profile", path: `/profile?uid=${user?.id}`  },
    { name: "My Events", path: `/profile/myEvents?uid=${user?.id}` },
    { name: "Settings", path: `/profile/settings?uid=${user?.id}` },
  ];


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
    </div>
  );
};

export default Sidebar;
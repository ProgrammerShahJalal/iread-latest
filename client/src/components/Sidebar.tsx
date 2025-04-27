"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);

          const uidFromQuery = searchParams.get("uid");
          if (!uidFromQuery || uidFromQuery !== String(parsedUser.uid)) {
            router.replace("/profile/404");
          }
        } catch (error) {
          console.error("Failed to parse user data:", error);
          router.replace("/profile/404");
        }
      } else {
        router.replace("/profile/404");
      }
    }
  }, [searchParams, router]);


  const navLinks = [
    {
      name: "My Profile",
      path: user ? `/profile?slug=${user.slug}&uid=${user.uid}` : "/profile",
      matchPath: (currentPath: string) => currentPath === '/profile'
    },
    { 
      name: "My Events", 
      path: `/profile/myEvents?uid=${user?.uid}`,
      matchPath: (currentPath: string) => currentPath.startsWith('/profile/myEvents')
    },
    { 
      name: "Settings", 
      path: `/profile/settings?uid=${user?.uid}`,
      matchPath: (currentPath: string) => currentPath.startsWith('/profile/settings')
    },
  ];

  // Helper function to determine if link is active
  const isActive = (link: typeof navLinks[0]) => {
    const currentPath = pathname.split('?')[0];
    return link.matchPath(currentPath);
  };

  return (
    <div className="w-36 md:w-64 h-screen">
      <nav className="mt-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`
              relative block px-4 py-2 mt-2 rounded-lg
              transition-all duration-300 ease-in-out
              hover:bg-white hover:text-gray-900
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
              ${isActive(link) 
                ? "bg-white text-gray-900 font-medium" 
                : "hover:bg-opacity-20 hover:text-white"}
            `}
            aria-current={isActive(link) ? "page" : undefined}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import apiClient from "../../../lib/apiClient";

function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false); // Controls hamburger menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls profile dropdown
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    // Function to update user state from localStorage
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    fetchUser(); // Initial fetch

    // Listen for localStorage changes (profile update)
    const handleStorageChange = () => fetchUser();
    window.addEventListener("userUpdated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("userUpdated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const BASE_URL = apiClient.defaults.baseURL;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "frontend",
          user: user,
        }),
      });

      // Check if the response is a success
      if (response.ok) {
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("userUpdated"));
        setUser(null);
        toast.success("Logout successful!");
        router.push("/login");
      } else {
        const errorText = await response.text();
        console.error("Logout failed:", errorText);
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout.");
    } finally {
      setShowLogoutModal(false);
      setDropdownOpen(false);
    }
  };

  const openLogoutConfirmation = () => {
    setShowLogoutModal(true);
    setDropdownOpen(false);
  };

  // Helper function to determine if link is active
  const isActive = (href: string) => {
    // Exact match for home, otherwise startsWith
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div>
      <div className="header-nav">
        <div className="header-nav-wrapper navbar-scrolltofixed bg-theme-colored border-bottom-theme-color-2-1px">
          <div className="container">
            <nav
              id="menuzord"
              className="menuzord bg-theme-colored pull-left flip menuzord-responsive flex justify-between items-center"
            >
              {/* Hamburger Menu Button */}
              <div className="mobile-menu-toggle">
                <button
                  id="menu-toggle"
                  className="menu-toggle block lg:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  ☰
                </button>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
                  <ul className="mobile-menu-list">
                    {[
                      { href: "/", name: "Home" },
                      { href: "/about", name: "About Us" },
                      { href: "/events", name: "Events" },
                      { href: "/courses", name: "Courses" },
                      { href: "/forum", name: "Forum" },
                      { href: "/blogs", name: "Blogs" },
                      { href: "/trainers", name: "Trainers" },
                      { href: "/aiModels", name: "AI Models" },
                      { href: "/contact", name: "Contact" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`
                            block px-4 py-2 rounded-2xl
                            transition-all duration-300 ease-in-out
                            hover:bg-white hover:text-gray-900
                            ${isActive(link.href) 
                              ? "bg-white text-gray-900 font-medium" 
                              : "text-white hover:bg-opacity-20"}
                          `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Desktop Menu */}
              <ul className="desktop-menu md:flex text-white">
                {[
                  { href: "/", name: "Home" },
                  { href: "/about", name: "About Us" },
                  { href: "/events", name: "Events" },
                  { href: "/courses", name: "Courses" },
                  { href: "/forum", name: "Forum" },
                  { href: "/blogs", name: "Blogs" },
                  { href: "/trainers", name: "Trainers" },
                  { href: "/aiModels", name: "AI Models" },
                  { href: "/contact", name: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`
                        relative block px-4 py-2 rounded-2xl
                        transition-all duration-300 ease-in-out
                        hover:bg-white hover:text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                        ${isActive(link.href) 
                          ? "bg-white text-gray-900 font-medium" 
                          : "text-white hover:bg-opacity-20"}
                      `}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul>
                <li>
                  <Link
                    href="/donate"
                     className="btn btn-colored btn-flat bg-theme-color-2 text-white font-14 bs-modal-ajax-load mt-0 p-25 pr-15 pl-15"
                  >
                    Donate Us
                  </Link>
                </li>
              </ul>
              <div className="relative" ref={dropdownRef}>
                {user?.email ? (
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <Image
                      src={`${apiClient.defaults.baseURL}/${user?.photo}`}
                      alt="Profile Picture"
                      className="w-16 h-16 md:w-10 md:h-10 border border-white object-cover rounded-full"
                      width={300}
                      height={300}
                    />
                  </button>
                ) : (
                  <Link href="/login" className="text-white">
                    Login / Register
                  </Link>
                )}

                {dropdownOpen && user?.email && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden z-50">
                    <li className="px-4 py-2 text-gray-700 font-semibold border-b">
                      {user?.first_name + " " + user?.last_name}
                    </li>
                    <li>
                      <Link
                        href={`/profile?slug=${user.slug}&uid=${user.uid}`}
                        className={`
                          block px-4 py-2 
                          transition-all duration-300 ease-in-out
                          hover:bg-gray-100
                          ${isActive("/profile") ? "bg-gray-100 font-medium" : ""}
                        `}
                      >
                        Your Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={openLogoutConfirmation}
                        className={`
                          w-full text-left px-4 py-2 
                          transition-all duration-300 ease-in-out
                          hover:bg-gray-100
                        `}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

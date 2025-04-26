"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false); // Controls hamburger menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls profile dropdown
  const router = useRouter();
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

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL;

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
        router.push("/login");
      } else {
        const errorText = await response.text();
        console.error("Logout failed:", errorText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
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
                    <li>
                      <Link href="/" onClick={() => setIsOpen(false)}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" onClick={() => setIsOpen(false)}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/events" onClick={() => setIsOpen(false)}>
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link href="/courses" onClick={() => setIsOpen(false)}>
                        Courses
                      </Link>
                    </li>
                    <li>
                      <Link href="/forum" onClick={() => setIsOpen(false)}>
                        Forum
                      </Link>
                    </li>
                    <li>
                      <Link href="/blogs" onClick={() => setIsOpen(false)}>
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link href="/trainers" onClick={() => setIsOpen(false)}>
                        Trainers
                      </Link>
                    </li>
                    <li>
                      <Link href="/aiModels" onClick={() => setIsOpen(false)}>
                        AI Models
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Desktop Menu */}
              <ul className="desktop-menu md:flex text-white">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/courses">Courses</Link>
                </li>
                <li>
                  <Link href="/forum">Forum</Link>
                </li>
                <li>
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li>
                  <Link href="/trainers">Trainers</Link>
                </li>
                <li>
                  <Link href="/aiModels">AI Models</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>

              <ul>
                <li>
                  <Link
                    className="btn btn-colored btn-flat bg-theme-color-2 text-white font-14 bs-modal-ajax-load mt-0 p-25 pr-15 pl-15"
                    data-toggle="modal"
                    data-target="#BSParentModal"
                    href="/donate"
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
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.photo}`}
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
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
    </div>
  );
}

export default Navbar;

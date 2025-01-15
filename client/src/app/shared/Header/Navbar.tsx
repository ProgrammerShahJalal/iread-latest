"use client";
import React, { useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  useEffect(() => {
    const toggleButton = document.getElementById('menu-toggle');
    const menu = document.getElementById('menuzord-menu');

    toggleButton?.addEventListener('click', () => {
      menu?.classList.toggle('active');
    });

    return () => {
      toggleButton?.removeEventListener('click', () => {
        menu?.classList.toggle('active');
      });
    };
  }, []);

  return (
    <div>
      <div className="header-nav">
        <div className="header-nav-wrapper navbar-scrolltofixed bg-theme-colored border-bottom-theme-color-2-1px">
          <div className="container">
            <nav
              id="menuzord"
              className="menuzord bg-theme-colored pull-left flip menuzord-responsive flex justify-between items-center"
            >
              <button id="menu-toggle" className="menu-toggle">
                ☰
              </button>
              <ul id="menuzord-menu" className="menuzord-menu">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/events">Events</a>
                </li>
                <li>
                  <a href="/courses">Courses</a>
                </li>
                <li>
                  <a href="/forum">Forum</a>
                </li>
                <li>
                  <a href="/blogs">Blogs</a>
                </li>
                <li>
                  <a href="/trainers">Trainers</a>
                </li>
                <li>
                  <a href="/aiModels">AI Models</a>
                </li>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="btn btn-colored btn-flat bg-theme-color-2 text-white font-14 bs-modal-ajax-load mt-0 p-25 pr-15 pl-15"
                    data-toggle="modal"
                    data-target="#BSParentModal"
                    href="/donate"
                  >
                    Donate Us
                  </a>
                </li>
              </ul>
              <div id="top-search-bar" className="collapse">
                <div className="container">
                  <form
                    role="search"
                    action="#"
                    className="search_form_top"
                    method="get"
                  >
                    <input
                      type="text"
                      placeholder="Type text and press Enter..."
                      name="s"
                      className="form-control"
                      autoComplete="off"
                    />
                    <span className="search-close">
                      <i className="fa fa-search" />
                    </span>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

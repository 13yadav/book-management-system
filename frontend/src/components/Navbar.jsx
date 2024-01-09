import React from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { getToken, destroyToken } from "../services/JwtService";
import { history } from "../helpers/history";

const menuItems = [
  {
    name: "My Books",
    href: "/",
  },
  {
    name: "All Books",
    href: "/books",
  },
  {
    name: "Search Books",
    href: "/search",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isAuthenticated = !!getToken();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    destroyToken();
    history.navigate("/signin");
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to={"/"}>
              <img src="/logo.svg" className="h-12 w-auto" alt="" />
            </Link>
          </span>
          <span className="font-bold" title="Book Management System">
            B.M.S.
          </span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {isAuthenticated &&
              menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          {isAuthenticated ? (
            <Link
              to={"/publish"}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Publish Book
            </Link>
          ) : (
            <Link
              to={
                history.location.pathname === "/signin" ? "/signup" : "/signin"
              }
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {history.location.pathname === "/signin" ? "SignUp" : "SignIn"}
            </Link>
          )}
          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="ml-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Logout
            </button>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <img src="/logo.svg" className="h-12 w-auto" alt="" />
                    </span>
                    <span className="font-bold">B.M.S.</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4 mb-3">
                    {isAuthenticated &&
                      menuItems.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </NavLink>
                      ))}
                  </nav>
                </div>
                {isAuthenticated ? (
                  <Link
                    to={"/publish"}
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Publish Book
                  </Link>
                ) : (
                  <Link
                    to={
                      history.location.pathname === "/signin"
                        ? "/signup"
                        : "/signin"
                    }
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    {history.location.pathname === "/signin"
                      ? "SignUp"
                      : "SignIn"}
                  </Link>
                )}
                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={logout}
                    className="ml-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

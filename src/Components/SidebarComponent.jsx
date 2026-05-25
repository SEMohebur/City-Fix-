import { use } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const SidebarComponent = () => {
  const { userInfo, singleUserdbInfo } = use(AuthContext);

  const location = useLocation();

  const activeClass = "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20";

  const normalClass =
    "text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300";

  return (
    <div className="drawer-side is-drawer-close:overflow-visible z-50">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay backdrop-blur-sm"
      ></label>

      <div className="flex min-h-full flex-col bg-gradient-to-b from-[#0b1120] via-[#111827] to-[#172033] border-r border-white/10 shadow-2xl is-drawer-close:w-20 is-drawer-open:w-72 transition-all duration-300">
        {/* LOGO SECTION */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 px-4">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Box */}
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="size-5 text-cyan-400"
              >
                {/* Main User */}
                <path d="M9 14c-3 0-5 2-5 4v1h10v-1c0-2-2-4-5-4z" />
                <circle cx="9" cy="7" r="3" />

                {/* Staff/Team Member */}
                <path d="M17 11h4" />
                <path d="M19 9v4" />
                <circle cx="17" cy="7" r="2" />
              </svg>
            </div>

            {/* Text */}
            <div className="is-drawer-close:hidden">
              <h1 className="text-xl font-black tracking-wide">
                <span className="text-white">City</span>
                <span className="text-cyan-400">Fix</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[3px] text-slate-500">
                Dashboard Panel
              </p>
            </div>
          </Link>
        </div>

        {/* ROLE BADGE */}
        <div className="px-4 py-5 is-drawer-close:hidden">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Account Role
            </p>

            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold capitalize">
                {singleUserdbInfo?.role || "Citizen"}
              </h2>

              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* MENU */}
        <ul className="menu w-full flex-1 px-3 gap-2">
          {/* HOME */}
          <li>
            <Link
              to="/"
              data-tip="Home"
              className={`rounded-2xl py-3 ${
                location.pathname === "/" ? activeClass : normalClass
              } is-drawer-close:tooltip is-drawer-close:tooltip-right`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>

              <span className="is-drawer-close:hidden font-medium">Home</span>
            </Link>
          </li>

          {/* CITIZEN LINKS */}
          {singleUserdbInfo?.role === "citizen" && (
            <>
              {userInfo?.email && (
                <li>
                  <Link
                    to="/myIssues"
                    data-tip="My Issues"
                    className={`rounded-2xl py-3 ${
                      location.pathname === "/myIssues"
                        ? activeClass
                        : normalClass
                    } is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path d="M9 11l3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>

                    <span className="is-drawer-close:hidden font-medium">
                      My Issues
                    </span>
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to={userInfo?.email ? "/createIssue" : "/login"}
                  data-tip="Create Issue"
                  className={`rounded-2xl py-3 ${
                    location.pathname === "/createIssue"
                      ? activeClass
                      : normalClass
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>

                  <span className="is-drawer-close:hidden font-medium">
                    Create Issue
                  </span>
                </Link>
              </li>
            </>
          )}

          {/* STAFF */}
          {singleUserdbInfo?.role === "staff" && (
            <li>
              <Link
                to="/issueProgress"
                data-tip="Issue Progress"
                className={`rounded-2xl py-3 ${
                  location.pathname === "/issueProgress"
                    ? activeClass
                    : normalClass
                } is-drawer-close:tooltip is-drawer-close:tooltip-right`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                </svg>

                <span className="is-drawer-close:hidden font-medium">
                  Issue Progress
                </span>
              </Link>
            </li>
          )}

          {/* ADMIN */}
          {singleUserdbInfo?.role === "admin" && (
            <>
              <li>
                <Link
                  to="/issueManagement"
                  data-tip="Issue Management"
                  className={`rounded-2xl py-3 ${
                    location.pathname === "/issueManagement"
                      ? activeClass
                      : normalClass
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                  </svg>

                  <span className="is-drawer-close:hidden font-medium">
                    Issue Management
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/staffManagement"
                  data-tip="Staff Management"
                  className={`rounded-2xl py-3 ${
                    location.pathname === "/staffManagement"
                      ? activeClass
                      : normalClass
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>

                  <span className="is-drawer-close:hidden font-medium">
                    Staff Management
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/userManagement"
                  data-tip="User Management"
                  className={`rounded-2xl py-3 ${
                    location.pathname === "/userManagement"
                      ? activeClass
                      : normalClass
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6" />
                    <path d="M23 11h-6" />
                  </svg>

                  <span className="is-drawer-close:hidden font-medium">
                    User Management
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/10 is-drawer-close:hidden">
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-3 text-center">
            <p className="text-xs text-cyan-300">
              Smart Public Infrastructure Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;

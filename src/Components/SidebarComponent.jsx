import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const SidebarComponent = () => {
  const { userInfo, singleUserdbInfo } = use(AuthContext);
  // console.log(singleUserdbInfo);
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow mt-15 lg:mt-0">
          {/* List item */}
          <li>{singleUserdbInfo?.role}</li>
          <li>
            <Link
              to="/"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Homepage"
            >
              {/* Home icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <span className="is-drawer-close:hidden">Home</span>
            </Link>
          </li>
          {/* citizen link ==================================== */}
          {singleUserdbInfo?.role === "citizen" && (
            <>
              {/* my info */}
              <li>
                <Link
                  to="/myInfo"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Info"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>

                  <span className="is-drawer-close:hidden">My Info</span>
                </Link>
              </li>

              {/* my issues */}
              {userInfo?.email && (
                <li>
                  <Link
                    to="/myIssues"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Issues"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-5"
                    >
                      <path d="M9 11l3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>

                    <span className="is-drawer-close:hidden">My Issues</span>
                  </Link>
                </li>
              )}

              {/* Create issue */}
              <li>
                <Link
                  to={userInfo?.email ? "/createIssue" : "/login"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Create Issue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>

                  <span className="is-drawer-close:hidden">Create Issue</span>
                </Link>
              </li>
            </>
          )}
          {/* Admin Links ============================================ */}
          {singleUserdbInfo?.role === "admin" && (
            // manage issue link
            <>
              <li>
                <Link
                  to="/issueManagement"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Issues"
                >
                  {/* Manage Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                  </svg>

                  <span className="is-drawer-close:hidden">
                    Issue Management
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/staffManagement"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Staff"
                >
                  {/* Users Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>

                  <span className="is-drawer-close:hidden">
                    Staff Management
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/userManagement"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="User Management"
                >
                  {/* User Management Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6" />
                    <path d="M23 11h-6" />
                  </svg>

                  <span className="is-drawer-close:hidden">
                    User Management
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;

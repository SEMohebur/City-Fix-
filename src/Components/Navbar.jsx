import { Bell, ShoppingCart } from "lucide-react";
import { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userInfo, logout, setUserInfo, loading } = use(AuthContext);
  const navigate = useNavigate();

  // reusable links
  const links = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/allIssues",
      name: "All Issues",
    },
    {
      path: "/contact",
      name: "Contact",
    },
  ];

  // console.log(userInfo);

  const handleLogout = () => {
    logout()
      .then(() => {
        setUserInfo(null);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful 👋",
          text: "You have been logged out successfully",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });

        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Logout Failed!",
          text: "Failed to log out. Please try again.",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      });
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300  sticky top-0 z-50">
      {/* Left Side */}
      <div className="navbar-start gap-2">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost "
        >
          {/* Sidebar toggle icon */}
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
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h10M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-60"
          >
            {links.map((link, i) => {
              return (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logo */}
        <a className="text-2xl font-extrabold text-primary tracking-wide">
          City<span className="text-secondary">Fix</span>
        </a>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {links.map((link, i) => {
            return (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">
        {/* Notification */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell size={20} />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* Cart */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <ShoppingCart size={20} />
            <span className="badge badge-sm badge-secondary indicator-item">
              3
            </span>
          </div>
        </button>

        {/* Profile */}
        <div className="dropdown dropdown-end me-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {loading ? (
                <p className=" text-[5px] mt-4">Loading...</p>
              ) : (
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    userInfo?.photoURL
                      ? userInfo.photoURL
                      : "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={userInfo?.displayName || "User Profile"}
                />
              )}
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-52"
          >
            {userInfo?.email ? (
              <>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <Link to={"/dashboard_admin"}>Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

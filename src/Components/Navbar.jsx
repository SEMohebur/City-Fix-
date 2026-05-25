import { Bell, ShoppingCart, Menu } from "lucide-react";
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
    <div className="sticky top-0 z-50 border-b border-cyan-500/10 bg-gradient-to-r from-[#0b1120] via-[#111827] to-[#172033] shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-xl">
      <div className="navbar  mx-auto px-3 py-2">
        {/* LEFT */}
        <div className="navbar-start gap-2">
          {/* Sidebar Button */}
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-ghost btn-circle hover:bg-white/10 border border-transparent hover:border-white/10 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-5 text-slate-200"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden hover:bg-white/10"
            >
              <Menu className="text-slate-200" size={22} />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-slate-900 border border-white/10 rounded-2xl w-64 space-y-1"
            >
              {links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="rounded-xl text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-black tracking-wide"
          >
            <span className="text-white">City</span>
            <span className="text-cyan-400">Fix</span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-2 md:gap-3">
          {/* Notification */}
          <button className="btn btn-ghost btn-circle hover:bg-white/10 border border-transparent hover:border-white/10 transition">
            <div className="indicator">
              <Bell size={20} className="text-slate-200" />

              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></span>
            </div>
          </button>

          {/* Cart */}
          <button className="btn btn-ghost btn-circle hover:bg-white/10 border border-transparent hover:border-white/10 transition">
            <div className="indicator">
              <ShoppingCart size={20} className="text-slate-200" />

              <span className="badge badge-sm border-none bg-cyan-500 text-white indicator-item">
                3
              </span>
            </div>
          </button>

          {/* PROFILE */}
          <div className="dropdown dropdown-end me-2">
            <div tabIndex={0} role="button" className="cursor-pointer">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 hover:scale-105 transition duration-300">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-[10px] text-white">
                    Loading
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover"
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
              className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-slate-900 border border-white/10 rounded-2xl w-56 space-y-1"
            >
              {userInfo?.email ? (
                <>
                  {/* User Info */}
                  <div className="px-3 py-2 border-b border-white/10 mb-2">
                    <h2 className="font-semibold text-white">
                      {userInfo?.displayName || "User"}
                    </h2>

                    <p className="text-xs text-slate-400 truncate">
                      {userInfo?.email}
                    </p>
                  </div>

                  <li>
                    <Link
                      to={"/profile"}
                      className="rounded-xl text-slate-300 hover:bg-cyan-500 hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/dashboard_admin"}
                      className="rounded-xl text-slate-300 hover:bg-cyan-500 hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="rounded-xl text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="rounded-xl text-slate-300 hover:bg-cyan-500 hover:text-white"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/register"
                      className="rounded-xl text-slate-300 hover:bg-cyan-500 hover:text-white"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

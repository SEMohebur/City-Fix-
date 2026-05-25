import { use, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [paswordShow, setPassworShow] = useState(false);
  const { login, googlesignIn, setUserInfo, registerUserpostDb } =
    use(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((result) => {
        const user = result.user;
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back, ${user.displayName || user.email}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Login Failed!",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    googlesignIn()
      .then(async (res) => {
        const user = res.user;
        const newUser = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        };

        await registerUserpostDb(newUser);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome! Google Sign-In Successful 🎉",
          showConfirmButton: false,
          timer: 1500,
        });

        setUserInfo(user);

        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Google Sign-In Failed!",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={paswordShow ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                required
              />

              <button
                type="button"
                onClick={() => setPassworShow(!paswordShow)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
              >
                {paswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition shadow-lg shadow-cyan-500/20">
            Login Now
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-100 transition"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff" />
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                />
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                />
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                />
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                />
              </g>
            </svg>
            Login with Google
          </button>

          {/* Register */}
          <p className="text-center text-sm text-slate-400">
            Don’t have an account?
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 ml-1"
            >
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { use, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

// import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    updateUser,
    googlesignIn,
    setUserInfo,
    registerUserpostDb,
  } = use(AuthContext);
  const [paswordShow, setPassworShow] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const newUser = {
      displayName,
      photoURL,
      email,
    };
    register(email, password)
      .then(async (result) => {
        const user = result.user;
        updateUser(displayName, photoURL).then(() => {
          setUserInfo({ ...user, displayName, photoURL });
        });
        //database post request
        await registerUserpostDb(newUser);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome ${user.displayName || user.email}! Registration Successful 🎉`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Registration Failed!",
          text: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  // database er modhe user er info save korar jonno function ta alada kore create korechi jeta register er modhe call kora hoyeche

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
          timer: 2000,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-white py-6 border-b border-slate-800">
          Register
        </h2>

        <div className="p-6">
          <form onSubmit={handleRegister}>
            <fieldset className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="w-full bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 rounded-2xl px-5 py-4 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition"
                  placeholder="Name"
                  required
                />
              </div>

              {/* Photo */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Photo
                </label>
                <input
                  name="photo"
                  type="text"
                  className="w-full bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 rounded-2xl px-5 py-4 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition"
                  placeholder="Photo Url"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 rounded-2xl px-5 py-4 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition"
                  placeholder="Email"
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
                    placeholder="Enter your password"
                    required
                    className="w-full bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 rounded-2xl px-5 py-4 pr-12 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setPassworShow(!paswordShow)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
                  >
                    {paswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-cyan-500/20 transition">
                Register Now
              </button>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white py-3 rounded-2xl hover:border-cyan-500/40 transition"
              >
                <svg width="16" height="16" viewBox="0 0 512 512">
                  <path fill="#fff" d="m0 0H512V512H0" />
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
                </svg>
                Continue with Google
              </button>

              {/* Footer */}
              <p className="text-center text-slate-400 text-sm mt-4">
                Already have an account?
                <Link
                  to="/login"
                  className="text-cyan-400 ml-1 hover:underline"
                >
                  Login Now
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

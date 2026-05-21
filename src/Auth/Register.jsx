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
    <div className="hero p-5">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className=" font-bold text-3xl text-gray-600 text-center py-4">
          Register
        </h2>
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label text-gray-600">Name</label>
              <input
                name="name"
                type="text"
                className="input w-full"
                placeholder="Name"
                required
              />
              <label className="label text-gray-600">Photo</label>
              <input
                name="photo"
                type="text"
                className="input w-full"
                placeholder="Photo Url"
                required
              />
              <label className="label text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
                required
              />
              <label className="label text-gray-600">Password</label>
              <div className=" relative">
                <div className=" flex relative">
                  <input
                    id="password"
                    name="password"
                    type={paswordShow ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="w-full input px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPassworShow(!paswordShow)}
                    className=" absolute mt-3 right-0 me-2 "
                  >
                    {paswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              <button className="btn btn-primary mt-4">Register Now</button>
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <p className=" text-center text-gray-600">
                Don’t have an account?
                <Link to="/login" className=" text-red-500 ms-1">
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

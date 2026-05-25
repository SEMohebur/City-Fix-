import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const CreateStaff = () => {
  const [paswordShow, setPassworShow] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const newUser = {
      displayName,
      photoURL,
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:3000/createStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Registration failed",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message || "Staff created successfully",
      }).then(() => {
        navigate("/staffManagement");
      });

      e.target.reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        text: "Please try again later",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create Staff
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Photo URL
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Image URL"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email address"
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

          {/* Button */}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition shadow-lg shadow-cyan-500/20">
            Create Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;

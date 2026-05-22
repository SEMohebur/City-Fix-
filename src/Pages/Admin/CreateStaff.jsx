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
    <div className="hero p-5">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className=" font-bold text-3xl text-gray-600 text-center py-4">
          Create Staff
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

              <button className="btn btn-primary mt-4">Create Now</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;

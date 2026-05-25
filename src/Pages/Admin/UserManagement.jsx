import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/getAllUser")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err.message));
  }, []);

  // console.log(users);

  const handleBlockUnblock = async (id, status) => {
    const res = await fetch(`http://localhost:3000/blockUnblock/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update status!",
      });
      return;
    }

    const data = await res.json();

    const updatedUser = users.map((user) => {
      if (user._id === id) {
        return {
          ...user,
          status,
        };
      }
      return user;
    });

    setUsers(updatedUser);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `User is now ${status}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (users.length === 0) {
    return (
      <div className=" h-40 flex justify-center items-center">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users?.map((user) => (
          <div
            key={user._id}
            className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-500"
          >
            {/* Top Gradient */}
            <div className="h-28 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Profile Image */}
            <div className="relative flex justify-center">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-28 h-28 rounded-full object-cover border-4 border-slate-900 shadow-xl absolute -top-14 group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Card Body */}
            <div className="pt-20 px-6 pb-6 text-center">
              {/* Name */}
              <h2 className="text-2xl font-bold text-white">
                {user.displayName}
              </h2>

              <p className="text-sm text-slate-400 mt-1 break-all">
                {user.email}
              </p>

              {/* Badges */}
              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                <span className="px-4 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 capitalize">
                  {user.role}
                </span>

                <span
                  className={`px-4 py-1 rounded-full text-xs font-medium border ${
                    user.status === "blocked"
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  }`}
                >
                  {user.status === "blocked" ? "Blocked" : "Active"}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-800 my-5"></div>

              {/* Info */}
              <div className="space-y-3 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">User ID</span>
                  <span className="text-white font-medium">
                    #{user._id.slice(-9)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Joined</span>
                  <span className="text-white font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Button */}
              <div className="mt-6">
                {user.status === "blocked" ? (
                  <button
                    onClick={() => handleBlockUnblock(user._id, "active")}
                    className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-semibold transition shadow-lg shadow-green-500/10"
                  >
                    Unblock User
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockUnblock(user._id, "blocked")}
                    className="w-full py-3 rounded-2xl bg-red-500 hover:bg-red-400 text-white font-semibold transition shadow-lg shadow-red-500/10"
                  >
                    Block User
                  </button>
                )}
              </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-500/20 transition-all duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;

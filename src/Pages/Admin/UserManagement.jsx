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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users?.map((user) => (
          <div
            key={user._id}
            className="group relative overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            {/* Top Gradient */}
            <div className="h-28 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Profile Image */}
            <div className="relative flex justify-center">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-28 h-28 rounded-full object-cover border-[6px] border-white shadow-lg absolute -top-14 group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Card Body */}
            <div className="pt-20 px-6 pb-6">
              {/* Name + Role */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-base-content">
                  {user.displayName}
                </h2>

                <p className="text-sm text-gray-500 mt-1 break-all">
                  {user.email}
                </p>

                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                  <span className="badge badge-info badge-outline px-4 py-3 capitalize font-medium">
                    {user.role}
                  </span>

                  <span
                    className={`badge px-4 py-3 font-medium ${
                      user.status === "blocked"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status === "blocked" ? "Blocked" : "Active"}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="divider my-5"></div>

              {/* User Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">User ID</span>

                  <span className="font-medium text-base-content">
                    #{user._id}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Joined</span>

                  <span className="font-medium text-base-content">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6">
                {user.status === "blocked" ? (
                  <button
                    onClick={() => handleBlockUnblock(user._id, "active")}
                    className="btn btn-success w-full rounded-xl text-white"
                  >
                    Unblock User
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockUnblock(user._id, "blocked")}
                    className="btn btn-error w-full rounded-xl text-white"
                  >
                    Block User
                  </button>
                )}
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 pointer-events-none transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;

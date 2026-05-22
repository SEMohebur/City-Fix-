import { use, useEffect, useState } from "react";
import { Mail, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";

const StaffManagement = () => {
  const { staffs, setStaffs, getStaffs } = use(AuthContext);
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    getStaffs();
  }, []);

  // delete staff database and firebase
  const handleStaffDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This staff will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/deleteStaff/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setStaffs((prev) => prev.filter((staff) => staff._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Staff has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Delete failed",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  // updateToogle input feald and update staff info
  const staffUpdateOpen = async (id) => {
    document.getElementById("my_modal_1").showModal();
    fetch(`http://localhost:3000/getSingleStuff/${id}`)
      .then((res) => res.json())
      .then((data) => setStaff(data))
      .catch((err) => console.log(err.message));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const displayName = form.name.value.trim();
    const photoURL = form.img.value.trim();

    const updateStaff = {
      displayName,
      photoURL,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/updateStaff/${staff._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateStaff),
        },
      );

      // response check
      if (!res.ok) {
        throw new Error("Failed to update staff");
      }

      const data = await res.json();

      // success check
      if (data.modifiedCount > 0) {
        // instant ui update
        const updatedStaffUi = staffs.map((prev) => {
          if (prev._id === staff._id) {
            return {
              ...prev,
              displayName,
              photoURL,
            };
          }

          return prev;
        });

        setStaffs(updatedStaffUi);

        // success alert
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          text: "Staff information updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        document.getElementById("my_modal_1").close();

        // reset form
        form.reset();
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Detected",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
    document.getElementById("my_modal_1").close();
  };
  // console.log(staffs);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-cyan-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              Staff Management
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage all staff members, roles, and activities.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Total Staff */}
            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl">
              <div className="bg-cyan-500 text-white p-4 rounded-2xl shadow-lg">
                <Users size={40} />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {staffs?.length}
                </h2>
                <p className="text-gray-500">Total Staff</p>
              </div>
            </div>

            {/* Create Staff Button */}
            <Link
              to={"/createStaff"}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
            >
              + Create Staff
            </Link>
          </div>
        </div>
      </div>

      {/* Staff Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {staffs?.map((staff) => (
          <div
            key={staff._id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* Cover */}
            <div className="h-28 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

            {/* Profile */}
            <div className="relative px-6 pb-6">
              <div className="flex justify-center">
                <img
                  src={staff.photoURL}
                  alt={staff.displayName}
                  className="w-28 h-28 rounded-full border-4 border-white object-cover -mt-14 shadow-lg"
                />
              </div>

              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {staff.displayName}
                </h2>

                <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
                  <Mail size={16} />
                  <p className="text-sm">{staff.email}</p>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <ShieldCheck size={16} />
                    {staff.role}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  Joined: {new Date(staff.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => staffUpdateOpen(staff._id)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Update
                </button>

                <button
                  onClick={() => handleStaffDelete(staff._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* update modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box rounded-2xl p-0 overflow-hidden max-w-md bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-5">
            <h3 className="text-white text-xl font-bold">
              Update Staff Information
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Modify name and profile image
            </p>
          </div>

          {/* Body */}
          <form onSubmit={handleUpdateSubmit} className="p-6 space-y-6">
            {/* Name Input */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={staff?.displayName}
                placeholder="Enter staff name"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
          transition-all duration-200"
              />
            </div>

            {/* Image Input */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Profile Image URL
              </label>
              <input
                type="text"
                defaultValue={staff?.photoURL}
                placeholder="Paste image URL"
                name="img"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
          transition-all duration-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_1").close()}
                className=" px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-md transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default StaffManagement;

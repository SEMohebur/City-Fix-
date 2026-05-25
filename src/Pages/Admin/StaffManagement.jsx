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
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Staff Management
              </h1>
              <p className="text-slate-400 mt-1">
                Manage all staff members, roles, and activities.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Total Staff */}
              <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 px-5 py-3 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white">
                  <Users size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    {staffs?.length}
                  </h2>
                  <p className="text-xs text-slate-400">Total Staff</p>
                </div>
              </div>

              {/* Button */}
              <Link
                to="/createStaff"
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-semibold transition"
              >
                + Create Staff
              </Link>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staffs?.map((staff) => (
            <div
              key={staff._id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg hover:border-cyan-500/30 transition"
            >
              {/* Cover */}
              <div className="h-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

              {/* Content */}
              <div className="p-5 text-center">
                <img
                  src={staff.photoURL}
                  className="w-20 h-20 rounded-full object-cover mx-auto -mt-10 border-4 border-slate-900 shadow-lg"
                />

                <h2 className="text-lg font-semibold text-white mt-3">
                  {staff.displayName}
                </h2>

                <p className="text-sm text-slate-400">{staff.email}</p>

                {/* Role */}
                <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {staff.role}
                </span>

                <p className="text-xs text-slate-500 mt-3">
                  Joined: {new Date(staff.createdAt).toLocaleDateString()}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => staffUpdateOpen(staff._id)}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleStaffDelete(staff._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;

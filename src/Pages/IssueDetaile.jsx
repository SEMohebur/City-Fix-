import { use } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { FaArrowUp, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";
import Swal from "sweetalert2";
const IssueDetaile = () => {
  const { allIssues, userInfo, singleUserdbInfo } = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = allIssues.find((issue) => issue._id === id);

  const {
    title,
    description,
    category,
    date,
    img,
    location,
    priority,
    status,
    upvotes,
    assignedStaff,
  } = issue;
  // console.log(issue);
  const myIssue = userInfo?.email === issue?.email;

  const handleDelete = async (id) => {
    if (singleUserdbInfo?.status === "blocked") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Your account has been blocked. You cannot delete this issue.",
        confirmButtonColor: "#06b6d4",
      });

      return;
    }

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
      });

      //jodi cancel kore tahole return kore ber hoye jabe
      if (!result.isConfirmed) return;

      const res = await fetch(`http://localhost:3000/deleteIssue/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete issue");
      }

      const data = await res.json();

      // console.log(data);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Issue has been deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/myIssues");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  console.log(singleUserdbInfo.status);

  const handleBoostPriority = () => {
    if (singleUserdbInfo?.status === "blocked") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Your account has been blocked. You cannot Boost this issue.",
        confirmButtonColor: "#06b6d4",
      });

      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* IMAGE */}
          <div className="h-full">
            <img src={img} alt={title} className="w-full h-full object-cover" />
          </div>

          {/* CONTENT */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              {/* BADGES */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 capitalize">
                  {status}
                </span>

                <span
                  className={`px-3 py-1 text-xs rounded-full capitalize border ${
                    priority === "high"
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                  }`}
                >
                  {priority} Priority
                </span>

                {issue?.assignedStaff ? (
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {issue?.assignedStaff}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Staff not assigned
                  </span>
                )}
              </div>

              {/* TITLE */}
              <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>

              {/* DESCRIPTION */}
              <p className="text-slate-400 leading-7 mb-8">{description}</p>

              {/* INFO */}
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center gap-3">
                  <MdCategory className="text-cyan-400 text-xl" />
                  <p>
                    Category: <span className="text-white">{category}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-400 text-xl" />
                  <p>
                    Location: <span className="text-white">{location}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-emerald-400 text-xl" />
                  <p>
                    Date: <span className="text-white">{date}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaArrowUp className="text-orange-400 text-xl" />
                  <p>
                    Upvotes: <span className="text-white">{upvotes}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <RiProgress3Line className="text-blue-400 text-xl" />
                  <p>
                    Assigned Staff:{" "}
                    <span className="text-white">
                      {assignedStaff || "Not Assigned Yet"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              {myIssue && status === "pending" ? (
                <Link to={`/issueUpdate/${issue._id}`}>
                  <button className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition">
                    Edit Issue
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 rounded-2xl bg-slate-800 text-slate-500 cursor-not-allowed"
                >
                  Edit Issue
                </button>
              )}

              <button
                onClick={() => handleDelete(id)}
                disabled={!myIssue || status !== "pending"}
                className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition disabled:opacity-40"
              >
                Delete
              </button>

              <button
                onClick={() => handleBoostPriority()}
                disabled={!myIssue}
                className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-white font-semibold transition disabled:opacity-40"
              >
                Boost Priority
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetaile;

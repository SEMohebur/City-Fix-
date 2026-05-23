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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* image */}
        <div className="h-full">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* content */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            {/* badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="badge badge-warning badge-lg text-white capitalize">
                {status}
              </span>

              <span
                className={`badge badge-lg text-white capitalize ${
                  priority === "high" ? "badge-error" : "badge-info"
                }`}
              >
                {priority} Priority
              </span>
            </div>

            {/* title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>

            {/* desc */}
            <p className="text-gray-600 leading-8 mb-8">{description}</p>

            {/* info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdCategory className="text-2xl text-primary" />
                <p className="font-medium">
                  Category: <span className="text-gray-600">{category}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl text-red-500" />
                <p className="font-medium">
                  Location: <span className="text-gray-600">{location}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-xl text-green-500" />
                <p className="font-medium">
                  Date: <span className="text-gray-600">{date}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaArrowUp className="text-xl text-orange-500" />
                <p className="font-medium">
                  Upvotes: <span className="text-gray-600">{upvotes}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <RiProgress3Line className="text-xl text-blue-500" />
                <p className="font-medium">
                  Assigned Staff:{" "}
                  <span className="text-gray-600">
                    {assignedStaff || "Not Assigned Yet"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            {myIssue && status === "pending" ? (
              <Link to={`/issueUpdate/${issue._id}`}>
                <button className="btn btn-primary rounded-full px-8">
                  Edit Issue
                </button>
              </Link>
            ) : (
              <button disabled className="btn btn-primary rounded-full px-8">
                Edit Issue
              </button>
            )}

            <button
              onClick={() => handleDelete(id)}
              disabled={!myIssue || status !== "pending"}
              className="btn btn-error rounded-full px-8 text-white"
            >
              Delete
            </button>

            <button
              onClick={() => handleBoostPriority()}
              disabled={!myIssue}
              className="btn btn-warning rounded-full px-8 text-white"
            >
              Boost Priority
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetaile;

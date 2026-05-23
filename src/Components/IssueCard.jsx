import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const IssueCard = ({ issue, i, userInfo, blockStatus }) => {
  // const myIssue = userInfo?.email !== issue?.email;

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(issue?.upvotes);

  const navigate = useNavigate();

  const handleUpvoteDbRequest = async (id, email) => {
    if (!userInfo?.email) {
      navigate("/login");
      return;
    }
    if (blockStatus === "blocked") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Your account has been blocked. You cannot upvote any issue.",
        confirmButtonColor: "#06b6d4",
      });

      return;
    }

    const res = await fetch(`http://localhost:3000/upvote/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: email }),
    });
    const data = await res.json();
    if (!res.ok) {
      // allert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.message || "Something went wrong!",
      });
      return;
    }

    setCount((prev) => prev + 1);
    setLiked(true);
    //alert
    Swal.fire({
      icon: "success",
      title: "Done!",
      text: "Upvoted successfully 🚀",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (issue?.upvotedUsers?.includes(userInfo?.email)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [issue, userInfo]);

  return (
    <div
      key={i}
      className="bg-white border border-slate-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
    >
      {/* Image */}
      <img src={issue.img} alt="issue" className="h-48 w-full object-cover" />

      {/* Content */}
      <div className="p-5 space-y-2">
        <h2 className="text-xl font-semibold text-slate-800">{issue.title}</h2>

        <p className="text-slate-500 text-sm">{issue.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
            {issue.category}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
            {issue.status}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
            {issue.priority}
          </span>
        </div>

        {/* Info */}
        <div>
          <div className="text-sm text-slate-500 mt-3">📍 {issue.location}</div>
        </div>

        <div className=" flex items-center justify-between">
          <div className="text-sm text-slate-400">Upvotes: ({count})</div>
          {/* upvote */}
          <button
            // disabled={myIssue}
            onClick={() => handleUpvoteDbRequest(issue._id, userInfo?.email)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-300 shadow-md cursor-pointer ${
              liked
                ? "bg-red-500 text-white scale-105"
                : "bg-white text-gray-700 border"
            }`}
          >
            <FaHeart
              className={`text-lg transition-all duration-300 ${
                liked ? "text-white" : "text-red-500"
              }`}
            />

            <span className="font-semibold">{liked ? "Loved" : "Love"}</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 mt-2">{issue.date}</div>

        {/* Button */}
        <Link
          to={`/issueDetaile/${issue._id}`}
          className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-xl transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default IssueCard;

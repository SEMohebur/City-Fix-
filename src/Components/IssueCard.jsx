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
      className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-black/30 hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={issue.img}
          alt="issue"
          className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition">
          {issue.title}
        </h2>

        <p className="text-slate-400 text-sm line-clamp-2">
          {issue.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {issue.category}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {issue.status}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            {issue.priority}
          </span>
        </div>

        {/* Location */}
        <div className="text-sm text-slate-400 mt-2">📍 {issue.location}</div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-slate-500">
            Upvotes: <span className="text-white font-semibold">({count})</span>
          </div>

          {/* Upvote Button */}
          <button
            onClick={() => handleUpvoteDbRequest(issue._id, userInfo?.email)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
              liked
                ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                : "bg-slate-950/60 text-slate-300 border border-slate-800 hover:border-red-500/40"
            }`}
          >
            <FaHeart
              className={`text-base ${liked ? "text-white" : "text-red-500"}`}
            />

            {liked ? "Loved" : "Love"}
          </button>
        </div>

        {/* Date */}
        <div className="text-xs text-slate-500 pt-1">{issue.date}</div>

        {/* View Button */}
        <Link
          to={`/issueDetaile/${issue._id}`}
          className="block text-center mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-2 rounded-2xl shadow-lg shadow-cyan-500/20 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default IssueCard;

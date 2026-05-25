import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import IssueCard from "../Components/IssueCard";
import { useNavigate } from "react-router";
import { Plus, AlertCircle } from "lucide-react";

const MyIssues = () => {
  const { userInfo, singleUserdbInfo } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.email) return;

    fetch(`http://localhost:3000/myissues?email=${userInfo.email}`)
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((error) => console.log(error.message));
  }, [userInfo?.email]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#111827] to-[#172033] px-4 py-8 md:px-8">
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto">
        {/* TOP HEADER */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              My Reported Issues
            </h1>

            <p className="text-slate-400 mt-3 max-w-2xl">
              Track, manage, and monitor all the public infrastructure issues
              you have submitted through the CityFix platform.
            </p>
          </div>

          {/* RIGHT ACTION */}
          <button
            onClick={() => navigate("/createIssue")}
            className="group flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-[1.03]"
          >
            <Plus size={20} />

            <span>Create Issue</span>
          </button>
        </div>

        {/* STATS CARD */}

        {/* EMPTY STATE */}
        {issues?.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-[30px] min-h-[400px] flex flex-col items-center justify-center text-center px-6 backdrop-blur-md shadow-2xl">
            {/* ICON */}
            <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6">
              <AlertCircle size={42} className="text-cyan-400" />
            </div>

            {/* TEXT */}
            <h2 className="text-3xl font-bold text-white">No Issues Found</h2>

            <p className="text-slate-400 mt-3 max-w-md leading-relaxed">
              You haven’t reported any infrastructure issues yet. Start helping
              your city by submitting your first issue report.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/createIssue")}
              className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-105"
            >
              Create Your First Issue
            </button>
          </div>
        )}

        {/* ISSUE GRID */}
        {issues?.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {issues.map((issue, i) => (
              <IssueCard
                key={i}
                issue={issue}
                i={i}
                userInfo={userInfo}
                singleUserdbInfo={singleUserdbInfo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIssues;

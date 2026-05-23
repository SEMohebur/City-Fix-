import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import IssueCard from "../Components/IssueCard";
import { useNavigate } from "react-router";

const MyIssues = () => {
  const { userInfo, singleUserdbInfo } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.email) return; // ✅ safety check

    fetch(`http://localhost:3000/myissues?email=${userInfo.email}`)
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((error) => console.log(error.message));
  }, [userInfo?.email]);
  console.log(singleUserdbInfo);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-800 mb-6">My Issues</h1>

        {issues?.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <h2 className="text-2xl font-semibold text-slate-700">
              No Issues Found 😕
            </h2>

            <p className="text-slate-500 mt-2">
              You haven’t created any issues yet.
            </p>

            <button
              onClick={() => navigate("/createIssue")}
              className="mt-5 bg-cyan-500 text-white px-6 py-2 rounded-full"
            >
              Create Issue
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue, i) => (
            <IssueCard
              issue={issue}
              i={i}
              userInfo={userInfo}
              singleUserdbInfo={singleUserdbInfo}
              key={i}
            ></IssueCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyIssues;

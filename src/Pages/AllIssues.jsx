import { use, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";
import IssueCard from "../Components/IssueCard";

const AllIssues = () => {
  const { allIssues, allIssuesGetDbMethod, userInfo, singleUserdbInfo } =
    use(AuthContext);

  // allissues data get korchi authprovider er modhe eikhane sodhu effect kore re-call korsi
  useEffect(() => {
    allIssuesGetDbMethod();
  }, []);

  const blockStatus = singleUserdbInfo?.status;
  // console.log(blockStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            All Issues
          </h1>

          <p className="text-slate-400 mt-2">
            Browse all reported infrastructure problems
          </p>

          <div className="mt-4 h-[2px] w-28 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
        </div>

        {/* Grid Wrapper */}
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
            {allIssues.map((issue, i) => (
              <div
                key={i}
                className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-lg shadow-black/30 hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <IssueCard
                  issue={issue}
                  i={i}
                  userInfo={userInfo}
                  blockStatus={blockStatus}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllIssues;

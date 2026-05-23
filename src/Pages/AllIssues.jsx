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
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">All Issues</h1>
      <div className=" flex items-center justify-center">
        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allIssues.map((issue, i) => (
            <IssueCard
              issue={issue}
              i={i}
              userInfo={userInfo}
              key={i}
              blockStatus={blockStatus}
            ></IssueCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllIssues;

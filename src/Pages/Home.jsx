import { use, useEffect, useState } from "react";
import ActiveSlider from "../Components/ActiveSlider";
import IssueCard from "../Components/IssueCard";
import { AuthContext } from "../Provider/AuthContext";

const Home = () => {
  const { userInfo } = use(AuthContext);

  const [recentIssues, setRecentIssues] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/recent6Issues")
      .then((res) => res.json())
      .then((data) => setRecentIssues(data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className=" bg-gray-100">
      <div className=" bg-cyan-900 pb-2">
        <h2 className="text-5xl font-bold text-gray-100 text-center py-2">
          Welcome to CityFix
        </h2>

        <p className="text-gray-200 text-center max-w-3xl mx-auto mt-5 text-lg leading-relaxed">
          CityFix is a smart city service platform that helps citizens easily
          report road damage, water leakage, broken street lights, garbage
          problems, and other public issues. Together, we can build a cleaner,
          safer, and better city for everyone.
        </p>

        <ActiveSlider></ActiveSlider>
      </div>

      {/* recent 6 issues  */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 m-6">Latest Issues</h1>

        <div className=" p-4">
          <div className=" grid md:grid-cols-2 lg:grid-cols-3  gap-6">
            {recentIssues?.map((issue, i) => (
              <IssueCard
                issue={issue}
                i={i}
                userInfo={userInfo}
                key={i}
              ></IssueCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

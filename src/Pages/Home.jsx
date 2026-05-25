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
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      {/* Slider Section */}
      <div className="px-4 pt-6">
        <ActiveSlider />
      </div>

      {/* Recent Issues Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Latest Issues
          </h1>

          <p className="text-slate-400 mt-2">
            Recently reported public infrastructure problems
          </p>

          <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {recentIssues?.map((issue, i) => (
            <div
              key={i}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-lg shadow-black/30 hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <IssueCard issue={issue} i={i} userInfo={userInfo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import { use } from "react";
import { AuthContext } from "../Provider/AuthContext";

const Profile = () => {
  const { singleUserdbInfo } = use(AuthContext);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 grid md:grid-cols-2">
          {/* LEFT */}
          <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 p-10 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-white/10"></div>

            <img
              src={singleUserdbInfo.photoURL}
              alt="profile"
              className="w-36 h-36 rounded-full border-4 border-white/80 shadow-xl object-cover"
            />

            <h2 className="mt-6 text-3xl font-bold tracking-wide">
              {singleUserdbInfo.displayName}
            </h2>

            <p className="text-cyan-100 mt-2 text-sm break-all opacity-90">
              {singleUserdbInfo.email}
            </p>

            <div className="mt-6 flex gap-3 flex-wrap justify-center">
              <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-sm font-medium border border-white/20">
                👤 {singleUserdbInfo.role}
              </span>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-md ${
                  singleUserdbInfo.status === "blocked"
                    ? "bg-red-500/20 text-red-100 border-red-400/20"
                    : "bg-emerald-500/20 text-emerald-100 border-emerald-400/20"
                }`}
              >
                {singleUserdbInfo.status === "blocked"
                  ? "🚫 BLOCKED"
                  : "✅ ACTIVE"}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-10 md:p-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Account Overview
              </h3>

              <p className="text-slate-400 mt-2">
                Manage your profile information and account status
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition rounded-2xl p-5">
                <p className="text-sm text-slate-400">User ID</p>
                <h4 className="text-lg font-semibold text-white mt-1">
                  #{singleUserdbInfo._id.slice(-8)}
                </h4>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition rounded-2xl p-5">
                <p className="text-sm text-slate-400">Joined Date</p>
                <h4 className="text-lg font-semibold text-white mt-1">
                  {new Date(singleUserdbInfo.createdAt).toLocaleDateString()}
                </h4>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition rounded-2xl p-5">
                <p className="text-sm text-slate-400">Account Status</p>

                <h4
                  className={`text-lg font-bold mt-1 ${
                    singleUserdbInfo.status === "blocked"
                      ? "text-red-400"
                      : "text-emerald-400"
                  }`}
                >
                  {singleUserdbInfo.status === "blocked"
                    ? "Restricted Access"
                    : "All systems operational"}
                </h4>
              </div>
            </div>

            {singleUserdbInfo.status === "blocked" && (
              <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                <h4 className="text-red-400 font-bold text-lg">
                  ⚠ Account Restricted
                </h4>

                <p className="text-red-300 text-sm mt-2 leading-relaxed">
                  Your account has been blocked. Some features are disabled
                  until admin review.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition">
                Edit Profile
              </button>

              <button className="flex-1 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-700 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { use } from "react";
import { AuthContext } from "../Provider/AuthContext";

const Profile = () => {
  const { singleUserdbInfo } = use(AuthContext);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl border border-white/40 bg-white/70 backdrop-blur-xl">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 grid md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-10 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 right-0 w-52 h-52 rounded-full bg-white/10"></div>

            {/* Profile */}
            <img
              src={singleUserdbInfo.photoURL}
              alt="profile"
              className="w-40 h-40 rounded-full border-[6px] border-white shadow-2xl object-cover"
            />

            <h2 className="mt-6 text-4xl font-bold tracking-wide">
              {singleUserdbInfo.displayName}
            </h2>

            <p className="text-cyan-100 mt-2 break-all text-sm">
              {singleUserdbInfo.email}
            </p>

            {/* Status */}
            <div className="mt-6 flex gap-3 flex-wrap justify-center">
              <span className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold border border-white/20">
                👤 {singleUserdbInfo.role}
              </span>

              <span
                className={`px-5 py-2 rounded-full text-sm font-semibold border ${
                  singleUserdbInfo.status === "blocked"
                    ? "bg-red-500/20 text-red-100 border-red-300/20"
                    : "bg-green-500/20 text-green-100 border-green-300/20"
                }`}
              >
                {singleUserdbInfo.status === "blocked"
                  ? "🚫 BLOCKED"
                  : "✅ ACTIVE"}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-800">
                Account Overview
              </h3>

              <p className="text-slate-500 mt-2">
                Manage your profile information and account status.
              </p>
            </div>

            {/* Info Cards */}
            <div className="mt-8 space-y-5">
              <div className="bg-slate-50 hover:bg-slate-100 transition rounded-2xl p-5 border border-slate-200">
                <p className="text-sm text-slate-400">User ID</p>
                <h4 className="text-lg font-semibold text-slate-700 mt-1">
                  #{singleUserdbInfo._id.slice(-8)}
                </h4>
              </div>

              <div className="bg-slate-50 hover:bg-slate-100 transition rounded-2xl p-5 border border-slate-200">
                <p className="text-sm text-slate-400">Joined Date</p>
                <h4 className="text-lg font-semibold text-slate-700 mt-1">
                  {new Date(singleUserdbInfo.createdAt).toLocaleDateString()}
                </h4>
              </div>

              <div className="bg-slate-50 hover:bg-slate-100 transition rounded-2xl p-5 border border-slate-200">
                <p className="text-sm text-slate-400">Account Status</p>

                <h4
                  className={`text-lg font-bold mt-1 ${
                    singleUserdbInfo.status === "blocked"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {singleUserdbInfo.status === "blocked"
                    ? "Restricted Access"
                    : "Everything is working perfectly"}
                </h4>
              </div>
            </div>

            {/* Warning */}
            {singleUserdbInfo.status === "blocked" && (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-5">
                <h4 className="text-red-600 font-bold text-lg">
                  ⚠️ Account Restricted
                </h4>

                <p className="text-red-500 text-sm mt-2 leading-relaxed">
                  Your account has been blocked by the admin. You cannot perform
                  actions like upvoting or interacting with issues until your
                  account is restored.
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]">
                Edit Profile
              </button>

              <button className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all duration-300 hover:scale-[1.02]">
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

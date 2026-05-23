import { use, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const IssueProgress = () => {
  const { allIssuesGetDbMethod, allIssues, setAllIssues, singleUserdbInfo } =
    use(AuthContext);
  useEffect(() => {
    allIssuesGetDbMethod();
  }, []);

  //   current staff ingo theke tar name ber kore enechi jeta diye tar namer assigned issue golo ber korbo
  const staffDisplayName = singleUserdbInfo?.displayName;

  // jei staff er name assign kora issue thakbe sudu tar namer issu goloi asbe
  const currentStaffAssignedIssue = allIssues?.filter((issue) => {
    return issue.assignedStaff === staffDisplayName;
  });

  const onStatusChange = async (id, progressUpdate) => {
    try {
      const res = await fetch(`http://localhost:3000/updateProgress/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          status: progressUpdate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
        });
        return;
      }

      // ui update korar jonno state er specific value update kortechi
      const updatedIssue = allIssues.map((prev) => {
        if (prev._id === id) {
          return {
            ...prev,
            status: progressUpdate,
          };
        }
        return prev;
      });
      setAllIssues(updatedIssue);

      Swal.fire({
        icon: "success",
        title: progressUpdate,
      });

      console.log(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          👷 Staff Work Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage, track and resolve assigned infrastructure issues
        </p>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentStaffAssignedIssue?.map((issue) => {
          const isRejected = issue.status === "rejected";

          return (
            <div
              key={issue._id}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={issue.img}
                  alt="issue"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Priority badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full shadow ${
                      issue.priority === "high"
                        ? "bg-red-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {issue.priority.toUpperCase()}
                  </span>
                </div>

                {/* Title on image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h2 className="text-white font-semibold text-lg drop-shadow">
                    {issue.title}
                  </h2>
                </div>
              </div>

              {/* REJECTED ALERT */}
              {isRejected && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-600 text-xs px-4 py-2">
                  ⚠ This issue is rejected by admin — action disabled
                </div>
              )}

              {/* CONTENT */}
              <div className="p-5 space-y-4">
                {/* META INFO */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    📍 {issue.location}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    📂 {issue.category}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    📅 {new Date(issue.date).toLocaleDateString()}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {issue.description}
                </p>

                {/* STATUS SECTION */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Status</span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      issue.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : issue.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : issue.status === "working"
                            ? "bg-indigo-100 text-indigo-700"
                            : issue.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : issue.status === "closed"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-red-100 text-red-700"
                    }`}
                  >
                    {issue.status.toUpperCase()}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    disabled={isRejected || issue.status !== "pending"}
                    onClick={() => onStatusChange(issue._id, "in-progress")}
                    className="py-2 text-xs font-semibold rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Start Work
                  </button>

                  <button
                    disabled={isRejected || issue.status !== "in-progress"}
                    onClick={() => onStatusChange(issue._id, "working")}
                    className="py-2 text-xs font-semibold rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Working
                  </button>

                  <button
                    disabled={isRejected || issue.status !== "working"}
                    onClick={() => onStatusChange(issue._id, "resolved")}
                    className="py-2 text-xs font-semibold rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Resolve
                  </button>

                  <button
                    disabled={isRejected || issue.status !== "resolved"}
                    onClick={() => onStatusChange(issue._id, "closed")}
                    className="py-2 text-xs font-semibold rounded-xl bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Close
                  </button>
                </div>

                {/* NOTE INPUT */}
                <textarea
                  disabled={isRejected}
                  placeholder="Write progress update for admin & citizens..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                />

                {/* FOOTER STATE */}
                {isRejected && (
                  <div className="text-center text-xs text-red-500 font-medium pt-1">
                    🚫 Locked Issue — No further actions allowed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IssueProgress;

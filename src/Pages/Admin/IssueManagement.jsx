import { use } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const IssueManagement = () => {
  const { allIssues, staffs, getStaffs } = use(AuthContext);

  // console.log(allIssues);

  const handleStaffAsing = async (id, staffName) => {
    const res = await fetch(`http://localhost:3000/assignStaff/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        assignedStaff: staffName,
      }),
    });
    const data = await res.json();
    getStaffs();
  };

  const handleStatusUpdate = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to change status to "${status}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3000/pandingStatusChange/${id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              status: status,
            }),
          },
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Status updated successfully",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          getStaffs();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="p-4 md:p-6 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-900/50">
          <h2 className="text-lg md:text-xl font-bold text-white">
            Issues Management Table
          </h2>

          <span className="text-xs md:text-sm text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Total: {allIssues?.length || 0}
          </span>
        </div>

        <table className="table w-full text-center text-sm md:text-base">
          {/* HEAD */}
          <thead className="bg-slate-800/60 text-slate-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-4">#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Assigned Staff</th>
              <th>Status</th>
              <th>Location</th>
              <th>Upvotes</th>
              <th>Date</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {allIssues?.map((issue, i) => {
              const formatDate = (dateStr) =>
                new Date(dateStr).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

              return (
                <tr
                  key={i}
                  className="hover:bg-white/5 transition-all duration-200"
                >
                  {/* INDEX */}
                  <td className="font-semibold text-slate-300">{i + 1}</td>

                  {/* IMAGE */}
                  <td>
                    <img
                      src={issue?.img}
                      className="h-12 w-12 rounded-xl object-cover border border-white/10 shadow-md mx-auto"
                    />
                  </td>

                  {/* TITLE */}
                  <td className="text-white font-semibold">{issue.title}</td>

                  {/* CATEGORY */}
                  <td>
                    <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {issue.category}
                    </span>
                  </td>

                  {/* STAFF */}
                  <td>
                    <select
                      className={`select select-sm w-full max-w-[140px] rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${
                        issue.assignedStaff ? "border-emerald-500/30" : ""
                      }`}
                      defaultValue={issue.assignedStaff || ""}
                      onChange={(e) =>
                        handleStaffAsing(issue._id, e.target.value)
                      }
                    >
                      {!issue.assignedStaff && (
                        <option value="">Select Staff</option>
                      )}

                      {staffs?.map((staff, i) => (
                        <option value={staff.displayName} key={i}>
                          {staff.displayName}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* STATUS */}
                  <td>
                    {issue.status === "pending" ||
                    issue.status === "rejected" ? (
                      <select
                        className={`select select-sm rounded-xl bg-slate-800 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500/20 ${
                          issue.status === "rejected"
                            ? "border-red-500/30"
                            : "border-yellow-500/30"
                        }`}
                        defaultValue={issue.status}
                        onChange={(e) =>
                          handleStatusUpdate(issue._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : (
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          issue.status === "in-progress"
                            ? "text-blue-300 bg-blue-500/10"
                            : issue.status === "working"
                              ? "text-indigo-300 bg-indigo-500/10"
                              : issue.status === "resolved"
                                ? "text-emerald-300 bg-emerald-500/10"
                                : "text-slate-300 bg-white/5"
                        }`}
                      >
                        {issue.status}
                      </span>
                    )}
                  </td>

                  {/* LOCATION */}
                  <td className="text-slate-300">{issue.location}</td>

                  {/* UPVOTES */}
                  <td className="font-bold text-emerald-400">
                    {issue.upvotes}
                  </td>

                  {/* DATE */}
                  <td className="text-xs text-slate-400">
                    {formatDate(issue.date)}
                  </td>

                  {/* PRIORITY */}
                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        issue.priority === "high"
                          ? "bg-red-500/10 text-red-300 border border-red-500/20"
                          : issue.priority === "normal"
                            ? "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20"
                            : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {allIssues.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No issues found
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueManagement;

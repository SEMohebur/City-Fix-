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
    <div className="p-4 md:p-6">
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-slate-50 to-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">
            Issues Management Table
          </h2>
          <span className="text-xs text-gray-500">
            Total: {allIssues?.length || 0}
          </span>
        </div>

        <table className="table w-full text-center">
          {/* TABLE HEAD */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3">#</th>
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

          <tbody className="divide-y divide-gray-100 ">
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
                  className="hover:bg-gray-50 transition duration-200"
                >
                  {/* INDEX */}
                  <td className="font-semibold text-gray-600 border">
                    {i + 1}
                  </td>

                  {/* IMAGE */}
                  <td className=" border">
                    <img
                      src={issue?.img}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                  </td>

                  {/* TITLE */}
                  <td className=" border">
                    <div className="font-semibold text-gray-800">
                      {issue.title}
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className=" border">
                    <span className="px-2 py-1 text-xs  text-blue-600 font-medium">
                      {issue.category}
                    </span>
                  </td>

                  {/* ASSIGNED STAFF */}
                  <td className=" border">
                    <select
                      className={`select select-bordered select-sm w-full max-w-xs rounded-lg border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
                        issue.assignedStaff ? "bg-green-50" : ""
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
                  <td className=" border">
                    {issue.status === "pending" ||
                    issue.status === "rejected" ? (
                      <select
                        className={`select select-bordered select-sm rounded-lg ${
                          issue.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-50"
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
                        className={`px-2 py-1 text-xs font-medium ${
                          issue.status === "in-progress"
                            ? " text-blue-600"
                            : issue.status === "working"
                              ? " text-indigo-600"
                              : issue.status === "resolved"
                                ? " text-green-600"
                                : " text-gray-600"
                        }`}
                      >
                        {issue.status}
                      </span>
                    )}
                  </td>

                  {/* LOCATION */}
                  <td className="text-gray-600 font-medium border">
                    {issue.location}
                  </td>

                  {/* UPVOTES */}
                  <td className=" border">
                    <span className="font-bold text-emerald-600">
                      {issue.upvotes}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="text-xs text-gray-500 border">
                    {formatDate(issue.date)}
                  </td>

                  {/* PRIORITY */}
                  <td className=" border">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        issue.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : issue.priority === "normal"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-600"
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
          <div className=" text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default IssueManagement;

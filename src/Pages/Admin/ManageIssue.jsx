import { use } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const ManageIssue = () => {
  const { allIssues, staffs, getStaffs } = use(AuthContext);

  console.log(allIssues);

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
    <div>
      <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-lg">
        <table className="table">
          <thead className="bg-base-200 text-base font-bold">
            <tr>
              <th>#</th>
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

          <tbody>
            {allIssues?.map((issue, i) => {
              const formatDate = (dateStr) => {
                return new Date(dateStr).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
              };

              return (
                <tr
                  key={i}
                  className="hover transition duration-200 hover:bg-base-200"
                >
                  <td className="font-bold">{i + 1}</td>
                  <td className="text-sm ">
                    <img
                      src={issue?.img}
                      alt=""
                      className=" rounded-full h-10 w-10 border border-red-500 p-1"
                    />
                  </td>

                  <td>
                    <div className="font-semibold">{issue.title}</div>
                  </td>

                  <td>
                    <span className=" badge-info">{issue.category}</span>
                  </td>

                  <td>
                    <select
                      className={`select select-bordered select-sm w-full max-w-xs ${
                        issue.assignedStaff ? "select-success" : ""
                      }`}
                      defaultValue={issue.assignedStaff || ""}
                      onChange={(e) =>
                        handleStaffAsing(issue._id, e.target.value)
                      }
                    >
                      {issue?.assignedStaff ? (
                        ""
                      ) : (
                        <option value="">Select Staff</option>
                      )}

                      {staffs?.map((staff, i) => (
                        <option value={staff.displayName} key={i}>
                          {staff.displayName}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    {issue.status === "pending" ||
                    issue.status === "rejected" ? (
                      <select
                        className={`select select-bordered select-sm ${issue.status == "rejected" ? "bg-red-400 text-white " : ""}`}
                        defaultValue={issue.status}
                        onChange={(e) =>
                          handleStatusUpdate(issue._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : (
                      <span>{issue.status}</span>
                    )}
                  </td>

                  <td>
                    <span className="font-medium">{issue.location}</span>
                  </td>

                  <td>
                    <span className="font-bold text-primary">
                      {issue.upvotes}
                    </span>
                  </td>

                  <td>{formatDate(issue.date)}</td>

                  <td>
                    <span
                      className={`badge ${
                        issue.priority === "high"
                          ? "badge-error"
                          : issue.priority === "normal"
                            ? "badge-warning"
                            : "badge-success"
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
      </div>
    </div>
  );
};

export default ManageIssue;

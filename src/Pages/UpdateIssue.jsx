import { use, useState } from "react";
import CreateForm from "../Components/CreateForm";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
const UpdateIssue = () => {
  const { allIssues, allIssuesGetDbMethod } = use(AuthContext);
  const { id } = useParams();
  const [submitStatus, setSubmitStatus] = useState(true);

  const singleIssue = allIssues.find((issue) => issue._id === id);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;

      const updatedIssue = {
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        location: form.location.value,
        img: form.img.value,
        priority: form.priority.value,
      };
      const res = await fetch(`http://localhost:3000/issueUpdate/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedIssue),
      });

      if (!res.ok) {
        throw new Error("Failed to update issue");
      }
      const data = await res.json();

      console.log(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Issue Update Successfully 🚀",
        showConfirmButton: false,
        timer: 1500,
      });
      allIssuesGetDbMethod();
      navigate("/myIssues");

      form.reset();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong ❌",
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-cyan-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl p-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">Update Issue</h1>

          <p className="text-slate-500 mt-3">
            Report public infrastructure problems in your area
          </p>
        </div>
        <CreateForm
          submitStatus={submitStatus}
          handleUpdate={handleUpdate}
          id={id}
          singleIssue={singleIssue}
        ></CreateForm>
      </div>
    </div>
  );
};

export default UpdateIssue;

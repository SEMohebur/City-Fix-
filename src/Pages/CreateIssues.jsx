// CreateIssues.jsx

import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateForm from "../Components/CreateForm";

const CreateIssues = () => {
  const { userInfo, singleUserdbInfo, allIssuesGetDbMethod } = use(AuthContext);

  const navigate = useNavigate();

  // issue count korbe
  const [issueCount, setIssueCount] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(true);

  // console.log("single data chekc ", singleUserdbInfo);
  const issueDataPostdb = async (issueData) => {
    try {
      const res = await fetch("http://localhost:3000/createIssue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });

      if (res.ok) {
        navigate("/myIssues");
        allIssuesGetDbMethod();
      } else {
        throw new Error("Failed to create issue");
      }
      return await res.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    const form = e.target;
    const issueData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      img: form.img.value,
      email: userInfo?.email,
      role: singleUserdbInfo?.role,
      status: "pending",
      priority: form.priority.value,
      assignedStaff: null,
      date: new Date().toString(),
      upvotes: 0,
      upvotedUsers: [],
    };
    // opore fetch post method likha ase eikhane call kora hoice
    await issueDataPostdb(issueData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Issue Created Successfully 🚀",
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
  };

  // issue counter method
  useEffect(() => {
    const getCount = async () => {
      const res = await fetch(
        `http://localhost:3000/issueCreateCounter?email=${userInfo.email}`,
      );
      const data = await res.json();
      setIssueCount(data.count);
      setSubmitStatus(data.count < 3);
    };
    if (userInfo?.email) {
      getCount();
    }
  }, []);

  // console.log(submitStatus, issueCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-cyan-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl p-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Create New Issue
          </h1>

          <p className="text-slate-500 mt-3">
            Report public infrastructure problems in your area
          </p>
        </div>

        {/* Form */}
        <CreateForm
          handleCreateIssue={handleCreateIssue}
          submitStatus={submitStatus}
        ></CreateForm>
      </div>
    </div>
  );
};

export default CreateIssues;

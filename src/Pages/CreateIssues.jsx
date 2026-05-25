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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-[30px] shadow-2xl shadow-cyan-500/5 backdrop-blur-xl overflow-hidden">
        {/* Top Glow */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>

        <div className="p-6 md:p-10">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-5">
              Public Infrastructure System
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Create New Issue
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">
              Report public infrastructure problems in your area and help
              improve your community faster.
            </p>
          </div>

          {/* Form */}
          <CreateForm
            handleCreateIssue={handleCreateIssue}
            submitStatus={submitStatus}
          ></CreateForm>
        </div>
      </div>
    </div>
  );
};

export default CreateIssues;

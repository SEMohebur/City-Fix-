import { use } from "react";
import { AuthContext } from "../Provider/AuthContext";

const CreateForm = ({
  handleCreateIssue,
  submitStatus,
  id,
  handleUpdate,
  singleIssue,
}) => {
  const { title, description, category, location, img, priority } =
    singleIssue || {};

  const { singleUserdbInfo } = use(AuthContext);
  // console.log(singleUserdbInfo);
  console.log();

  return (
    <form
      onSubmit={id ? handleUpdate : handleCreateIssue}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* TITLE */}
      <div>
        <label className="text-sm font-semibold text-slate-200 mb-3 block">
          Issue Title
        </label>

        <input
          type="text"
          name="title"
          defaultValue={title}
          placeholder="Road broken near market"
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 hover:border-slate-500"
          required
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label className="text-sm font-semibold text-slate-200 mb-3 block">
          Category
        </label>

        <select
          name="category"
          defaultValue={category}
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 hover:border-slate-500"
          required
        >
          <option value="">Select Category</option>
          <option>Broken Road</option>
          <option>Water Leakage</option>
          <option>Damaged Footpath</option>
          <option>Street Light Issue</option>
          <option>Garbage Overflow</option>
        </select>
      </div>

      {/* LOCATION */}
      <div>
        <label className="text-sm font-semibold text-slate-200 mb-3 block">
          Location
        </label>

        <input
          type="text"
          name="location"
          defaultValue={location}
          placeholder="Dhaka"
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 hover:border-slate-500"
          required
        />
      </div>

      {/* PRIORITY */}
      <div>
        <label className="text-sm font-semibold text-slate-200 mb-3 block">
          Priority
        </label>

        <select
          name="priority"
          defaultValue={priority}
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 hover:border-slate-500"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* IMAGE URL */}
      <div className="md:col-span-2">
        <label className="text-sm font-semibold text-slate-200 mb-3 block">
          Image URL
        </label>

        <input
          type="text"
          name="img"
          defaultValue={img}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 hover:border-slate-500"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="md:col-span-2">
        <label className="text-sm font-semibold text-slate-200 mb-3 block">
          Description
        </label>

        <textarea
          name="description"
          defaultValue={description}
          rows="6"
          placeholder="Describe the issue in detail..."
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 resize-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 hover:border-slate-500"
          required
        ></textarea>
      </div>

      {/* BLOCKED MESSAGE */}
      {singleUserdbInfo?.status === "blocked" && (
        <div className="md:col-span-2 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <p className="text-red-400 text-sm font-medium">
            Your account has been blocked. Please contact admin for assistance.
          </p>
        </div>
      )}

      {/* BUTTON */}
      <div className="md:col-span-2 pt-2">
        {submitStatus ? (
          <button
            disabled={singleUserdbInfo?.status === "blocked"}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {id ? "Update Issue" : "Submit Issue"}
          </button>
        ) : (
          <button
            type="button"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-2xl cursor-pointer"
          >
            Get Premium Access
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateForm;

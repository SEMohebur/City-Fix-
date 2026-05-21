const CreateForm = ({
  handleCreateIssue,
  submitStatus,
  id,
  handleUpdate,
  singleIssue,
}) => {
  const { title, description, category, location, img, priority } =
    singleIssue || {};

  return (
    <form
      onSubmit={id ? handleUpdate : handleCreateIssue}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Title */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Issue Title
        </label>

        <input
          type="text"
          name="title"
          defaultValue={title}
          placeholder="Road broken near market"
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Category
        </label>

        <select
          name="category"
          defaultValue={category}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
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

      {/* Location */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Location
        </label>

        <input
          type="text"
          name="location"
          defaultValue={location}
          placeholder="Dhaka"
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
          required
        />
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Priority
        </label>

        <select
          name="priority"
          defaultValue={priority}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Image */}
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Image URL
        </label>

        <input
          type="text"
          name="img"
          defaultValue={img}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
          required
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Description
        </label>

        <textarea
          name="description"
          defaultValue={description}
          rows="5"
          placeholder="Describe the issue in detail..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all resize-none"
          required
        ></textarea>
      </div>

      {/* Button */}
      <div className="md:col-span-2">
        {submitStatus ? (
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg shadow-cyan-200"
          >
            {id ? "Update Issue" : "Submit Issue"}
          </button>
        ) : (
          <button
            type="button"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg shadow-cyan-200"
          >
            {" "}
            Subscription
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateForm;

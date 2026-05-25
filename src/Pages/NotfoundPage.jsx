const NotfoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon / Emoji */}
        <div className="text-6xl mb-4">🚧</div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white">Page Not Found</h1>

        {/* Description */}
        <p className="text-slate-400 mt-3">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        {/* Divider */}
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mt-6"></div>

        {/* Button */}
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/20 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotfoundPage;

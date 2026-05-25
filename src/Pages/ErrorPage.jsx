const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Big Error Code */}
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mt-4">Page Not Found</h2>

        {/* Description */}
        <p className="text-slate-400 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Decorative Line */}
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mt-6"></div>

        {/* Button */}
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/20 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;

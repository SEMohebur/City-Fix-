import { Loader2 } from "lucide-react";
const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl right-0 bottom-0 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl px-10 py-12 shadow-2xl flex flex-col items-center gap-6">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-28 h-28 border-[6px] border-cyan-400/20 rounded-full"></div>

          <div className="absolute inset-0 w-28 h-28 border-[6px] border-transparent border-t-cyan-400 border-r-purple-500 rounded-full animate-spin"></div>

          <div className="absolute inset-4 bg-slate-950 rounded-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Loading...
          </h1>

          <p className="text-slate-300 mt-2 text-sm">
            Please wait while we prepare something amazing for you
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-2 mt-2">
          <span className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

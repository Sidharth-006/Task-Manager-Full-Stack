import { Link } from "react-router-dom";

const features = [
  {
    title: "Organized workflow",
    description: "Create, update, and track every task in one calm workspace.",
  },
  {
    title: "Clear progress",
    description: "See what is pending, active, and completed in a single view.",
  },
  {
    title: "Built for teams",
    description: "A professional experience that scales from solo work to shared operations.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.26),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 font-semibold text-slate-950">
              TM
            </div>
            <div>
              <p className="text-base font-semibold text-white">Task Manager</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Work with focus</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">
              Sign in
            </Link>
            <Link to="/register" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90">
              Get started
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Professional task management</p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                A real productivity workspace that feels built for daily use.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Task Manager gives modern teams a calm place to organize work, track priorities, and move projects forward without friction.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 font-semibold text-slate-950 transition hover:opacity-90">
                  Start free
                </Link>
                <Link to="/login" className="rounded-full border border-white/10 bg-white/10 px-6 py-3 font-semibold text-slate-100 transition hover:bg-white/20">
                  View demo
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Today’s focus</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Plan, prioritize, and deliver.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Keep your important work visible, track progress clearly, and simplify the flow from idea to completion.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-2xl font-semibold text-white">100%</p>
                  <p className="mt-1 text-sm text-slate-400">Focus</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-2xl font-semibold text-white">24/7</p>
                  <p className="mt-1 text-sm text-slate-400">Access</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-2xl font-semibold text-white">Fast</p>
                  <p className="mt-1 text-sm text-slate-400">Workflow</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/tasks/create", label: "New Task" },
  { to: "/profile", label: "Profile" },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-transparent text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-5 px-3 py-3 sm:px-5 lg:px-6">
        <aside className="hidden w-72 shrink-0 flex-col rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-lg font-semibold text-white shadow-lg shadow-sky-200">
              TM
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Task Manager</p>
              <p className="text-sm text-slate-500">Productive workspace</p>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-sky-50 text-sky-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Built for daily focus</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">Keep important work visible and move forward with clarity.</p>
          </div>
        </aside>

        <div className="flex-1">
          <Navbar />
          <main className="mt-4 rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

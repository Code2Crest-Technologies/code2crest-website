import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-600 font-bold text-white">
            C2
          </span>
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">
              Create workspace
            </h1>
            <p className="text-sm text-slate-500">Code2Crest Unified Portal</p>
          </div>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Barath Rahav"
              className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="company" className="text-sm font-semibold text-slate-700">
              Company
            </label>
            <input
              id="company"
              type="text"
              placeholder="Code2Crest Technologies"
              className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-300/40 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-950 p-8 text-white sm:p-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-600 font-bold">
            C2
          </div>
          <h1 className="mt-10 text-3xl font-semibold">Welcome back</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Sign in to manage Code2Crest products, team access, company details,
            subscription, and workspace settings.
          </p>
        </div>

        <form className="space-y-5 p-8 sm:p-10">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="barath@code2crest.com"
              className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              defaultValue="password"
              className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </Link>
          <p className="text-center text-sm text-slate-600">
            New to Code2Crest?{" "}
            <Link href="/register" className="font-semibold text-blue-600">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

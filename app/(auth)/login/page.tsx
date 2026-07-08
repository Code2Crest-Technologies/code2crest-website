import LoginForm from "@/modules/portal/components/login-form";

export default function LoginPage() {
  const trustPoints = [
    "Secure workspace access",
    "Company-level product permissions",
    "Role-based team management",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-300/40 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-between bg-slate-950 p-8 text-white sm:p-10 lg:min-h-[640px]">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-600 font-bold">
              C2
            </div>
            <p className="mt-10 text-sm font-semibold text-blue-300">
              Code2Crest Hub
            </p>
            <h1 className="mt-3 max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">
              Sign in to Code2Crest Hub
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
              Access your Code2Crest products, team workspace, subscriptions,
              and business tools from one secure hub.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                {point}
              </div>
            ))}
            <a
              href="https://www.code2crest.com"
              className="inline-flex pt-3 text-sm font-semibold text-blue-200 transition hover:text-white"
            >
              Back to website
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-sm">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}

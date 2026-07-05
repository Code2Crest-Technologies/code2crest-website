import LoginForm from "@/modules/portal/components/login-form";

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

        <LoginForm />
      </section>
    </div>
  );
}

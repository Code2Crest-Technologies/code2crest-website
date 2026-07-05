import RegisterForm from "@/modules/portal/components/register-form";

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

        <RegisterForm />
      </section>
    </div>
  );
}

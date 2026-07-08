import RegisterForm from "@/modules/portal/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-300/40 lg:grid-cols-[0.95fr_1fr]">
        <div className="flex flex-col justify-between bg-slate-950 p-8 text-white sm:p-10 lg:min-h-[660px]">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-600 font-bold text-white">
              C2
            </span>
            <p className="mt-10 text-sm font-semibold text-blue-300">
              Code2Crest Hub
            </p>
            <h1 className="mt-3 max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">
              Create your Code2Crest Hub workspace
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
              Create your company workspace and start managing Code2Crest
              products from one hub.
            </p>
          </div>

          <a
            href="https://www.code2crest.com"
            className="mt-10 inline-flex text-sm font-semibold text-blue-200 transition hover:text-white"
          >
            Back to website
          </a>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <RegisterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
          <section className="max-w-md text-center">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-3 text-sm text-slate-300">
              The request could not be completed. Please refresh and try again.
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}

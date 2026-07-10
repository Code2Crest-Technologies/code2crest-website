export default function Home() {
  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
        <div className="pb-12 pt-14 md:pb-16 md:pt-20 lg:pb-20 lg:pt-24">

          {/* Hero Content */}
          <div className="mx-auto max-w-[900px] text-center">
            <h1
              className="pb-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl md:leading-[1.08]"
              data-aos="fade-up"
            >
              Building Modern Websites,
              <br />
              Web Applications &
              <br />
              Digital Solutions
            </h1>

            <p
              className="mx-auto mb-8 max-w-[720px] text-base leading-7 text-slate-300 md:text-lg md:leading-8"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              Code2Crest Technologies helps startups and businesses build
              scalable websites, e-commerce platforms, custom web applications,
              and digital solutions using React, Next.js, Node.js, MongoDB,
              Strapi, and modern technologies.
            </p>

            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <a
                href="#services"
                className="inline-flex h-11 min-w-36 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-6 text-sm font-semibold text-white shadow-[0_18px_45px_-25px_rgba(99,102,241,0.65)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-20px_rgba(99,102,241,0.75)]"
              >
                View Services
              </a>

              <a
                href="#contact"
                className="group inline-flex h-11 min-w-36 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600/10 px-6 text-sm font-semibold text-indigo-300 transition duration-300 hover:border-indigo-400/60 hover:bg-indigo-600/20 hover:text-indigo-200 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

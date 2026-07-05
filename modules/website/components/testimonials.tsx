import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";

const testimonials = [
  {
    id: 1,
    clientName: "Rajesh Kumar",
    project: "E-Commerce Platform",
    feedback:
      "Code2Crest built our e-commerce platform and exceeded our expectations. The platform is fast, secure, and user-friendly. Highly recommended!",
  },
  {
    id: 2,
    clientName: "Priya Sharma",
    project: "Restaurant Management System",
    feedback:
      "Working with Code2Crest was a smooth experience. They delivered our restaurant ordering system on time and it has increased our online orders by 40%.",
  },
  {
    id: 3,
    clientName: "Amit Patel",
    project: "School ERP Dashboard",
    feedback:
      "The school management system developed by Code2Crest has streamlined our operations. Staff and parents love the user-friendly interface. Great job!",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                Client Success Stories
              </span>
            </div>
            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Trusted by Growing Businesses
            </h2>
            <p className="text-lg text-indigo-200/65">
              Hands-on feedback from clients who experienced faster launches, better performance, and modern digital experiences.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="mx-auto grid max-w-sm gap-8 sm:max-w-none sm:grid-cols-3 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <article
                key={testimonial.id}
                className="group relative overflow-hidden rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-slate-900/70 to-slate-950/95 p-6 md:p-8 shadow-[0_20px_90px_-40px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-indigo-600 to-cyan-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-15 rounded-[2rem]" />

                {/* Star Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-yellow-400"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Feedback */}
                <p className="mb-6 text-base text-indigo-200/75 leading-relaxed">
                  "{testimonial.feedback}"
                </p>

                {/* Client Info */}
                <div>
                  <p className="font-semibold text-white">{testimonial.clientName}</p>
                  <p className="text-sm text-indigo-200/65">{testimonial.project}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

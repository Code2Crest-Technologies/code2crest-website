import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import BlurredShape from "@/public/images/blurred-shape.svg";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
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
        <div className="bg-linear-to-r from-transparent via-gray-800/50 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="pb-6 font-nacelle text-3xl font-semibold text-white md:text-4xl"
              data-aos="fade-up"
            >
              Let's Build Something Amazing Together
            </h2>

            <p
              className="mb-8 text-lg text-slate-300"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              Need a website, web application, e-commerce platform, or custom
              software solution? Let's discuss your project and turn your ideas
              into reality.
            </p>

            <div
              className="mb-8 space-y-2 text-slate-300"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <p>📧 hello@code2crest.com</p>
              <p>📍 Erode, Tamil Nadu, India</p>
            </div>

            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center gap-4">
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-25px_rgba(99,102,241,0.75)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-20px_rgba(99,102,241,0.85)] mb-4 w-full sm:mb-0 sm:w-auto"
                  href="mailto:hello@code2crest.com"
                >
                  <span className="relative inline-flex items-center">
                    Email Us
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </a>
              </div>

              <div data-aos="fade-up" data-aos-delay={600}>
                <a
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-300 transition duration-300 hover:border-green-400/60 hover:bg-green-500/20 hover:text-green-100 hover:shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)] shadow-[0_18px_45px_-25px_rgba(16,185,129,0.45)] sm:w-auto w-full"
                  href="https://wa.me/919524899042?text=Hi%20Code2Crest%2C%20I%20would%20like%20to%20discuss%20my%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

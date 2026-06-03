"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaRocket,
  FaUserTie,
  FaReact,
  FaCode,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import BlurredShape from "@/public/images/blurred-shape.svg";
import Logo from "@/components/ui/logo";
import FounderImage from "@/public/images/barath-rahav.jpg";
import WebsiteBubble from "@/components/ui/website-bubble";

export default function ConnectPage() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute top-0 right-0 -z-10 -mt-24 mr-20"
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
        <div className="py-16 md:py-24">
          {/* Header with Logo */}
          <div className="mb-16 text-center" data-aos="fade-up">
            <div className="mb-6 flex justify-center">
              <Logo />
            </div>
            <h1 className="pb-4 font-nacelle text-4xl font-semibold text-white md:text-5xl">
              Let's Connect
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Ready to start your next project? Get in touch with Code2Crest
              Technologies today.
            </p>
          </div>

          {/* Main Contact Container */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Founder Card */}
            <div
              className="group relative lg:col-span-3 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 backdrop-blur-sm transition duration-300 hover:border-indigo-500/60 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]"
              data-aos="fade-up"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Left Image */}
                <div className="relative mx-auto shrink-0 md:mx-0">
  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl transition duration-300 group-hover:bg-indigo-500/30" />

  <div className="relative h-50 w-50 overflow-hidden rounded-full border-2 border-indigo-500/30">
    <Image
      src={FounderImage}
      alt="Barath Rahav"
      fill
      className="object-cover"
    />
  </div>
</div>

                {/* Right Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-nacelle text-3xl font-semibold text-white">
                    Barath Rahav
                  </h3>

                  <p className="mt-2 text-lg font-medium text-indigo-400">
                    Founder & Full-Stack Developer
                  </p>

                  <p className="mt-4 max-w-4xl text-slate-300 leading-relaxed">
                    Helping startups and businesses build scalable websites,
                    e-commerce platforms, and custom software solutions using
                    modern technologies.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                      React.js
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                      Next.js
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                      Node.js
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                      MongoDB
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                      Strapi
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                      TypeScript
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                      Tailwind CSS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div
              className="group relative rounded-2xl border border-blue-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm transition duration-300 hover:border-blue-500/60 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                  <FaPhone className="h-6 w-6 text-blue-400" />
                </div>

                <div>
                  <h3 className="font-nacelle text-xl font-semibold text-white">
                    Phone
                  </h3>

                  <a
                    href="tel:+919524899042"
                    className="mt-2 block text-lg font-medium text-blue-300 hover:text-blue-200"
                  >
                    +91 95248 99042
                  </a>

                  <p className="mt-2 text-sm text-slate-400">
                    Call during business hours (IST)
                  </p>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div
              className="group relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm transition duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                  <FaLinkedin className="h-6 w-6 text-cyan-400" />
                </div>

                <div>
                  <h3 className="font-nacelle text-xl font-semibold text-white">
                    LinkedIn
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Connect and follow professional updates
                  </p>

                  <a
                    href="https://linkedin.com/in/barathrahav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/20 hover:text-cyan-100"
                  >
                    <FaLinkedin className="h-4 w-4" />
                    Connect
                  </a>
                </div>
              </div>
            </div>

            {/* Portfolio Card */}
            <div
              className="group relative rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm transition duration-300 hover:border-fuchsia-500/60 hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.3)]"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20">
                  <FaCode className="h-6 w-6 text-fuchsia-400" />
                </div>

                <div>
                  <h3 className="font-nacelle text-xl font-semibold text-white">
                    Portfolio
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Explore recent projects and solutions
                  </p>

                  <a
                    href="/#portfolio"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-fuchsia-300 transition duration-300 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/20 hover:text-fuchsia-100"
                  >
                    View Our Work
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="mx-auto mt-20 max-w-3xl text-center"
            data-aos="fade-up"
          >
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 p-12 backdrop-blur-sm">
              <h2 className="font-nacelle text-3xl font-semibold text-white mb-4">
                Ready to Launch Your Business Online?
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                Book a free consultation with me today. We'll discuss your
                project requirements, timeline, and how I can help bring your
                vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/919524899042?text=Hi%20Code2Crest%2C%20I%20would%20like%20to%20book%20a%20free%20consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-300 transition duration-300 hover:border-green-400/60 hover:bg-green-500/20 hover:text-green-100 hover:shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)] shadow-[0_18px_45px_-25px_rgba(16,185,129,0.45)] sm:w-auto w-full"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  <span>Book Free Consultation on WhatsApp</span>
                </a>

                <a
                  href="mailto:hello@code2crest.com?subject=Free%20Consultation%20Request"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-8 py-4 text-sm font-semibold text-indigo-300 transition duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/20 hover:text-indigo-100"
                >
                  <FaEnvelope className="h-5 w-5" />
                  <span>Email for Consultation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid gap-8 text-center md:grid-cols-3">
            <div
              data-aos="fade-up"
              className="rounded-xl border border-slate-800 bg-slate-900/30 p-6"
            >
              <div className="flex items-center gap-4 md:flex-col md:text-center">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <MdLocationOn className="h-6 w-6 text-blue-400" />
                </div>

                {/* Content */}
                <div className="text-left md:text-center">
                  <h4 className="font-nacelle font-semibold text-white">
                    Location
                  </h4>

                  <p className="text-slate-400">Erode, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="rounded-xl border border-slate-800 bg-slate-900/30 p-6"
            >
              <div className="flex items-center gap-4 md:flex-col md:text-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <FaClock className="h-6 w-6 text-green-400" />
                </div>

                <div className="text-left md:text-center">
                  <h4 className="font-nacelle font-semibold text-white">
                    Response Time
                  </h4>

                  <p className="text-slate-400">Within 24 Hours</p>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="rounded-xl border border-slate-800 bg-slate-900/30 p-6"
            >
              <div className="flex items-center gap-4 md:flex-col md:text-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                  <FaRocket className="h-6 w-6 text-purple-400" />
                </div>

                <div className="text-left md:text-center">
                  <h4 className="font-nacelle font-semibold text-white">
                    Free Consultation
                  </h4>

                  <p className="text-slate-400">No Commitment Required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WebsiteBubble />
    </section>
  );
}

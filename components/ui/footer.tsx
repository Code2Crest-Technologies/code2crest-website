import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";

import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Background Illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer Background"
          />
        </div>

        {/* Footer Content */}
        <div className="py-12">

          {/* Brand Section */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>

            <p className="mb-5 text-sm text-slate-400">
              Building Scalable Digital Solutions
            </p>

            <div className="mb-6 flex justify-center gap-5">
              <a
                href="https://www.linkedin.com/company/code2crest-technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 transition hover:text-indigo-300"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://github.com/Code2Crest-Technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 transition hover:text-indigo-300"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.instagram.com/code2crest/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 transition hover:text-indigo-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">

            {/* Services */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Services
              </h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    Web Development
                  </a>
                </li>

                <li>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    E-Commerce Solutions
                  </a>
                </li>

                <li>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    React & Next.js Apps
                  </a>
                </li>

                <li>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    Mobile App Development
                  </a>
                </li>

                <li>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    Custom Software
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Company
              </h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#why-us"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    Why Choose Us
                  </a>
                </li>

                <li>
                  <a
                    href="#portfolio"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    Portfolio
                  </a>
                </li>

                <li>
                  <a
                    href="#contact"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    Contact
                  </a>
                </li>

                <li>
                  <a
                    href="#GetQuote"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    Get Quote
                  </a>
                </li>
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Technologies
              </h3>

              <ul className="space-y-3 text-sm">
                <li className="text-slate-400">React.js</li>
                <li className="text-slate-400">Next.js</li>
                <li className="text-slate-400">Node.js</li>
                <li className="text-slate-400">MongoDB</li>
                <li className="text-slate-400">Strapi</li>
                <li className="text-slate-400">TypeScript</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Contact
              </h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="tel:+919524899042"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    +91 95248 99042
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:hello@code2crest.com"
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    hello@code2crest.com
                  </a>
                </li>

                <li className="text-slate-400">
                  Erode, Tamil Nadu
                </li>

                <li className="text-slate-400">
                  India
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 border-t border-slate-800 pt-6 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Code2Crest Technologies.
              All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
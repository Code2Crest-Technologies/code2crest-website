"use client";

import { useState } from "react";
import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";

export default function GetQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirement: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Using FormSubmit service (no backend needed)
    const form = e.currentTarget;
    const submitForm = new FormData(form);

    fetch("https://formsubmit.co/hello@code2crest.com", {
      method: "POST",
      body: submitForm,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(true);

          setFormData({
            name: "",
            email: "",
            phone: "",
            requirement: "",
          });

          form.reset();
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  };

  return (
    <section id="GetQuote" className="relative overflow-hidden">
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
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 md:p-12">
              <h2
                className="pb-6 font-nacelle text-3xl font-semibold text-white md:text-4xl text-center"
                data-aos="fade-up"
              >
                Get Your Free Quote
              </h2>

              <p
                className="mb-8 text-center text-lg text-slate-300"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                Tell us about your project and we'll get back to you within 24
                hours.
              </p>

              {/* Success Modal */}
              {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
                  <div className="w-full max-w-md rounded-2xl border border-green-500/30 bg-slate-900 p-8 text-center shadow-2xl">
                    <div className="mb-4 text-6xl">🎉</div>

                    <h3 className="mb-3 text-2xl font-semibold text-white">
                      Quote Request Submitted
                    </h3>

                    <p className="mb-6 text-slate-300">
                      Thank you for contacting Code2Crest Technologies.
                      <br />
                      We'll review your requirements and get back to you within
                      24 hours.
                    </p>

                    <button
                      onClick={() => setShowModal(false)}
                      className="rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* FormSubmit Settings */}

                <input
                  type="hidden"
                  name="_subject"
                  value="🚀 New Lead - Code2Crest Technologies"
                />

                <input type="hidden" name="_template" value="table" />

                <input type="hidden" name="_captcha" value="false" />

                <input
                  type="hidden"
                  name="_autoresponse"
                  value="Thank you for contacting Code2Crest Technologies. We have received your inquiry and will get back to you within 24 hours."
                />
                {/* Name */}
                <div data-aos="fade-up" data-aos-delay={200}>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-indigo-200/65"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="form-input w-full rounded-lg border border-gray-600/50 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div data-aos="fade-up" data-aos-delay={300}>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-indigo-200/65"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="form-input w-full rounded-lg border border-gray-600/50 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Phone */}
                <div data-aos="fade-up" data-aos-delay={400}>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-indigo-200/65"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="form-input w-full rounded-lg border border-gray-600/50 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Project Requirement */}
                <div data-aos="fade-up" data-aos-delay={500}>
                  <label
                    htmlFor="requirement"
                    className="mb-2 block text-sm font-medium text-indigo-200/65"
                  >
                    Project Requirement
                  </label>
                  <textarea
                    id="requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="Describe your project, requirements, and timeline..."
                    rows={5}
                    required
                    className="form-input w-full rounded-lg border border-gray-600/50 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div data-aos="fade-up" data-aos-delay={600}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-25px_rgba(99,102,241,0.75)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-20px_rgba(99,102,241,0.85)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>

                {/* Additional info */}
                <p className="text-center text-xs text-indigo-200/50 mt-4">
                  We'll send a confirmation to your email address.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

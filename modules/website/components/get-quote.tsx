"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurredShape from "@/public/images/blurred-shape.svg";
import {
  budgetOptions,
  heardAboutOptions,
  serviceOptions,
  timelineOptions,
  type LeadAttribution,
  type LeadBudget,
  type LeadService,
  type LeadTimeline,
  type HeardAbout,
  type LeadFieldErrors,
} from "@/lib/leads/types";

type LeadResponse = {
  success: boolean;
  message: string;
  fieldErrors?: LeadFieldErrors;
};

type QuoteFormState = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  service: "" | LeadService;
  budget: "" | LeadBudget;
  timeline: "" | LeadTimeline;
  projectDescription: string;
  heardAboutUs: "" | HeardAbout;
  website: string;
};

const initialFormState: QuoteFormState = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  projectDescription: "",
  heardAboutUs: "",
  website: "",
};

function trackGetQuoteEvent(eventName: string, service?: string) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as typeof window & {
    gtag?: (type: "event", name: string, params?: Record<string, string>) => void;
  }).gtag;

  gtag?.("event", eventName, service ? { service } : undefined);
}

function collectAttribution(): LeadAttribution {
  const url = new URL(window.location.href);
  const landingPage =
    window.sessionStorage.getItem("code2crest_landing_page") ?? window.location.href;

  window.sessionStorage.setItem("code2crest_landing_page", landingPage);

  return {
    utmSource: url.searchParams.get("utm_source") ?? undefined,
    utmMedium: url.searchParams.get("utm_medium") ?? undefined,
    utmCampaign: url.searchParams.get("utm_campaign") ?? undefined,
    utmTerm: url.searchParams.get("utm_term") ?? undefined,
    utmContent: url.searchParams.get("utm_content") ?? undefined,
    referrer: document.referrer || undefined,
    landingPage,
    currentPage: window.location.href,
  };
}

function fieldClass(hasError: boolean) {
  return `form-input w-full rounded-lg border bg-gray-800/50 px-4 text-white placeholder-gray-500 transition focus:outline-none focus:ring-1 ${
    hasError
      ? "border-red-400/70 focus:border-red-400 focus:ring-red-400"
      : "border-gray-600/50 focus:border-indigo-500 focus:ring-indigo-500"
  }`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-300">
      {message}
    </p>
  );
}

export default function GetQuote() {
  const [formData, setFormData] = useState<QuoteFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const startedEventSent = useRef(false);

  useEffect(() => {
    if (!window.sessionStorage.getItem("code2crest_landing_page")) {
      window.sessionStorage.setItem("code2crest_landing_page", window.location.href);
    }
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    if (!startedEventSent.current) {
      trackGetQuoteEvent("get_quote_started");
      startedEventSent.current = true;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setMessage("");
    setFieldErrors({});
    trackGetQuoteEvent("get_quote_submitted", formData.service || undefined);

    const response = await fetch("/api/public/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "CODE2CREST_GET_QUOTE",
        ...formData,
        attribution: collectAttribution(),
      }),
    });
    const data = (await response.json().catch(() => null)) as LeadResponse | null;

    setLoading(false);

    if (!response.ok || !data?.success) {
      setFieldErrors(data?.fieldErrors ?? {});
      setMessage(data?.message ?? "We could not submit your enquiry right now.");
      trackGetQuoteEvent("get_quote_error", formData.service || undefined);
      return;
    }

    setSubmitted(true);
    setFormData(initialFormState);
    setMessage(data.message);
    trackGetQuoteEvent("get_quote_success", formData.service || undefined);
  }

  if (submitted) {
    return (
      <section id="GetQuote" className="relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
          <div className="bg-linear-to-r from-transparent via-gray-800/40 py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-[620px] rounded-2xl border border-green-500/30 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 text-center shadow-[0_24px_80px_-55px_rgba(34,197,94,0.75)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
                Enquiry received
              </p>
              <h2 className="mt-3 font-nacelle text-3xl font-semibold text-white md:text-4xl">
                Thanks! We've received your project enquiry.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-300">
                Our team will review your requirements and get back to you shortly.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Back to Home
                </Link>
                <Link
                  href="/products"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-600/10 px-6 text-sm font-semibold text-indigo-200 transition hover:border-indigo-300 hover:text-white"
                >
                  Explore Our Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="GetQuote" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-10 left-1/2 -z-10 -translate-x-1/2 opacity-20"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt=""
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
        <div className="bg-linear-to-r from-transparent via-gray-800/40 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[760px]">
            <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 shadow-[0_24px_80px_-55px_rgba(99,102,241,0.75)] sm:p-6 md:p-8">
              <h2
                className="pb-4 text-center font-nacelle text-3xl font-semibold text-white md:text-4xl"
                data-aos="fade-up"
              >
                Get Your Free Quote
              </h2>

              <p
                className="mb-6 text-center text-base leading-7 text-slate-300"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                Tell us what you want to build and we will help you shape the
                right website, app, or software plan.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <div data-aos="fade-up" data-aos-delay={200}>
                    <label
                      htmlFor="quote-name"
                      className="mb-2 block text-sm font-medium text-indigo-200/65"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="quote-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      minLength={2}
                      maxLength={100}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "quote-name-error" : undefined}
                      className={`${fieldClass(Boolean(fieldErrors.name))} h-11`}
                    />
                    <FieldError id="quote-name-error" message={fieldErrors.name} />
                  </div>

                  <div data-aos="fade-up" data-aos-delay={240}>
                    <label
                      htmlFor="quote-company"
                      className="mb-2 block text-sm font-medium text-indigo-200/65"
                    >
                      Business / Company Name
                    </label>
                    <input
                      type="text"
                      id="quote-company"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your company or business name"
                      maxLength={120}
                      className={`${fieldClass(Boolean(fieldErrors.companyName))} h-11`}
                    />
                  </div>

                  <div data-aos="fade-up" data-aos-delay={280}>
                    <label
                      htmlFor="quote-email"
                      className="mb-2 block text-sm font-medium text-indigo-200/65"
                    >
                      Business Email *
                    </label>
                    <input
                      type="email"
                      id="quote-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      maxLength={254}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "quote-email-error" : undefined}
                      className={`${fieldClass(Boolean(fieldErrors.email))} h-11`}
                    />
                    <FieldError id="quote-email-error" message={fieldErrors.email} />
                  </div>

                  <div data-aos="fade-up" data-aos-delay={320}>
                    <label
                      htmlFor="quote-phone"
                      className="mb-2 block text-sm font-medium text-indigo-200/65"
                    >
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="quote-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      maxLength={32}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "quote-phone-error" : undefined}
                      className={`${fieldClass(Boolean(fieldErrors.phone))} h-11`}
                    />
                    <FieldError id="quote-phone-error" message={fieldErrors.phone} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div data-aos="fade-up" data-aos-delay={360}>
                    <label
                      htmlFor="quote-service"
                      className="mb-2 block text-sm font-medium text-indigo-200/65"
                    >
                      Service Required *
                    </label>
                    <select
                      id="quote-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      aria-invalid={Boolean(fieldErrors.service)}
                      aria-describedby={fieldErrors.service ? "quote-service-error" : undefined}
                      className={`${fieldClass(Boolean(fieldErrors.service))} h-11`}
                    >
                      <option value="">Select service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FieldError id="quote-service-error" message={fieldErrors.service} />
                  </div>

                  <div data-aos="fade-up" data-aos-delay={400}>
                    <label
                      htmlFor="quote-budget"
                      className="mb-2 block text-sm font-medium text-indigo-200/65"
                    >
                      Estimated Budget
                    </label>
                    <select
                      id="quote-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`${fieldClass(Boolean(fieldErrors.budget))} h-11`}
                    >
                      <option value="">Select budget</option>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FieldError id="quote-budget-error" message={fieldErrors.budget} />
                  </div>

                  <div data-aos="fade-up" data-aos-delay={440}>
                    <label
                      htmlFor="quote-timeline"
                      className="mb-2 block text-sm font-medium text-indigo-200/65"
                    >
                      Expected Timeline
                    </label>
                    <select
                      id="quote-timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className={`${fieldClass(Boolean(fieldErrors.timeline))} h-11`}
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FieldError id="quote-timeline-error" message={fieldErrors.timeline} />
                  </div>
                </div>

                <div data-aos="fade-up" data-aos-delay={480}>
                  <label
                    htmlFor="quote-description"
                    className="mb-2 block text-sm font-medium text-indigo-200/65"
                  >
                    Tell us about your project *
                  </label>
                  <p id="quote-description-help" className="mb-2 text-xs text-indigo-100/50">
                    Briefly describe what you want to build, your goals, and any
                    important requirements.
                  </p>
                  <textarea
                    id="quote-description"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe your project, requirements, audience, and timeline..."
                    rows={5}
                    required
                    minLength={20}
                    maxLength={1600}
                    aria-invalid={Boolean(fieldErrors.projectDescription)}
                    aria-describedby={`quote-description-help quote-description-counter${
                      fieldErrors.projectDescription ? " quote-description-error" : ""
                    }`}
                    className={`${fieldClass(Boolean(fieldErrors.projectDescription))} resize-none py-3`}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <FieldError
                      id="quote-description-error"
                      message={fieldErrors.projectDescription}
                    />
                    <p
                      id="quote-description-counter"
                      className="ml-auto shrink-0 text-xs text-indigo-100/45"
                    >
                      {formData.projectDescription.length}/1600
                    </p>
                  </div>
                </div>

                <div data-aos="fade-up" data-aos-delay={520}>
                  <label
                    htmlFor="quote-heard-about"
                    className="mb-2 block text-sm font-medium text-indigo-200/65"
                  >
                    How did you hear about Code2Crest?
                  </label>
                  <select
                    id="quote-heard-about"
                    name="heardAboutUs"
                    value={formData.heardAboutUs}
                    onChange={handleChange}
                    className={`${fieldClass(Boolean(fieldErrors.heardAboutUs))} h-11`}
                  >
                    <option value="">Select source</option>
                    {heardAboutOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FieldError id="quote-heard-error" message={fieldErrors.heardAboutUs} />
                </div>

                <p
                  className="text-center text-xs leading-5 text-indigo-100/60"
                  data-aos="fade-up"
                  data-aos-delay={560}
                >
                  By submitting this form, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-indigo-200 underline underline-offset-4 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="font-semibold text-indigo-200 underline underline-offset-4 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Terms & Conditions
                  </Link>
                  .
                </p>

                {message ? (
                  <p
                    className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100"
                    aria-live="polite"
                  >
                    {message}
                  </p>
                ) : null}

                <div data-aos="fade-up" data-aos-delay={600}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 w-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-6 text-sm font-semibold text-white shadow-[0_18px_45px_-25px_rgba(99,102,241,0.75)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-20px_rgba(99,102,241,0.85)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Request a Free Consultation"}
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-indigo-200/50">
                  We use this information only to understand your requirement
                  and respond to your enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

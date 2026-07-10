"use client";

import { useMemo, useState } from "react";
import { FaBuilding, FaFloppyDisk, FaPen, FaXmark } from "react-icons/fa6";
import type { AuthCompany } from "@/lib/auth/session";

type CompanyProfileFormProps = {
  company: AuthCompany;
  canEdit: boolean;
};

type ProfileValues = {
  name: string;
  website: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  gstin: string;
  timezone: string;
};

function toValues(company: AuthCompany): ProfileValues {
  return {
    name: company.name,
    website: company.website ?? "",
    phone: company.phone ?? "",
    address: company.address ?? "",
    city: company.city ?? "",
    state: company.state ?? "",
    country: company.country ?? "",
    postalCode: company.postalCode ?? "",
    gstin: company.gstin ?? "",
    timezone: company.timezone ?? "Asia/Kolkata",
  };
}

const fields: {
  key: keyof ProfileValues;
  label: string;
  placeholder: string;
}[] = [
  { key: "name", label: "Company name", placeholder: "Company name" },
  { key: "website", label: "Website", placeholder: "https://company.com" },
  { key: "phone", label: "Phone", placeholder: "+91 00000 00000" },
  { key: "address", label: "Address", placeholder: "Street address" },
  { key: "city", label: "City", placeholder: "City" },
  { key: "state", label: "State", placeholder: "State" },
  { key: "country", label: "Country", placeholder: "Country" },
  { key: "postalCode", label: "Postal code", placeholder: "Postal code" },
  { key: "gstin", label: "GSTIN", placeholder: "GSTIN" },
  { key: "timezone", label: "Timezone", placeholder: "Asia/Kolkata" },
];

export default function CompanyProfileForm({
  company,
  canEdit,
}: CompanyProfileFormProps) {
  const initialValues = useMemo(() => toValues(company), [company]);
  const [values, setValues] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(key: keyof ProfileValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function cancelEditing() {
    setValues(initialValues);
    setIsEditing(false);
    setError("");
    setMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (values.name.trim().length < 2) {
      setError("Company name must be at least 2 characters.");
      return;
    }

    setIsSaving(true);
    const response = await fetch("/api/company", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
      company?: Partial<AuthCompany>;
    } | null;
    setIsSaving(false);

    if (!response.ok) {
      setError(data?.message ?? "Unable to update company profile.");
      return;
    }

    setMessage("Company profile updated.");
    setIsEditing(false);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-600">
            <FaBuilding className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Business Profile
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload support coming soon. Profile details are used for workspace
              and billing readiness.
            </p>
          </div>
        </div>

        {canEdit ? (
          <div className="flex gap-2">
            {isEditing ? (
              <button
                type="button"
                onClick={cancelEditing}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <FaXmark className="h-4 w-4" />
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <FaPen className="h-4 w-4" />
                Edit
              </button>
            )}
          </div>
        ) : null}
      </div>

      {message ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 lg:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="text-sm font-semibold text-slate-700"
            >
              {field.label}
            </label>
            <input
              id={field.key}
              value={values[field.key]}
              onChange={(event) => updateField(field.key, event.target.value)}
              disabled={!isEditing || isSaving}
              placeholder={field.placeholder}
              className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        ))}

        {isEditing ? (
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              <FaFloppyDisk className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save company profile"}
            </button>
          </div>
        ) : null}
      </form>
    </section>
  );
}

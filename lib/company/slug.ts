import { prisma } from "@/lib/db/prisma";

function baseSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "company";
}

export async function createUniqueCompanySlug(name: string) {
  const base = baseSlug(name);
  let candidate = base;
  let suffix = 1;

  while (await prisma.company.findUnique({ where: { slug: candidate } })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  return candidate;
}

type StructuredDataProps = {
  data: Record<string, unknown>;
};

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationStructuredData() {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Code2Crest Technologies",
        url: "https://www.code2crest.com",
        logo: "https://www.code2crest.com/favicon-96x96.png",
        founder: {
          "@type": "Person",
          name: "Barath Rahav",
        },
        areaServed: ["Erode", "Tamil Nadu", "India"],
        sameAs: [
          "https://www.linkedin.com/company/code2crest-technologies",
          "https://github.com/Code2Crest-Technologies",
          "https://www.instagram.com/code2crest/",
        ],
      }}
    />
  );
}

export function ProfessionalServiceStructuredData() {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Code2Crest Technologies",
        url: "https://www.code2crest.com",
        image: "https://www.code2crest.com/og-image.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Erode",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        areaServed: ["Erode", "Tamil Nadu", "India"],
        serviceType: [
          "Website Development",
          "Web Application Development",
          "E-Commerce Development",
          "Custom Software Development",
          "Mobile App Development",
          "SaaS Product Development",
        ],
      }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

import prisma from "@/lib/database";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://akash-m.vercel.app";

async function getPersonData() {
  try {
    const data = await prisma.personalInfo.findFirst({
      where: { me: true },
      select: {
        developer: {
          select: {
            name: true,
            email: true,
            github: true,
            linkedIn: true,
            twitter: true,
            about: true,
            images: true,
          },
        },
      },
    });
    return data?.developer || null;
  } catch (error) {
    console.error("Failed to fetch person data for schema:", error);
    return null;
  }
}

export default async function JsonLdSchema() {
  const person = await getPersonData();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Akash M Portfolio",
    url: siteUrl,
    description:
      "Full-stack developer portfolio showcasing projects, experience, and skills in Next.js, TypeScript, React, and modern web development.",
    author: {
      "@type": "Person",
      name: person?.name || "Akash M",
    },
    inLanguage: "en-US",
  };

  const personSchema = person
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: person.name,
        email: person.email,
        url: siteUrl,
        image: person.images?.[0] || undefined,
        description: person.about,
        jobTitle: "Full-Stack Developer",
        sameAs: [person.github, person.linkedIn, person.twitter].filter(
          Boolean
        ),
        knowsAbout: [
          "Web Development",
          "Full-Stack Development",
          "Next.js",
          "TypeScript",
          "React",
          "Node.js",
          "PostgreSQL",
          "Prisma",
        ],
      }
    : null;

  const professionalSchema = person
    ? {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: person.name,
          email: person.email,
          url: siteUrl,
          image: person.images?.[0] || undefined,
          description: person.about,
          jobTitle: "Full-Stack Developer",
          sameAs: [person.github, person.linkedIn, person.twitter].filter(
            Boolean
          ),
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      {professionalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalSchema),
          }}
        />
      )}
    </>
  );
}

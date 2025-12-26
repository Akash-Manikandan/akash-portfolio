import prisma from "@/lib/database";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const getSocialLinks = async () => {
  try {
    const data = await prisma.personalInfo.findFirst({
      where: { me: true },
      select: {
        developer: {
          select: {
            github: true,
            linkedIn: true,
            twitter: true,
            email: true,
          },
        },
      },
    });
    return data?.developer || null;
  } catch (error) {
    console.error("Failed to fetch social links:", error);
    return null;
  }
};

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const social = await getSocialLinks();

  return (
    <footer className="border-t border-border/40 mt-8">
      {social && (
        <div className="flex justify-center gap-6 py-4 mt-3">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <GitHubLogoIcon width={24} height={24} />
            </a>
          )}
          {social.linkedIn && (
            <a
              href={social.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <LinkedInLogoIcon width={24} height={24} />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="text-foreground/60 hover:text-foreground transition-colors text-2xl leading-none"
            >
              𝕏
            </a>
          )}
        </div>
      )}
      <p className="text-center pt-3 pb-4 text-sm text-foreground/60">
        Akash M © {currentYear}
      </p>
    </footer>
  );
}

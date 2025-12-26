import ContactForm from "@/components/custom/contact/ContactForm";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/database";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { MailIcon } from "lucide-react";
import { Metadata } from "next";

type CreationData = {
  message: string;
  username: string;
  email: string;
};

export const metadata: Metadata = {
  title: "Contact Akash M — Email & Social Links",
  description:
    "Get in touch with Akash M for freelance work, collaboration, or full-time opportunities. Send a message directly, or connect via email and social profiles like GitHub and LinkedIn.",
  alternates: {
    canonical: "/contact",
  },
};

const getData = async () => {
  try {
    const data = await prisma.personalInfo.findFirst({
      where: {
        me: true,
      },
      select: {
        developer: {
          select: {
            id: true,
            name: true,
            github: true,
            linkedIn: true,
            email: true,
            twitter: true,
          },
        },
      },
    });

    return data ? data.developer : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function Contact() {
  const data = await getData();

  async function create(data: CreationData) {
    "use server";

    return await prisma.message.create({
      data: {
        email: data.email,
        message: data.message,
        username: data.username,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }

  return (
    <>
      <section className="mx-8 flex flex-col justify-center gap-10 pt-24 my-20">
        <h1 className="text-4xl text-center">Let&apos;s Connect!</h1>
        <p className="text-lg mx-24 text-center max-md:mx-2 max-sm:text-justify">
          Beyond building exceptional web applications, I&apos;m passionate
          about fostering a collaborative community. I believe in the power of
          exchanging ideas, learning from each other, and building connections
          in the tech community. Whether you&apos;re looking to discuss a
          potential project, solve a technical challenge, or explore the latest
          innovations in the tech field, I&apos;m always eager to brainstorm.
          Let&apos;s connect and see where our combined expertise can take us!
        </p>
      </section>
      {data && (
        <section className="mx-8 flex flex-col justify-center gap-10 my-10 items-center">
          <h1 className="text-4xl text-center py-4">Connect with me on</h1>
          <div className="flex justify-between gap-5 flex-wrap w-3/5 max-md:w-11/12 max-sm:w-full">
            <div className="flex flex-col items-center gap-4">
              <a href={data.linkedIn} target="_blank">
                <LinkedInLogoIcon width={60} height={60} />
              </a>
              <p>LinkedIn</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <a href={data.twitter} target="_blank" className="text-6xl">
                &#120143;
              </a>
              <p>X</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <a href={data.github} target="_blank">
                <GitHubLogoIcon width={60} height={60} />
              </a>
              <p>GitHub</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <a
                href={`mailto:${data.email}`}
                title={data.email}
                target="_blank"
                className="text-6xl"
              >
                <MailIcon width={60} height={60} />
              </a>
              <p>Email</p>
            </div>
          </div>
        </section>
      )}
      <div className="px-8">
        <Separator className="my-20" />
      </div>
      <section className="mx-60 max-lg:mx-32 max-md:mx-12 max-sm:mx-8 mb-10 flex flex-col justify-center gap-10">
        <h1 className="text-4xl text-center pb-6">Send a Note</h1>
        <ContactForm formSubmit={create} />
      </section>
    </>
  );
}

export default Contact;

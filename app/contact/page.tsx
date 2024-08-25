import ContactForm from "@/components/custom/contact/ContactForm";
import prisma from "@/lib/database";

type CreationData = {
  message: string;
  username: string;
  email: string;
}

function Contact() {

  async function create(data: CreationData) {
    "use server"

    return await prisma.message.create({
      data: {
        email: data.email,
        message: data.message,
        username: data.username
      },
      select: {
        id: true,
        username: true
      }
    })
  }

  return (
    <>
      <section className="mx-8 min-h-[85vh] flex flex-col justify-center gap-10">
        <h1 className="text-4xl text-center">Let&apos;s Connect!</h1>
        <p className="text-lg mx-24 text-center max-md:mx-2 max-sm:text-justify">
          I&apos;m a full-stack developer dedicated to creating web applications that truly serve users&apos; needs.
          My passion extends beyond coding - I thrive on collaboration, idea sharing, and building connections in the tech community.
          Whether you&apos;re looking to discuss a potential project, solve a technical challenge, or explore the latest innovations in our field, I&apos;m always eager to engage.
          Don&apos;t hesitate to reach out - together, we can turn ideas into reality and push the boundaries of what&apos;s possible in web development.
          Let&apos;s connect and see where our combined expertise can take us!
        </p>
      </section>
      <section className="mx-8 min-h-[85vh] flex flex-col justify-center gap-10">
        <h1 className="text-4xl text-center">Send a note</h1>
        <ContactForm formSubmit={create} />
      </section>
      <section className="mx-8 min-h-[85vh] flex flex-col justify-center gap-10">
        <h1 className="text-4xl text-center">Connect with me on</h1>
        <p>LinkedIn GitHub and stuffs</p>
      </section>
    </>
  );
}

export default Contact;

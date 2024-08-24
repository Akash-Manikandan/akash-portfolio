import EducationCard from "@/components/custom/about/EducationCard";
import ProfessionalCard from "@/components/custom/about/ProfessionalCard";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/database";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Lora } from "next/font/google";

export const metadata: Metadata = {
  title: "Akash M - About",
  description: "Portfolio of Akash M",
};

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

export const revalidate = 86400;

const getData = async () => {
  try {
    const data = await prisma.personalInfo.findFirst({
      where: {
        me: true,
      },
      include: {
        education: {
          select: {
            id: true,
            name: true,
            degree: true,
            description: true,
            location: true,
            marks: true,
            duration: true,
          }
        },
        developer: {
          select: {
            id: true,
            name: true,
            github: true,
            about: true,
            specifics: true,
          }
        },
        professional: {
          select: {
            id: true,
            companyName: true,
            duration: true,
            position: {
              select: {
                name: true,
                description: true,
                id: true,
                duration: true,
                skills: true,
                techStack: {
                  select: {
                    name: true,
                    id: true,
                  }
                }
              },
              orderBy: {
                order: "desc"
              }
            },
            description: true,
            location: true,
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });
    return data ? [data] : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const About = async () => {
  const about = await getData();

  return (
    <>
      {about.map((data) => (
        <div className="py-12 px-8" key={data.id}>
          {data.developer && (
            <>
              <section className="flex flex-col gap-3 mx-10 mb-10 max-sm:m-2 text-justify">
                {data.developer.specifics.map((specific, index) => (
                  <p key={index} className="last:text-xl last:text-center last:pt-6">{specific}</p>
                ))}
              </section>
              <Separator orientation="horizontal" className="my-12" />
            </>
          )}
          <h2 className={cn(lora.className, "font-bold text-3xl mb-10 ml-3")}>Education</h2>
          <section className="grid grid-cols-2 gap-6 items-stretch max-sm:flex max-sm:flex-col">
            {data.education.map((education, index) => (
              <EducationCard key={education.id} className={(index === 0 && data.education.length) ? "col-span-2" : ""} education={education} />
            ))}
          </section>
          <Separator orientation="horizontal" className="my-12" />
          <h2 className={cn(lora.className, "font-bold text-3xl mb-10 ml-3")}>Professional Experience</h2>
          <section className="grid grid-cols-2 gap-6 items-stretch">
            {data.professional.map((experience) => (
              <ProfessionalCard key={experience.id} className={"col-span-2"} experience={experience} />
            ))}
          </section>
          <Separator orientation="horizontal" className="my-12" />
          <section className="flex w-full items-center justify-center my-5 flex-col gap-5">
            <h2 className={cn(lora.className, "font-bold text-3xl mb-6 ml-3 w-full")}>
              My Resume
            </h2>
            <iframe
              className="w-[560px] h-[780px] max-sm:w-[300px] max-sm:h-[400px] framerr"
              frameBorder="0"
              allowFullScreen={true}
              loading="lazy"
              title="Resume"
              src={data.resume}
            />
          </section>
          <Separator orientation="horizontal" className="my-12" />
          <section className="flex flex-col justify-center items-center gap-3">
            <div className={cn(lora.className, "font-bold text-3xl mb-6 ml-3 w-full")}>Favourite Artist</div>
            <div className="w-[500px] max-md:w-80">
              <iframe
                className="rounded-[12px]"
                src="https://open.spotify.com/embed/artist/06HL4z0CvFAxyc27GXpf02?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </section>
        </div>
      ))}
    </>
  );
}

export default About;

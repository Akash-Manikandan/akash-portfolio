import EducationCard from "@/components/custom/about/EducationCard";
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
    <div className="py-12 px-8">
      {about.map((data) => (
        <div key={data.id}>
          {data.developer && (
            <>
              <h1 className={cn(lora.className, "font-bold text-4xl")}>{data.developer.name}</h1>
              <Separator orientation="horizontal" className="my-10" />
              <div className="flex flex-col gap-3 m-10 ">
                {data.developer.specifics.map((specific, index) => (
                  <p key={index} className="last:text-xl last:text-center last:pt-6">{specific}</p>
                ))}
              </div>
              <Separator orientation="horizontal" className="my-10" />
            </>
          )}
          <h2 className={cn(lora.className, "font-bold text-3xl mb-6 ml-3")}>Education</h2>
          <div className="grid grid-cols-2 gap-6 items-stretch">
            {data.education.map((education, index) => (
              <EducationCard key={education.id} className={(index === 0 && data.education.length) ? "col-span-2" : ""} education={education} />
            ))}
          </div>
          <Separator orientation="horizontal" className="my-10" />
          <h2 className={cn(lora.className, "font-bold text-3xl mb-6 ml-3")}>Education</h2>
          <div className="grid grid-cols-2 gap-6 items-stretch">
            {data.education.map((education, index) => (
              <EducationCard key={education.id} className={(index === 0 && data.education.length) ? "col-span-2" : ""} education={education} />
            ))}
          </div>
          <Separator orientation="horizontal" className="my-10" />
          <div className="flex w-full items-center justify-center my-5 flex-col gap-5">
            <p className="font-bold text-2xl">
              My Resume
            </p>
            <iframe
              className="w-[560px] h-[780px] max-sm:w-[300px] max-sm:h-[400px] framerr"
              frameBorder="0"
              allowFullScreen={true}
              loading="eager"
              title="Resume"
              src={data.resume}
            />
          </div>
          <Separator orientation="horizontal" className="my-10" />
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="text-2xl">Favourite Artist</div>
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;

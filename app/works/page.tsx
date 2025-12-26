import prisma from "@/lib/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";

import TextEllipsis from "@/components/custom/TextEllipsis";
import Link from "next/link";
import CardCarousel from "@/components/custom/CardCarousel";
import TechBadge from "@/components/custom/TechBadge";
import { Metadata } from "next";
import { getLastUrlSegment } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Akash M — Selected Projects & Work",
  description:
    "Browse selected software projects by Akash M, from web apps to full-stack builds. Each project includes the tech stack, links, media, and a concise overview of goals and outcomes.",
  alternates: {
    canonical: "/works",
  },
};

export const revalidate = 10800;

const getData = async () => {
  try {
    const data = await prisma.works.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        techStack: {
          select: {
            id: true,
            name: true,
          },
        },
        media: {
          select: {
            id: true,
            url: true,
            description: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const Works = async () => {
  const works = await getData();

  return (
    <>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 mx-6 pt-12 mb-8">
        {works.map((item, index) => (
          <Card key={item.id} className="flex flex-col justify-between">
            <CardContent className="p-4 flex items-center justify-center">
              {item.media.length > 0 && (
                <CardCarousel
                  carouselContentSyle={{ height: "200px", width: "100%" }}
                  works={item}
                  id={item.id}
                  lcp={index === 0}
                />
              )}
            </CardContent>
            <div className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl flex">
                  <Link
                    className="w-full flex-1 font-medium max-md:mt-4"
                    href={`/works/${item.id}`}
                  >
                    {item.name}
                  </Link>
                </CardTitle>
                <CardDescription>
                  <p className="text-lg text-justify py-4">{item.tagLine}</p>
                  <Link
                    href={`/works/${item.id}`}
                    className="flex gap-2 flex-wrap"
                  >
                    {item.techStack.map((tech) => (
                      <TechBadge tech={tech} key={tech.id} />
                    ))}
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <a target="_blank" href={item.deployment}>
                  <Link2Icon width={20} height={20} />
                </a>
                <HoverCard>
                  <HoverCardTrigger target="_blank" href={item.github}>
                    <GitHubLogoIcon
                      className="drop-shadow-md"
                      width={30}
                      height={30}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-3 items-center">
                        <GitHubLogoIcon
                          className="drop-shadow-md"
                          width={35}
                          height={35}
                        />
                        <a
                          className="underline"
                          href={item.github}
                          target="_blank"
                        >
                          @{getLastUrlSegment(item.github)}
                        </a>
                      </div>
                      <TextEllipsis maxLine="4" text={item.tagLine} />
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Works;

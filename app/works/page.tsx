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
import { Lora } from "next/font/google";
import { cn, getLastUrlSegment } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Akash M - Works",
  description: "Portfolio of Akash M",
};

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

export const revalidate = 86400;

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
      <div className="pt-8 px-8">
        <div className={cn(lora.className, "font-bold text-4xl")}>Works</div>
        <Separator orientation="horizontal" className="my-6" />
      </div>
      <div className="flex flex-col gap-2 mx-40 max-md:mx-10 max-sm:mx-2 max-lg:mx-12">
        {works.map((item, index) => (
          <Card key={item.id} className="m-6">
            <CardContent className="p-4 flex items-center justify-center flex-1">
              {item.media.length > 0 && (
                <CardCarousel
                  carouselContentSyle={{ maxHeight: "400px", width: "100%" }}
                  works={item}
                  id={item.id}
                  lcp={index === 0}
                />
              )}
            </CardContent>
            <CardHeader>
              <CardTitle className="text-xl flex">
                <Link className="w-full flex-1 font-medium max-md:mt-4" href={`/works/${item.id}`}>
                  {item.name}
                </Link>
              </CardTitle>
              <CardDescription>
                <p className="text-lg text-justify py-4">{item.tagLine}</p>
                <Link href={`/works/${item.id}`} className="flex gap-2 flex-wrap">
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
                  <GitHubLogoIcon width={30} height={30} />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3 items-center">
                      <GitHubLogoIcon width={35} height={35} />
                      <a className="underline" href={item.github} target="_blank">
                        @{getLastUrlSegment(item.github)}
                      </a>
                    </div>
                    <TextEllipsis maxLine="4" text={item.tagLine} />
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Works;

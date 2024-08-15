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

export const metadata: Metadata = {
  title: "Akash M - Works",
  description: "Portfolio of Akash M",
};

const getData = async () => {
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
};
const Works = async () => {
  const works = await getData();


  return (
    <div className="flex flex-col gap-2 mx-40 max-md:mx-10 max-sm:mx-2 max-lg:mx-12">
      {works.map((item) => (
        <Card key={item.id} className="m-6">
          <CardContent className="p-4 flex items-center justify-center flex-1">
            {item.media.length > 0 && (
              <CardCarousel
                carouselContentSyle={{ height: "400px", width: "100%" }}
                works={item}
              />
            )}
          </CardContent>
          <CardHeader>
            <CardTitle className="text-xl">
              <Link href={{ pathname: `/works/${item.id}` }}>{item.name}</Link>
            </CardTitle>
            <CardDescription>
              <p className="text-lg text-justify py-4">{item.description}</p>
              <div className="flex gap-2 flex-wrap">
                {item.techStack.map((tech) => (
                  <TechBadge tech={tech} key={tech.id} />
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <HoverCard>
              <HoverCardTrigger target="_blank" href={item.deployment}>
                <Link2Icon width={20} height={20} />
              </HoverCardTrigger>
              <HoverCardContent className="flex-1">
                {item.media.length > 0 ? (
                  <div>
                    <CardCarousel
                      carouselContentSyle={{ height: "200px", width: "300px" }}
                      works={item}
                    />
                  </div>
                ) : (
                  <a
                    href={item.deployment}
                    className="hover:underline"
                    target="_blank"
                  >
                    {item.deployment}
                  </a>
                )}
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger target="_blank" href={item.github}>
                <GitHubLogoIcon width={30} height={30} />
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <GitHubLogoIcon width={35} height={35} />
                    <a className="underline" href={item.github} target="_blank">
                      @{item.github.split("/").at(-1)}
                    </a>
                  </div>
                  <TextEllipsis maxLine="4" text={item.description} />
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Works;

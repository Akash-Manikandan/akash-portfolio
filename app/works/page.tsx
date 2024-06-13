import Image from "next/image";

import prisma from "@/lib/database";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";

import TextEllipsis from "@/components/custom/TextEllipsis";
import Link from "next/link";

const getData = async () => {
  const data = await prisma.works.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      techStack: {
        select: {
          id: true,
          name: true,
        },
      },
      media: {
        where: {
          isThumbnail: true,
        },
        take: 1,
      },
    },
  });
  return data;
};
const Works = async () => {
  const works = await getData();

  return (
    <div className="flex flex-col gap-2 mx-40">
      {works.map((item) => (
        <Card key={item.id} className="m-6">
          <CardContent className="p-4 flex items-center justify-center">
            {item.media.map((media) => (
              <Image
                src={media.url}
                width={1280}
                height={800}
                quality={100}
                alt={media.description || ""}
                key={media.id}
                className="grayscale-[60%] hover:grayscale-0"
              />
            ))}
          </CardContent>
          <CardHeader>
            <CardTitle className="text-xl">
              <Link href={`/works/${item.id}`}>{item.name}</Link>
            </CardTitle>
            <CardDescription>
              <p className="text-lg text-justify py-4">{item.description}</p>
              {item.techStack.map((tech) => (
                <Badge
                  variant="secondary"
                  className="mt-2 mx-2 first:ml-0"
                  key={tech.id}
                >
                  {tech.name}
                </Badge>
              ))}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <HoverCard>
              <HoverCardTrigger target="_blank" href={item.deployment}>
                <Link2Icon width={20} height={20} />
              </HoverCardTrigger>
              <HoverCardContent className="w-[600px] ml-12 p-2">
                {item.media.length > 0 ? (
                  <div>
                    <Carousel>
                      <CarouselContent>
                        {item.media.map((media) => (
                          <CarouselItem
                            key={media.id}
                            className="flex items-center"
                          >
                            <Image
                              src={media.url}
                              alt="Image"
                              width={700}
                              height={550}
                              className="rounded-md object-cover grayscale-[40%] hover:grayscale-0"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
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

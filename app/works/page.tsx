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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import TextEllipsis from "@/components/custom/TextEllipsis";

const getData = async () => {
  const data = await prisma.works.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      media: true,
      techStack: true,
    },
  });
  return data;
};

const Works = async () => {
  const works = await getData();

  return (
    <div className="flex flex-col gap-4">
      {works.map((item) => (
        <Card key={item.id} className="m-6">
          <CardHeader>
            <CardTitle className="text-xl">{item.name}</CardTitle>
            <CardDescription>
              {item.techStack.map((tech) => (
                <Badge variant="secondary" className="mt-2 mx-2" key={tech.id}>
                  {tech.name}
                </Badge>
              ))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{item.description}</p>
          </CardContent>
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
                              className="rounded-md object-cover"
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
                    <Avatar>
                      <AvatarImage
                        alt="GitHub"
                        src="https://yyhj2qom6nwl5skj.public.blob.vercel-storage.com/logos/GitHub.png"
                      />
                      <AvatarFallback>GH</AvatarFallback>
                    </Avatar>
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

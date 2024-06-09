import React from "react";
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

import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";

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
                <Badge variant="secondary" className="mt-2" key={tech.id}>
                  {tech.name}
                </Badge>
              ))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <HoverCard>
              <HoverCardTrigger target="_blank" href={item.deployment}>
                <Link2Icon width={20} height={20} />
              </HoverCardTrigger>
              <HoverCardContent>Link</HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger target="_blank" href={item.github}>
                <GitHubLogoIcon width={30} height={30} />
              </HoverCardTrigger>
              <HoverCardContent>
                GitHub is a developer platform that allows developers to create,
                store, manage and share their code. It uses Git software,
                providing the distributed version control of Git plus access
                control, bug tracking, software feature requests, task
                management, continuous integration, and wikis for every project.
              </HoverCardContent>
            </HoverCard>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Works;

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Lora } from "next/font/google";
import prisma from "@/lib/database";
import { cn, getInitialsFromGitHub, getLastUrlSegment } from "@/lib/utils";
import TechBadge from "@/components/custom/TechBadge";
import WorkCarousel from "@/components/custom/WorkCarousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigators from "./Navigators";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import TextEllipsis from "@/components/custom/TextEllipsis";
import TooltipWrapper from "@/components/custom/TooltipWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

type WithNavigation<T> = T & {
  next: {
    id: string;
    name: string;
  } | null;
  prev: {
    id: string;
    name: string;
  } | null;
};

export const metadata: Metadata = {
  title: "Akash M - Works",
  description: "Portfolio of Akash M",
};
export const revalidate = 10800;

const getWork = async (id: string) => {
  try {
    const rawData = await prisma.works.findUnique({
      where: {
        id,
      },
      include: {
        developers: {
          select: {
            id: true,
            name: true,
            github: true,
            about: true,
            images: true,
            PersonalInfo: {
              select: {
                me: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        media: {
          orderBy: {
            createdAt: "asc",
          },
        },
        techStack: true,
      },
    });
    if (!rawData) return [];
    const data: WithNavigation<typeof rawData> = {
      ...rawData,
      next: null,
      prev: null,
    };
    const next = prisma.works.findFirst({
      where: {
        order: {
          gt: rawData.order,
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    const prev = prisma.works.findFirst({
      where: {
        order: {
          lt: rawData.order,
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        order: "desc",
      },
    });
    await Promise.all([next, prev]).then(([next, prev]) => {
      data.next = next;
      data.prev = prev;
    });
    return [data];
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function WorkPage({ params }: { params: { id: string } }) {
  const data = await getWork(params.id);

  const handleNavigation = async (id: string | undefined) => {
    "use server";
    if (id) redirect(`/works/${id}`);
  };

  return (
    <>
      {data.map((item) => (
        <div key={item.id} className="pt-12 px-8">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4">
              <h1 className={cn(lora.className, "font-bold text-4xl")}>
                {item.name}
              </h1>
              <TooltipWrapper
                content={item.deployment}
                asChild={true}
                className="w-fit"
              >
                <a
                  className="flex items-center"
                  target="_blank"
                  href={item.deployment}
                >
                  <Link2Icon width={20} height={20} />
                </a>
              </TooltipWrapper>
            </div>
            <h5 className="text-2xl">{item.tagLine}</h5>
          </div>
          <Separator orientation="horizontal" className="my-10" />
          <div className="flex gap-8 max-md:flex-col">
            <div className="flex-1 flex gap-16 flex-col">
              <div className="flex flex-col gap-4">
                {item.description.map((description, index) => (
                  <p key={index}>{description}</p>
                ))}
              </div>
              {item.contribution.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-medium uppercase max-md:capitalize">
                    My Contribution
                  </h2>
                  <div className="flex flex-col gap-4">
                    {item.contribution.map((contribution, index) => (
                      <p key={index}>{contribution}</p>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium uppercase max-md:capitalize">
                  Tech Stack
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {item.techStack.map((tech) => (
                    <TechBadge key={tech.id} tech={tech} />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[340px] h-fit max-md:w-auto flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium uppercase max-md:capitalize">
                  Role
                </h2>
                <p>{item.role}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium uppercase max-md:capitalize">
                  Company
                </h2>
                <p>{item.company}</p>
              </div>
              {item.timeLine && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-medium uppercase max-md:capitalize">
                    Timeline
                  </h2>
                  <p>{item.timeLine}</p>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-1">
                  <h2 className="text-xl font-medium uppercase max-md:capitalize">
                    Developer{item.developers.length > 1 && "s"}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.developers.map((developer) => (
                    <HoverCard key={developer.id}>
                      <HoverCardTrigger target="_blank" href={developer.github}>
                        <Badge
                          variant={
                            developer.PersonalInfo?.me ? "default" : "outline"
                          }
                          className="mt-2"
                        >
                          <p className="font-normal">{developer.name}</p>
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-3 items-center">
                            {developer.images.length > 0 ? (
                              <Avatar>
                                <AvatarImage
                                  src={developer.images.pop()}
                                  alt={getInitialsFromGitHub(developer.github)}
                                />
                                <AvatarFallback>
                                  {getInitialsFromGitHub(developer.github)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <GitHubLogoIcon width={35} height={35} />
                            )}
                            <a
                              className="underline"
                              href={item.github}
                              target="_blank"
                            >
                              @{getLastUrlSegment(developer.github)}
                            </a>
                          </div>
                          <TooltipWrapper content={developer.about}>
                            <TextEllipsis maxLine="5" text={developer.about} />
                          </TooltipWrapper>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
              {item.github && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-medium uppercase max-md:capitalize">
                    {item.additionalRepo ? "Repositories" : "Repository"}
                  </h2>
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex gap-3 items-center">
                      <GitHubLogoIcon width={35} height={35} />
                      <TooltipWrapper
                        content={
                          item.additionalRepo
                            ? "Frontend Repository"
                            : `${item.name}`
                        }
                        className="w-fit"
                      >
                        <a
                          className="underline"
                          href={item.github}
                          target="_blank"
                        >
                          @{getLastUrlSegment(item.github)}
                        </a>
                      </TooltipWrapper>
                    </div>
                    {item.additionalRepo && (
                      <div className="flex gap-3 items-center">
                        <GitHubLogoIcon width={35} height={35} />
                        <TooltipWrapper
                          content={"Backend Repository"}
                          className="w-fit"
                        >
                          <a
                            className="underline"
                            href={item.additionalRepo}
                            target="_blank"
                          >
                            @{getLastUrlSegment(item.additionalRepo)}
                          </a>
                        </TooltipWrapper>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8">
            <h2 className="text-2xl font-medium uppercase max-md:capitalize">
              Images
            </h2>
            <div className="flex flex-1 justify-center mx-20 my-10 max-md:mx-2 max-md:my-8">
              <WorkCarousel data={item.media} />
            </div>
          </div>
          <div className="flex justify-between pb-6">
            <TooltipWrapper
              asChild={true}
              content={item.prev?.name ?? "Previous action nat available"}
              className="w-fit"
            >
              <div>
                <Navigators
                  id={item.prev?.id}
                  type="prev"
                  handleNavigation={handleNavigation}
                />
              </div>
            </TooltipWrapper>
            <TooltipWrapper
              asChild={true}
              content={item.next?.name ?? "Next action nat available"}
              className="w-fit"
            >
              <div>
                <Navigators
                  id={item.next?.id}
                  type="next"
                  handleNavigation={handleNavigation}
                />
              </div>
            </TooltipWrapper>
          </div>
        </div>
      ))}
    </>
  );
}

export default WorkPage;

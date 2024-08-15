import { Metadata } from 'next';
import { redirect } from 'next/navigation'
import { Lora } from "next/font/google";
import prisma from "@/lib/database";
import { cn } from "@/lib/utils";
import TechBadge from "@/components/custom/TechBadge";
import WorkCarousel from "@/components/custom/WorkCarousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigators from './Navigators';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import TextEllipsis from '@/components/custom/TextEllipsis';
import TooltipWrapper from '@/components/custom/TooltipWrapper';

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

type WithNavigation<T> = T & {
  next: string | undefined;
  prev: string | undefined;
};

export const metadata: Metadata = {
  title: "Akash M - Works",
  description: "Portfolio of Akash M",
};

const getWork = async (id: string) => {
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
          PersonalInfo: {
            select: {
              me: true,
            }
          }
        },
        orderBy: {
          createdAt: "asc",
        }
      },
      media: true,
      techStack: true,
    },
  });
  if (!rawData) return [];

  const data: WithNavigation<typeof rawData> = {
    ...rawData,
    next: undefined,
    prev: undefined,
  }

  const next = await prisma.works.findFirst({
    where: {
      order: {
        gt: rawData.order,
      },
    },
    select: {
      id: true,
    },
    orderBy: {
      order: "asc",
    }
  });

  data.next = next?.id;
  const prev = await prisma.works.findFirst({
    where: {
      order: {
        lt: rawData.order,
      },
    },
    select: {
      id: true,
    },
    orderBy: {
      order: "desc",
    }
  });
  data.prev = prev?.id;
  return [data];
};

async function WorkPage({ params }: { params: { id: string } }) {
  const data = await getWork(params.id);

  const handleNavigation = async (id: string | undefined) => {
    'use server';
    if (id) redirect(`/works/${id}`);
  }

  return (
    <>
      {data.map((item) => (
        <div key={item.id} className="pt-12 px-8">
          <div className="flex gap-4 flex-col">
            <h1 className={cn(lora.className, "font-bold text-4xl")}>{item.name}</h1>
            <h5 className="text-2xl">{item.tagLine}</h5>
          </div>
          <Separator orientation="horizontal" className="my-10" />
          <div className="flex gap-8 max-md:flex-col">
            <div className="flex-1 flex gap-4 flex-col">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Description</h2>
                <p>{item.description}</p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">Tech Stack</h2>
                <div className="flex gap-2 flex-wrap">
                  {item.techStack.map((tech) => (
                    <TechBadge key={tech.id} tech={tech} />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[340px] h-fit max-md:w-auto flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl uppercase max-md:capitalize">Role</h2>
                <p>{item.role}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl uppercase max-md:capitalize">Company</h2>
                <p>{item.company}</p>
              </div>
              {item.timeLine && (<div className="flex flex-col gap-2">
                <h2 className="text-xl uppercase max-md:capitalize">Timeline</h2>
                <p>{item.timeLine}</p>
              </div>)}
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-1">
                  <h2 className="text-xl uppercase max-md:capitalize">Developer</h2><span className="text-xl">(s)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.developers.map((developer) => (
                    <HoverCard key={developer.id}>
                      <HoverCardTrigger target="_blank" href={developer.github}>
                        <Badge variant={developer.PersonalInfo?.me ? "default" : "outline"} className="mt-2">{developer.name}</Badge>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-3 items-center">
                            <GitHubLogoIcon width={35} height={35} />
                            <a className="underline" href={item.github} target="_blank">
                              @{developer.github.split("/").at(-1)}
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
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8">
            <h2 className="text-2xl">Images</h2>
            <div className="flex flex-1 justify-center mx-20 my-10 max-md:mx-2 max-md:my-8">
              <WorkCarousel data={item.media} />
            </div>
          </div>
          <div className="flex justify-between pb-6">
            <Navigators id={item.prev} type='prev' handleNavigation={handleNavigation} />
            <Navigators id={item.next} type='next' handleNavigation={handleNavigation} />
          </div>
        </div>
      ))}
    </>
  );
}

export default WorkPage;

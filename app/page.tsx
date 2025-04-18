import React, { type JSX } from "react";
import Link from "next/link";
import { Alex_Brush, Nunito } from "next/font/google";
import prisma from "@/lib/database";
import { ArrowRightIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Markdown from "@/components/custom/Markdown";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ResizeScroll from "@/components/custom/home/ResizeScroll";
import TooltipWrapper from "@/components/custom/TooltipWrapper";

const alexBrush = Alex_Brush({ subsets: ["latin"], weight: ["400"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500"] });

export const revalidate = 10800;

const getData = async () => {
  try {
    const data = await prisma.personalInfo.findFirst({
      where: {
        me: true,
      },
      select: {
        id: true,
        about: true,
        goals: true,
        languageStatus: {
          select: {
            category: {
              select: {
                name: true,
                description: true,
                id: true,
              },
            },
            lang: true,
            id: true,
            images: true,
            name: true,
          },
          orderBy: {
            percent: "desc",
          },
        },
      },
    });
    if (data) {
      const groupedLanguageStatus = data.languageStatus.reduce((acc, item) => {
        const categoryName = item.category.name;
        if (!acc[categoryName]) {
          acc[categoryName] = {
            category: item.category,
            data: [],
          };
        }
        acc[categoryName].data.push({
          id: item.id,
          name: item.name,
          lang: item.lang,
          images: item.images,
        });
        return acc;
      }, {} as Record<string, { category: (typeof data.languageStatus)[0]["category"]; data: Array<{ id: string; name: string; lang: string; images: string[] }> }>);

      const sortedLanguageStatus = Object.values(groupedLanguageStatus).sort(
        (a, b) => b.data.length - a.data.length
      );

      return { ...data, languageStatus: sortedLanguageStatus };
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function Home() {
  const personalInfo = await getData();
  const markdown = personalInfo?.about ?? "";
  const MarkDownComponent: JSX.Element = await Markdown({
    source: markdown,
    className: "w-3/4 max-sm:w-auto",
  });
  return (
    <>
      <section className="h-[90vh] mx-8 flex flex-col justify-center">
        <h1 className={cn(nunito.className, "text-6xl max-sm:text-4xl")}>
          Hi, I&apos;m{" "}
          <span className={cn(alexBrush.className, "underline")}>Akash</span>
        </h1>
        {personalInfo && (
          <div className="my-6 text-4xl max-md:text-2xl leading-relaxed">
            {MarkDownComponent}
          </div>
        )}
        <Button
          className="w-fit text-xl max-md:text-lg font-light mt-2 pl-0 flex items-center gap-2 justify-center hover:no-underline hover:scale-110"
          variant="link"
        >
          <Link href="/about">Know more about me</Link>{" "}
          <ArrowRightIcon className="self-end" />
        </Button>
      </section>
      {personalInfo && (
        <>
          <section className="mb-6">
            <div className="flex flex-col gap-4 mx-8 max-sm:mx-2 max-md:mx-4">
              <Card>
                <CardHeader className="text-3xl max-sm:text-xl font-medium border-b px-6 py-4">
                  Goals
                </CardHeader>
                <CardContent className="py-4">
                  <Table>
                    <TableBody>
                      {personalInfo.goals.map((goal: string, index: number) => (
                        <TableRow key={index}>
                          <TableCell
                            className={cn(
                              nunito.className,
                              "text-xl max-sm:text-lg font-medium"
                            )}
                          >
                            {goal}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </section>
          <section className="mx-8 mt-20 mb-8 max-sm:mx-2">
            <div className="flex items-center gap-4 max-md:gap-2 my-8 mb-16 max-sm:mx-2">
              <h2 className={cn("text-3xl max-sm:text-xl font-medium")}>
                Technical Skills
              </h2>
              <TooltipWrapper
                content="Click on each section to see detailed discription"
                className="w-fit"
              >
                <InfoCircledIcon className="w-4 h-4" />
              </TooltipWrapper>
            </div>
            <ResizeScroll personalInfo={personalInfo} />
          </section>
        </>
      )}
    </>
  );
}

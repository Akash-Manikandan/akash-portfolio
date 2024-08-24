import prisma from "@/lib/database";
import { cn } from "@/lib/utils";
import { Alex_Brush, Nunito } from "next/font/google";
import Markdown from "@/components/custom/Markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const alexBrush = Alex_Brush({ subsets: ["latin"], weight: ["400"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500"] });

const getData = async () => {
  try {
    const data = await prisma.personalInfo.findFirst({
      where: {
        me: true,
      },
      select: {
        about: true,
        goals: true,
      },
    });
    return data ? data : null;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  const personalInfo = await getData();
  const markdown = personalInfo?.about ?? '';
  const MarkDownComponent: JSX.Element = await Markdown({ source: markdown });
  return (
    <>
      <section className="h-[90vh] mx-8 flex flex-col justify-center">
        <h1 className={cn(nunito.className, "text-6xl max-sm:text-4xl")}>Hi, I'm <span className={cn(alexBrush.className, 'underline')}>Akash</span></h1>
        {personalInfo && (
          <div className="my-6 text-4xl max-md:text-2xl leading-relaxed">
            {MarkDownComponent}
          </div>
        )}
        <Button className="w-fit text-xl max-md:text-lg font-light mt-2 pl-0 flex items-center gap-2 justify-center hover:no-underline hover:scale-110" variant="link">
          <Link href="/about">Know more about me</Link> <ArrowRightIcon className="self-end" />
        </Button>
      </section>
      {personalInfo && <section className="mb-6">
        <div className="flex flex-col gap-4 mx-8 max-sm:mx-2 max-md:mx-4">
          <Card>
            <CardHeader className="text-3xl max-sm:text-xl font-medium border-b">Goals</CardHeader>
            <CardContent className="py-4">
              <Table>
                <TableBody>
                  {personalInfo.goals.map((goal, index) => (
                    <TableRow key={index}>
                      <TableCell className={cn(nunito.className, "text-xl max-sm:text-lg font-medium")}>{goal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>}
    </>
  );
}

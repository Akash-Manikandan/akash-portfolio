import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

type Education = {
    id: string;
    name: string;
    degree: string;
    location: string;
    description: string;
    marks: string;
    duration: string;
};


const EducationCard = ({ education, className }: { education: Education, className: string }) => {
    return (
        <Card className={cn(className)}>
            <CardHeader className="flex flex-row justify-between gap-7 max-sm:flex-col">
                <div className={cn(lora.className, "flex flex-col gap-4")}>
                    <h3 className="text-2xl font-semibold">{education.name}</h3>
                    <h4>{education.degree}</h4>
                </div>
                <div className="flex flex-col items-end gap-2 max-sm:flex-row max-sm:justify-between">
                    <p className="whitespace-nowrap">{education.duration}</p>
                    <p className="whitespace-nowrap">{education.marks}</p>
                </div>
            </CardHeader>
            <CardContent className="flex">
                <div className="flex flex-col gap-5">
                    <p>{education.description}</p>
                    <p>{education.location}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default EducationCard;
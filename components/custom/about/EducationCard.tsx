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
            <CardHeader className={cn(lora.className)}>
                <h3 className="text-2xl font-semibold">{education.name}</h3>
                <h4>{education.degree}</h4>
            </CardHeader>
            <CardContent className="flex justify-between gap-7">
                <div className="flex flex-col gap-2">
                    <p>{education.description}</p>
                    <p>{education.location}</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="whitespace-nowrap">{education.duration}</p>
                    <p className="whitespace-nowrap">{education.marks}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default EducationCard;
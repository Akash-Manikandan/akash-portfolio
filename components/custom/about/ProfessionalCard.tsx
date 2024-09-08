import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CollapsibleList from "@/components/custom/CollapsibleList";
import TechBadge from "@/components/custom/TechBadge";
import { cn } from "@/lib/utils";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

type ProfessionalCardProps = {
  id: string;
  location: string;
  description: string;
  companyName: string;
  duration: string;
  position: {
    id: string;
    name: string;
    duration: string;
    description: string;
    skills: string[];
    techStack: {
      id: number;
      name: string;
    }[];
  }[];
};

function getUniqueTechStack(professionalCard: ProfessionalCardProps) {
  const techStackSet = new Set<string>();

  professionalCard.position.forEach((position) => {
    position.techStack.forEach((tech) => {
      techStackSet.add(tech.name);
    });
  });

  return Array.from(techStackSet);
}

const ProfessionalCard = ({
  experience,
  className = "",
}: {
  experience: ProfessionalCardProps;
  className: string;
}) => {
  const uniqueTechStack = getUniqueTechStack(experience);

  return (
    <Card className={cn(className)}>
      <CardHeader
        className={"flex justify-between flex-row gap-2 max-sm:flex-col"}
      >
        <h3 className={cn(lora.className, "text-2xl font-semibold")}>
          {experience.companyName}
        </h3>
        <p className="whitespace-nowrap font-semibold">{experience.duration}</p>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-col gap-4">
          <p>{experience.description}</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {uniqueTechStack.map((tech) => (
              <TechBadge key={tech} tech={{ id: 0, name: tech }} />
            ))}
          </div>
        </div>
        {experience.position.length > 0 && (
          <CollapsibleList list={experience.position} />
        )}
        <div className="flex pt-4">
          <p>{experience.location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalCard;

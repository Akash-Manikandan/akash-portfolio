import { Badge } from "@/components/ui/badge";

type TechStack = {
    id: number;
    name: string;
}
const TechBadge = ({ tech }: { tech: TechStack }) => {
    return (
        <Badge
            variant="secondary"
            className="mt-2"
            key={tech.id}
        >
            <p className="font-normal">{tech.name}</p>
        </Badge>
    );
}

export default TechBadge;
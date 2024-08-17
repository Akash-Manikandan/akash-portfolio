"use client"

import { memo, useState } from "react"
import { Encode_Sans_SC, Fredoka } from "next/font/google"

import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Toggle } from "@/components/ui/toggle"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator";
import TechBadge from "@/components/custom/TechBadge"

type Position = {
    id: string;
    name: string;
    duration: string;
    description: string;
    skills: string[];
    techStack: {
        id: number;
        name: string;
    }[];
}

const encodeSansSC = Encode_Sans_SC({ subsets: ["latin"], weight: ["400", "700"] });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400"] });

const CollapsibleCard = ({ position }: { position: Position }) => {
    return (
        <div className="px-4 py-3 flex flex-col gap-6">
            <div className={cn(encodeSansSC.className, "flex justify-between max-sm:flex-col")}>
                <h3 className="text-lg font-semibold">{position.name}</h3>
                <p className="w-40 text-end max-sm:text-left max-sm:mt-4">{position.duration}</p>
            </div>
            <div className={fredoka.className}>
                <p>{position.description}</p>
                <div className="flex gap-2 flex-wrap mt-2">{position.techStack.map((tech) => (<TechBadge key={tech.id} tech={tech} />))}</div>
            </div>
        </div>
    )
}

const CollapsibleList = ({ list }: { list: Position[] }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className={cn(fredoka.className, "space-y-2 pt-6")}
        >
            <div className="flex items-center justify-between space-x-4">
                <h4 className={cn(encodeSansSC.className, "text-xl font-semibold")}>
                    Roles
                </h4>
                <CollapsibleTrigger disabled={list.length === 1} asChild>
                    <div>
                        <Toggle aria-label="Toggle" disabled={list.length === 1} variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronsUpDown className="h-4 w-4" />
                        </Toggle>
                    </div>
                </CollapsibleTrigger>
            </div>
            {list.length > 0 && (<CollapsibleCard position={list[0]} />)}
            <CollapsibleContent>
                {list.slice(1).map((position) => (
                    <div key={position.id}>
                        <Separator orientation="horizontal" className="my-4" />
                        <CollapsibleCard position={position} />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default memo(CollapsibleList);
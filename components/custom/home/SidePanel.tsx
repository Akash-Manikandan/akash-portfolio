import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LogoMarkdown from "../LogoMarkdown";
import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "@/components/ui/separator";

type SidePanelProps = {
    id: string;
    name: string;
    lang: string;
    images: string[];
};
const SidePanel = ({ content }: {
    content: SidePanelProps[]
}) => {
    return (
        <ScrollArea className="mt-3">
            <div className="pr-6">
                {content.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <div className={cn(index % 2 === 0 ? "flex-row" : "flex-row-reverse", "flex gap-3 justify-between")}>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16">
                                    <LogoMarkdown tooltip={false} markdown={item.images.at(0) ?? ""} content={item.lang} />
                                </div>
                                <h5>{item.name}</h5>
                            </div>
                            <p className={cn(index % 2 === 0 ? "text-right" : "text-left")}>{item.lang}</p>
                        </div>
                        {index !== content.length - 1 && <Separator className="my-12" />}
                    </React.Fragment>
                ))}
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
}

export default SidePanel;
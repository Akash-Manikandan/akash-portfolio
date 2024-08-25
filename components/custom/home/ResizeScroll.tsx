import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react"
import LogoMarkdown from "../LogoMarkdown";
import { ScrollBar } from "@/components/ui/scroll-area";

type PersonalInfo = {
    id: string;
    goals: string[];
    about: string;
} & {
    languageStatus: {
        category: string;
        data: {
            id: string;
            name: string;
            lang: string;
            images: string[];
        }[];
    }[];
}

const ResizeScroll = ({ personalInfo, lastIndex }: { personalInfo: PersonalInfo, lastIndex: number }) => {
    const MIN_SIZE = 3;

    return (
        <ResizablePanelGroup autoSaveId="minMax" direction="horizontal" className="my-8" >
            {personalInfo.languageStatus.map((language, index) => (
                <React.Fragment key={language.category + index}>
                    <ResizablePanel defaultSize={(index !== lastIndex) ? MIN_SIZE : 100 - (MIN_SIZE * lastIndex)} order={index + 1}>
                        <div className="flex items-center px-3">
                            <h3 className="write-btt">{language.category}</h3>
                            <ScrollArea>
                                <div className="ml-3 mb-3 flex justify-center gap-4">
                                    {language.data.map((data) => (
                                        <div key={data.id} className="flex flex-col items-center gap-2">
                                            <div className="w-16 h-16">
                                                <LogoMarkdown markdown={data.images.pop() ?? ""} content={data.lang} />
                                            </div>
                                            <p className="whitespace-nowrap">{data.name}</p>
                                        </div>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    </ResizablePanel>
                    {index !== lastIndex && <ResizableHandle withHandle />}
                </React.Fragment>
            ))}
        </ResizablePanelGroup>
    )
}

export default ResizeScroll
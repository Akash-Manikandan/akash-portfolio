import React from "react"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LogoMarkdown from "../LogoMarkdown";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import SidePanel from "./SidePanel";

type PersonalInfo = {
    id: string;
    goals: string[];
    about: string;
    languageStatus: {
        category: {
            id: string;
            name: string;
            description: string;
        },
        data: {
            id: string;
            name: string;
            lang: string;
            images: string[];
        }[];
    }[];
}

const SPLIT = 3;

function splitLanguageStatusIntoPairs(personalInfo: PersonalInfo) {
    const { languageStatus, ...rest } = personalInfo;

    const splitLanguageStatus = languageStatus.reduce((result, item, index) => {
        if (index % SPLIT === 0) {
            result.push([item]);
        } else {
            result[result.length - 1].push(item);
        }
        return result;
    }, [] as typeof languageStatus[]);

    return {
        ...rest,
        languageStatus: splitLanguageStatus
    };
}



const ResizeScroll = ({ personalInfo }: { personalInfo: PersonalInfo }) => {

    const splitLanguageStatus = splitLanguageStatusIntoPairs(personalInfo);

    const { languageStatus } = splitLanguageStatus;

    return (
        <>
            {languageStatus.map((languages, ind) => (
                <ResizablePanelGroup key={ind} autoSaveId="minMax" direction="horizontal" className="my-8 max-md:px-4" >
                    {languages.map((language, index) => (
                        <Sheet key={index}>
                            <ResizablePanel className="min-w-[45px]" defaultSize={100 / SPLIT} order={index + 1}>
                                <div className="flex items-center px-3">
                                    <div className="flex flex-col-reverse items-center gap-2 w-8">
                                        <h3 className="write-btt">{language.category.name}</h3>
                                    </div>
                                    <ScrollArea>
                                        <div className="ml-3 mb-3 flex justify-center gap-4">
                                            {language.data.map((data) => (
                                                <React.Fragment key={data.id}>
                                                    <SheetTrigger asChild>
                                                        <div className="flex flex-col items-center gap-2 cursor-pointer">
                                                            <div className="w-16 h-16">
                                                                <LogoMarkdown markdown={data.images.at(0) ?? ""} content={data.lang} tooltip={false} />
                                                            </div>
                                                            <p className="whitespace-nowrap drop-shadow-md">{data.name}</p>
                                                        </div>
                                                    </SheetTrigger>
                                                    <SheetContent className="flex flex-col pr-0">
                                                        <SheetHeader className="pr-6">
                                                            <SheetTitle>{language.category.name}</SheetTitle>
                                                            <SheetDescription>
                                                                {language.category.description}
                                                            </SheetDescription>
                                                        </SheetHeader>
                                                        <SidePanel content={language.data} />
                                                    </SheetContent>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </div>
                            </ResizablePanel>
                            {(languages.length - 1 !== index) && <ResizableHandle withHandle />}
                        </Sheet>
                    ))}
                </ResizablePanelGroup>
            ))}
        </>
    )
}

export default ResizeScroll
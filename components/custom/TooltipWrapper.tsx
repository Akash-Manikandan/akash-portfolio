import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TooltipWrapper = ({ children, content, className, asChild = false }: Readonly<{
    children: React.ReactNode;
    content: string;
    className?: string;
    asChild?: boolean;
}>
) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={cn("w-80", className)}>
                    <p className="text-justify">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipWrapper
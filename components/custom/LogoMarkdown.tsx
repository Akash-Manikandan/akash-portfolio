import Image from "next/image";
import TooltipWrapper from "./TooltipWrapper";

const LogoMarkdown = ({ markdown, content }: { markdown: string, content: string }) => {
    const base64Svg = btoa(markdown);
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
    return (
        <TooltipWrapper content={content}>
            <Image priority={false} loading="lazy" src={dataUrl} alt="logo" width={64} height={64} />
        </TooltipWrapper>
    )
}

export default LogoMarkdown;
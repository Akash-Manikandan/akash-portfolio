import Image from "next/image";
import TooltipWrapper from "./TooltipWrapper";

const LogoMarkdown = ({ markdown, content, tooltip = true }: { markdown: string, content: string, tooltip?: boolean }) => {
    const base64Svg = Buffer.from(markdown).toString("base64");
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
    const ImageComponent = <Image priority={false} loading="lazy" src={dataUrl} alt="logo" className="drop-shadow-lg" width={64} height={64} />;
    if (!tooltip) {
        return ImageComponent
    }
    return (
        <TooltipWrapper content={content}>
            {ImageComponent}
        </TooltipWrapper>
    )
}

export default LogoMarkdown;
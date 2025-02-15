"use client"
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";

type WorkCarouselData = {
    id: number;
    description: string | null;
    url: string;
    isThumbnail: boolean;
    isImage: boolean;
    worksId: string;
    createdAt: Date;
}[]

const WorkCarousel = ({ data }: { data: WorkCarouselData }) => {
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true })
    )
    return (
        <Carousel
            className="flex"
            opts={{ loop: true }}
            plugins={[plugin.current]}
        >
            <CarouselContent >
                {data.map((media, index) => (
                    <CarouselItem key={media.id} className="h-[600px] max-md:h-80">
                        <div className="flex items-center pt-2 justify-center w-full h-full p-8 max-md:p-2">
                            <Image
                                priority={index === 0}
                                src={media.url}
                                width={1080}
                                loading="eager"
                                height={600}
                                quality={100}
                                alt={media.description || ""}
                                key={media.id}
                                className="object-contain w-full h-full drop-shadow-xl"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="max-md:left-5 max-md:-translate-y-1/2 max-md:top-auto max-md:-bottom-12 max-md:mt-4" />
            <CarouselNext className="max-md:left-16 max-md:-translate-y-1/2 max-md:top-auto max-md:-bottom-12 max-md:mt-4" />
        </Carousel>
    )
}


export default WorkCarousel
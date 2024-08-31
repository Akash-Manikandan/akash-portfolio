import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

type CardCarouselData = {
  media: {
    id: number;
    url: string;
    description: string | null;
  }[];
  techStack: {
    id: number;
    name: string;
  }[];
};

const CardCarousel = ({
  works,
  carouselContentSyle,
  id,
  lcp
}: {
  works: CardCarouselData;
  carouselContentSyle: React.CSSProperties;
  id: string;
  lcp: boolean;
}) => {
  return (
    <Carousel opts={{ loop: true }} className="flex-1">
      <CarouselContent style={carouselContentSyle} className="max-md:flex">
        {works.media.map((media, index) => (
          <CarouselItem
            key={media.id}
            className="flex items-center w-full h-auto pt-2"
          >
            <Link href={`/works/${id}`} aria-label={id} className="h-full w-full">
              <Image
                src={media.url}
                width={1080}
                loading={lcp ? "eager" : "lazy"}
                priority={lcp && index === 0}
                height={600}
                quality={100}
                alt={media.description || ""}
                key={media.id}
                className="object-contain p-4 w-full h-full drop-shadow-xl"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 z-40 max-lg:left-0 max-lg:-translate-y-1/2 max-lg:top-auto max-lg:mt-4" />
      <CarouselNext className="right-2 z-40 max-lg:left-10 max-lg:-translate-y-1/2 max-lg:top-auto max-lg:mt-4" />
    </Carousel>
  );
};

export default CardCarousel;

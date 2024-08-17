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
  id
}: {
  works: CardCarouselData;
  carouselContentSyle: React.CSSProperties;
  id: string;
}) => {
  return (
    <Carousel opts={{ loop: true }} className="flex-1">
      <CarouselContent style={carouselContentSyle} className="max-md:flex">
        {works.media.map((media) => (
          <CarouselItem
            key={media.id}
            className="flex items-center w-full h-auto pt-2"
          >
            <Link href={`/works/${id}`} className="h-full w-full">
              <Image
                src={media.url}
                width={1080}
                loading="lazy"
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
      <CarouselPrevious className="-left-16 max-md:left-0 max-md:-translate-y-1/2 max-md:top-auto max-md:mt-4" />
      <CarouselNext className="-right-16 max-md:left-10 max-md:-translate-y-1/2 max-md:top-auto max-md:mt-4" />
    </Carousel>
  );
};

export default CardCarousel;

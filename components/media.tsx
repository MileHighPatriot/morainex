import { asset, type PhotoName } from "@/lib/site";

type PhotoProps = {
  name: PhotoName;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function Photo({ name, alt, priority = false, sizes, className }: PhotoProps) {
  const src = (width: number) => asset(`/images/${name}-${width}.webp`);
  const hero = name === "hero";
  const srcSet = hero
    ? `${src(800)} 800w, ${src(1200)} 1200w, ${src(1600)} 1600w, ${src(2048)} 2048w`
    : `${src(240)} 240w, ${src(1200)} 1200w`;
  return (
    // Static export: next/image optimization is off, so a plain img with srcset does the job.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src(1200)}
      srcSet={srcSet}
      sizes={sizes ?? "(min-width: 900px) 50vw, 100vw"}
      alt={alt}
      width={hero ? 2048 : 1200}
      height={hero ? 1152 : 900}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

export const LIGHT_ZONES = ["soffit", "upper", "interior", "wash"] as const;

export function houseSrc(layer: string) {
  return {
    src: asset(`/images/house-${layer}-1280.webp`),
    srcSet: `${asset(`/images/house-${layer}-1280.webp`)} 1280w, ${asset(`/images/house-${layer}-2048.webp`)} 2048w`,
  };
}

import Image from "next/image";

function publicAssetSrc(src: string): string {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${prefix}${path}`;
}

type Props = {
  src: string;
  alt: string;
  caption?: string;
  href?: string;
};

export function ArticleCover({ src, alt, caption, href }: Props) {
  return (
    <figure className="mb-10 sm:mb-12">
      <div className="relative aspect-[21/9] w-full overflow-hidden border border-zinc-200/80 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Image
          src={publicAssetSrc(src)}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 768px) 42rem, 100vw"
          unoptimized
          priority
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-sans text-sm text-zinc-500 dark:text-zinc-400">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-500 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
            >
              {caption}
            </a>
          ) : (
            caption
          )}
        </figcaption>
      ) : null}
    </figure>
  );
}

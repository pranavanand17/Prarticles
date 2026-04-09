import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/70 bg-white transition-colors duration-200 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-read flex-col items-center gap-5 px-5 py-10 text-center sm:px-6">
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Pranav Anand
        </h1>
        <Image
          src="/pranav-pfp.png"
          alt="Pranav Anand profile image"
          width={170}
          height={170}
          className="h-[170px] w-[170px] rounded-full border border-zinc-200 object-cover shadow-sm dark:border-zinc-700"
          priority
        />
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Hello everynyun...I like writing bullshit...abot mostly whatever concerns me or has concerned me in the past. If you wanna read me rant about pointless stuff...feel free to go ham and I hope you enjoy :)
        </p>
      </div>
    </header>
  );
}

export const metadata = {
  title: "About Me",
  description: "A short intro by Pranav Anand.",
};

export default function AboutPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <section className="mx-auto max-w-read px-5 py-16 text-center sm:px-6 sm:py-20">
      <h1 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        Pranav Anand
      </h1>
      <img
        src={`${basePath}/images/pranav-pfp.png`}
        alt="Pranav Anand profile image"
        width={112}
        height={112}
        className="mx-auto mt-6 h-28 w-28 rounded-full border border-zinc-200 object-cover shadow-sm dark:border-zinc-700"
      />
      <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        Hello everynyun...I like writing bullshit...abot mostly whatever concerns me or has concerned me in the past. If you wanna read me rant about pointless stuff...feel free to go ham and I hope you enjoy :)
      </p>
    </section>
  );
}

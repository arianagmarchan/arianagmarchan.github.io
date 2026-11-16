import MetroHero from "@/components/ui/scroll-locked-video-hero";
import { HomeFolders } from "@/components/home-folders";
import { CopyEmail } from "@/components/copy-email";
import { profile } from "@/lib/content";

const stopColor = {
  sky: "bg-sky shadow-[0_0_14px_var(--sky)]",
  brand: "bg-brand shadow-[0_0_14px_var(--brand)]",
  rose: "bg-rose shadow-[0_0_14px_var(--rose)]",
  mint: "bg-[#5fe3b0] shadow-[0_0_14px_#5fe3b0]",
};

export default function Home() {
  return (
    <>
      <MetroHero
        videoSrc="/video/subway-city.mp4"
        title={`Hi, I'm ${profile.name}`}
        scrollHint="SCROLL"
        tagline={profile.heroTagline}
        signature={false}
        scrubDistance={2600}
        fontFamily="var(--font-display), system-ui, sans-serif"
        continueTo="about"
      />

      {/* About */}
      <section id="about" aria-labelledby="about-heading" className="city-glow scroll-mt-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-28 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="relative mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
            <div className="rounded-[1.6rem] bg-gradient-to-br from-brand via-rose to-sky p-[3px] shadow-[0_30px_80px_-30px_rgb(255_107_139/0.55)]">
              <img
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={960}
                height={1200}
                className="aspect-[4/5] w-full rounded-[1.45rem] object-cover"
              />
            </div>
            <span className="absolute -bottom-4 left-6 rounded-full border border-white/15 bg-[#0e1424] px-4 py-1.5 text-sm text-white/85">
              <span className="mr-2 inline-block size-2 rounded-full bg-[#5fe3b0] align-middle shadow-[0_0_10px_#5fe3b0]" />
              {profile.location} · USC
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <h2 id="about-heading" className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              <span className="text-neon">About me</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/85">
              {profile.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>

            <h3 className="mt-14 text-2xl font-bold tracking-tight">What I&apos;m up to</h3>
            <ol className="relative mt-6 space-y-6 pl-8">
              <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-0.5 rounded-full bg-gradient-to-b from-sky via-brand to-[#5fe3b0]" />
              {profile.now.map((stop) => (
                <li key={stop.what} className="relative">
                  <span aria-hidden="true" className={`absolute -left-8 top-1.5 size-4 rounded-full ring-4 ring-background ${stopColor[stop.color]}`} />
                  <p className="font-medium text-white">{stop.what}</p>
                  <p className="text-sm text-muted-foreground">{stop.where}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-brand">
              <span className="size-2 animate-pulse rounded-full bg-brand" />
              {profile.lookingFor}
            </p>
          </div>
        </div>
      </section>

      <div className="rail" />

      {/* Folders */}
      <section aria-labelledby="folders-heading" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(rgb(92 200 255 / 0.55) 1px, transparent 1.4px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(70% 60% at 50% 55%, black, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-8">
          <h2 id="folders-heading" className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            <span className="text-neon-cool">Open a folder</span>
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg text-muted-foreground">
            Each one holds a part of me. Click a folder to open it, then pick a file. The ··· button has shortcuts.
          </p>
          <div className="mt-16">
            <HomeFolders />
          </div>
        </div>
      </section>

      <div className="rail" />

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="city-glow scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-8">
          <h2 id="contact-heading" className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">Get in touch</h2>
          <p className="mt-5 max-w-[56ch] text-lg text-muted-foreground">
            Email is the fastest way to reach me. I&apos;m also happy to connect on LinkedIn.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="text-neon mt-10 inline-block break-words font-display text-[1.75rem] font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-6xl"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail email={profile.email} />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sky/50 px-5 py-2.5 text-sky transition-colors hover:bg-sky/10"
            >
              LinkedIn: {profile.linkedinLabel.replace("linkedin.com/in/", "")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

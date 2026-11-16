import { HomeFolders } from "@/components/home-folders";
import { CopyEmail } from "@/components/copy-email";
import { profile } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* About */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-14 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:pt-20">
        <img
          src={profile.photo.src}
          alt={profile.photo.alt}
          width={960}
          height={1200}
          className="aspect-[4/5] w-full max-w-sm rounded-sm object-cover md:max-w-none"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Hi, I&apos;m {profile.firstName}.</h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            {profile.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>

          <h2 className="mt-12 text-xl font-semibold tracking-tight">What I&apos;m up to</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {profile.now.map((item) => (
              <li key={item.what} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span>{item.what}</span>
                <span className="shrink-0 text-sm text-muted-foreground">{item.where}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted-foreground">{profile.lookingFor}</p>
        </div>
      </section>

      {/* Folders */}
      <section aria-labelledby="folders-heading" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-8">
          <h2 id="folders-heading" className="text-3xl font-semibold tracking-tight">Open a folder</h2>
          <p className="mt-3 max-w-[56ch] text-muted-foreground">
            Each one holds a part of me. Click a folder to open it, then pick a file. The ··· button has shortcuts.
          </p>
          <div className="mt-14">
            <HomeFolders />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-8 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-8">
          <h2 id="contact-heading" className="text-3xl font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-3 max-w-[56ch] text-muted-foreground">
            Email is the fastest way to reach me. I&apos;m also happy to connect on LinkedIn.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block break-words text-[1.6rem] font-semibold tracking-tight underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand sm:text-5xl"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CopyEmail email={profile.email} />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-lg underline decoration-border underline-offset-4 hover:decoration-brand">
              {profile.linkedinLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

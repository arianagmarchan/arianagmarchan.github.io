"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import type { Track } from "@/lib/content";

/** The Spotify mark: a green disc with three sound arcs. Links out to the song on Spotify. */
export function SpotifyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path d="M6.3 9.4c3.7-1.1 8-.8 11.3 1.1" stroke="#0b0d12" strokeWidth="1.9" strokeLinecap="round" fill="none" />
      <path d="M7 12.6c3-.8 6.4-.6 9 .9" stroke="#0b0d12" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M7.6 15.5c2.4-.6 4.9-.4 7 .6" stroke="#0b0d12" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Plays a track's 30-second preview. Only one snippet plays at a time across the page. */
function useSnippet(track: Track) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const audio = new Audio(track.preview);
    audio.preload = "none";
    audioRef.current = audio;
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => { setPlaying(false); setProgress(0); audio.currentTime = 0; };
    const onError = () => { setFailed(true); setPlaying(false); };
    const onOther = (e: Event) => { if ((e as CustomEvent).detail !== audio) audio.pause(); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);
    window.addEventListener("snippet-play", onOther);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
      window.removeEventListener("snippet-play", onOther);
      audioRef.current = null;
    };
  }, [track.preview]);

  const toggle = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      window.dispatchEvent(new CustomEvent("snippet-play", { detail: audio }));
      audio.volume = 0.8;
      audio.play().catch(() => setFailed(true));
    } else {
      audio.pause();
    }
  }, []);

  return { playing, progress, failed, toggle };
}

/**
 * A full turntable for the music page: the record spins and the tonearm swings
 * onto it while the preview plays.
 */
export function RecordPlayer({ track, record }: { track: Track; record: string }) {
  const { playing, progress, failed, toggle } = useSnippet(track);

  return (
    <div className="glow-card overflow-hidden p-5 sm:p-7">
      <div className="relative mx-auto aspect-[5/4] w-full max-w-md rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#1b2238,#0c1120_60%)] p-[6%]">
        {/* platter */}
        <div className="absolute left-[6%] top-[7.5%] aspect-square w-[68%] rounded-full bg-[#05070d] p-[2.5%] ring-1 ring-white/10">
          <img
            src={record}
            alt=""
            className="size-full select-none rounded-full"
            draggable={false}
            style={{ animation: "record-spin 1.8s linear infinite", animationPlayState: playing ? "running" : "paused" }}
          />
          {/* album art on the label */}
          <img
            src={track.cover}
            alt=""
            className="pointer-events-none absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2 select-none rounded-full object-cover"
            style={{ animation: "record-spin 1.8s linear infinite", animationPlayState: playing ? "running" : "paused" }}
          />
          <span className="absolute left-1/2 top-1/2 size-[3%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6dbe6]" />
        </div>

        {/* tonearm: pivots at the top right, swings onto the record while playing */}
        <svg
          viewBox="0 0 100 160"
          aria-hidden="true"
          className="absolute right-[6%] top-[5%] h-[78%] origin-[78%_12%] transition-transform duration-700 ease-out"
          style={{ transform: playing ? "rotate(24deg)" : "rotate(0deg)" }}
        >
          <circle cx="78" cy="19" r="14" fill="#2a3350" stroke="#5a6788" strokeWidth="2" />
          <circle cx="78" cy="19" r="5" fill="#d6dbe6" />
          <path d="M78 19 L74 118 L52 146" fill="none" stroke="#d6dbe6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="40" y="140" width="20" height="13" rx="3" transform="rotate(-38 50 146)" fill="#f4a940" />
        </svg>

        {/* controls on the plinth */}
        <div className="absolute bottom-[6%] right-[6%] flex items-center gap-3">
          <a
            href={track.spotify}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${track.title} by ${track.artist} on Spotify`}
            className="rounded-full transition-transform hover:scale-110"
          >
            <SpotifyMark className="size-9" />
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Pause the snippet" : `Play a snippet of ${track.title}`}
            className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand to-rose text-[#1a1104] transition-transform hover:scale-105"
          >
            {playing ? <Pause className="size-5" fill="currentColor" /> : <Play className="ml-0.5 size-5" fill="currentColor" />}
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <img src={track.cover} alt={`${track.album} cover`} className="size-14 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xl font-bold">{track.title}</p>
          <p className="truncate text-muted-foreground">{track.artist} · {track.album}</p>
        </div>
        <span className="shrink-0 rounded-full border border-rose/40 px-3 py-1 text-sm text-rose">{track.note}</span>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full rounded-full bg-gradient-to-r from-brand via-rose to-sky" style={{ width: `${progress * 100}%` }} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {failed ? "The snippet couldn't load here. " : "30-second preview. "}
        <a href={track.spotify} target="_blank" rel="noreferrer" className="text-[#1DB954] underline-offset-4 hover:underline">
          Listen to the whole song on Spotify
        </a>
      </p>
    </div>
  );
}

/**
 * The small version inside the sushi belt's pop-up: a play button and the Spotify mark.
 * While it plays, the record on the plate in the pop-up spins.
 */
export function PlateSnippet({ track }: { track: Track }) {
  const { playing, toggle } = useSnippet(track);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const img = ref.current?.closest("[data-dish-dialog]")?.querySelector<HTMLImageElement>("[data-dish-figure] img");
    if (!img) return;
    img.style.animation = "record-spin 1.8s linear infinite";
    img.style.animationPlayState = playing ? "running" : "paused";
  }, [playing]);

  return (
    <div ref={ref} className="mt-1 flex items-center justify-center gap-3 rounded-full border border-border bg-background/40 py-1.5 pl-1.5 pr-4 sm:justify-start">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause the snippet" : `Play a snippet of ${track.title}`}
        className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-rose text-[#1a1104]"
      >
        {playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="ml-0.5 size-4" fill="currentColor" />}
      </button>
      <span className="min-w-0 text-left text-sm leading-tight">
        <span className="block truncate font-medium text-foreground">{track.title}</span>
        <span className="block truncate text-muted-foreground">{track.artist}</span>
      </span>
      <a href={track.spotify} target="_blank" rel="noreferrer" aria-label={`Open ${track.title} on Spotify`} className="shrink-0">
        <SpotifyMark className="size-7" />
      </a>
    </div>
  );
}

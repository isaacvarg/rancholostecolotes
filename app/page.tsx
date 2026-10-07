import type { ReactNode } from "react";

type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: ReactNode;
};

const LINKS: SocialLink[] = [
  {
    label: "Instagram",
    handle: "@rancholostecolotes",
    href: "https://www.instagram.com/rancholostecolotes?utm_source=qr",
    icon: <InstagramIcon />,
  },
  {
    label: "TikTok",
    handle: "@chukaroolover",
    href: "https://www.tiktok.com/@chukaroolover?_r=1&_t=ZP-9AMVJeNoSVD",
    icon: <TikTokIcon />,
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sky-glow opacity-70 blur-3xl"
      />

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pt-16 pb-48">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-card bg-accent shadow-lg shadow-accent/20">
          <OwlMark className="h-16 w-16 text-card" />
        </div>

        <h1 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight">
          Rancho Los Tecolotes
        </h1>
        <p className="mt-2 text-center text-muted">
          Follow along with life on the farm
        </p>

        <ul className="mt-10 flex w-full flex-col gap-4">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group flex items-center gap-4 rounded-2xl border border-card-border bg-card px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {link.icon}
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-semibold">{link.label}</span>
                  <span className="text-sm text-muted">{link.handle}</span>
                </span>
                <ArrowIcon className="h-5 w-5 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </main>

      <Hills />
    </div>
  );
}

function Hills() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full"
    >
      <path
        d="M0 70 C 60 40, 120 45, 180 62 S 300 30, 400 55 V120 H0 Z"
        className="fill-hill-far"
      />
      <path
        d="M0 95 C 80 70, 150 78, 220 90 S 340 72, 400 85 V120 H0 Z"
        className="fill-hill-near"
      />
    </svg>
  );
}

function OwlMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M14 14 L22 22 Q32 18 42 22 L50 14 L50 38 Q50 56 32 58 Q14 56 14 38 Z"
        fill="currentColor"
      />
      <circle cx="24" cy="32" r="7" fill="var(--accent)" />
      <circle cx="40" cy="32" r="7" fill="var(--accent)" />
      <circle cx="24" cy="32" r="3" fill="currentColor" />
      <circle cx="40" cy="32" r="3" fill="currentColor" />
      <path d="M29 40 L32 45 L35 40 Z" fill="var(--accent)" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

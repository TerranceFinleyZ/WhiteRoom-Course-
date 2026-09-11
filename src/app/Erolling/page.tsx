import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Erolling",
};

export default function ErollingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/SlowClipwhiteroom.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_65%_at_76%_16%,rgba(220,38,38,0.22),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-white/10 sm:inset-6" />

      <div className="absolute left-1/2 top-24 z-10 w-[min(46rem,88vw)] -translate-x-1/2 text-center sm:top-10">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-white/70 sm:text-xs">
          Project Alpha
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[0.12em] text-white sm:text-4xl">
          Enrollment Room
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs text-white/70 sm:text-sm">
          Secure your place and begin the White Room program.
        </p>
      </div>

      <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 sm:left-6 sm:translate-x-0">
        <Link
          href="/"
          aria-label="Go to home page"
          className="inline-block transition-opacity hover:opacity-85"
        >
          <Image
            src="/Transeye.png"
            alt="Home"
            width={64}
            height={64}
            priority
            className="h-auto w-16 object-contain"
          />
        </Link>
      </div>

      <div className="absolute left-6 top-1/2 z-10 hidden w-[min(32rem,42vw)] -translate-y-1/2 rounded-[2rem] border border-white/25 bg-black/35 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:left-10 sm:block sm:p-5">
        <div className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/75">
          Application Preview
        </div>
        <video className="aspect-video rounded-[1.5rem] border border-dashed border-white/35 bg-white/8 object-cover" controls>
          <source src="/skyfall.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <a
        href="https://buy.stripe.com/3cIdRbaeneJBaTi538asg00"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 left-1/2 z-10 inline-flex h-12 -translate-x-1/2 items-center justify-center rounded-full border border-red-300/30 bg-red-600 px-10 text-sm font-semibold tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(220,38,38,0.4)] transition-all hover:scale-[1.02] hover:bg-red-500 sm:bottom-auto sm:left-auto sm:right-[calc(var(--spacing)*60)] sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
      >
        Enroll
      </a>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";

const REDIRECT_DELAY_SECONDS = 10;

export default function RedirectCountdown({ url }: { url: string }) {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_DELAY_SECONDS);

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.replace(url);
    }, REDIRECT_DELAY_SECONDS * 1000);

    const countdownTimer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => {
      window.clearTimeout(redirectTimer);
      window.clearInterval(countdownTimer);
    };
  }, [url]);

  const progress =
    ((REDIRECT_DELAY_SECONDS - secondsLeft) / REDIRECT_DELAY_SECONDS) * 100;
  const circumference = 2 * Math.PI * 46;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#dbe5de] bg-white p-8 text-center shadow-[0_18px_50px_rgba(23,33,27,0.08)] sm:p-10">
        <div className="relative mx-auto grid size-32 place-items-center">
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 112 112"
            aria-hidden="true"
          >
            <circle
              cx="56"
              cy="56"
              r="46"
              fill="none"
              stroke="#e6ece7"
              strokeWidth="7"
            />
            <circle
              cx="56"
              cy="56"
              r="46"
              fill="none"
              stroke="#17854b"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (progress / 100) * circumference
              }
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>
          <span className="text-4xl font-bold tabular-nums text-[#17211b]">
            {secondsLeft}
          </span>
        </div>

        <p className="mt-7 text-lg font-semibold text-[#17211b]">
          You&apos;re redirecting in {secondsLeft}{" "}
          {secondsLeft === 1 ? "second" : "seconds"}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#657269]">
          If not, click the URL below.
        </p>
        <a
          href={url}
          className="mt-5 block truncate rounded-xl border border-[#b8d6c0] bg-[#f3faf5] px-4 py-3 font-mono text-sm text-[#146c3d] underline decoration-[#8fc5a0] underline-offset-4 transition-colors hover:bg-[#eaf5ed]"
          title={url}
        >
          {url}
        </a>
      </section>
    </main>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [grecaptchaLoaded, setGrecaptchaLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "recaptcha-enterprise";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.onload = () => setGrecaptchaLoaded(true);
      document.body.appendChild(script);
    } else {
      setGrecaptchaLoaded(true);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url) return toast.error("Please enter a URL");

      if (!grecaptchaLoaded || !window.grecaptcha?.enterprise) {
        toast.error("reCAPTCHA is not loaded. Please try again later.");
        return;
      }
      setLoading(true);

      const token = await window.grecaptcha.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
        { action: "shortlink" },
      );
      try {
        const res = await fetch("/api/shorten", {
          method: "POST",
          body: JSON.stringify({ url, token }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.error) toast.error(data.error);
        setShortUrl(data.shortUrl);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to shorten URL",
        );
        console.error("Error shortening URL:", error);
      } finally {
        setLoading(false);
      }
    },
    [url],
  );

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        toast.success("Short URL copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy short URL");
        console.error("Error copying short URL:", error);
      });
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17211b]/20 backdrop-blur-sm">
          <div className="size-14 animate-spin rounded-full border-4 border-[#17854b] border-t-transparent" />
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-20">
        <div className="mb-14 text-center">
          <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Shorten Any URL
            <span className="block text-[#17854b]">Instantly</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#657269]">
            Transform long, unwieldy URLs into clean, shareable shortlinks in
            seconds. Perfect for social media, emails, and campaigns.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-[#dbe5de] bg-white p-5 shadow-[0_18px_50px_rgba(23,33,27,0.08)] sm:p-7">
            <label className="mb-3 block text-sm font-semibold text-[#334139]">
              Paste your long URL below
            </label>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 md:flex-row"
            >
              <div className="flex flex-1 items-center rounded-xl border border-[#cfdcd2] bg-[#fbfcfb] px-4 transition-all focus-within:border-[#17854b] focus-within:ring-4 focus-within:ring-[#17854b]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="mr-3 size-4 shrink-0 fill-[#7b887f]"
                >
                  <path d="M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z" />
                </svg>
                <input
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-very-long-url.com/goes/here"
                  className="flex-1 bg-transparent py-3.5 text-sm text-[#17211b] placeholder-[#8a958d] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-[#17854b] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#146c3d] active:scale-[0.98]"
              >
                Shorten
              </button>
            </form>

            {shortUrl && (
              <div className="mt-5 rounded-xl border border-[#b8d6c0] bg-[#f3faf5] p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#146c3d]">
                  Your shortlink is ready
                </p>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate font-mono text-sm text-[#146c3d] underline underline-offset-2 transition-colors hover:text-[#0d4a29]"
                  >
                    {shortUrl}
                  </a>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-[#17854b] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#146c3d]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="w-3.5 h-3.5 fill-white"
                      >
                        {/*Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                        <path d="M192 384L88.5 384C63.6 384 48.3 356.9 61.1 335.5L114 247.3C122.7 232.8 138.3 224 155.2 224L250.2 224C326.3 95.1 439.8 88.6 515.7 99.7C528.5 101.6 538.5 111.6 540.3 124.3C551.4 200.2 544.9 313.7 416 389.8L416 484.8C416 501.7 407.2 517.3 392.7 526L304.5 578.9C283.2 591.7 256 576.3 256 551.5L256 448C256 412.7 227.3 384 192 384L191.9 384zM464 224C464 197.5 442.5 176 416 176C389.5 176 368 197.5 368 224C368 250.5 389.5 272 416 272C442.5 272 464 250.5 464 224z" />
                      </svg>
                      Open
                    </a>
                    <button
                      onClick={handleCopy}
                      className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#b9c6bd] bg-white px-3 py-1.5 text-xs font-medium text-[#334139] transition-colors hover:bg-[#edf2ee]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="size-3.5 fill-[#334139]"
                      >
                        {/*Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                        <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-24">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-2xl font-bold">How it works</h2>
            <p className="text-sm text-[#657269]">
              Three simple steps to a cleaner link
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            <div className="group rounded-2xl border border-[#dbe5de] bg-white p-6 transition-colors hover:border-[#9acaaa]">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[#eaf5ed] transition-colors group-hover:bg-[#dcefe1]">
                <span className="text-lg font-bold text-[#17854b]">1</span>
              </div>
              <h3 className="mb-2 font-semibold">Paste your URL</h3>
              <p className="text-sm leading-relaxed text-[#657269]">
                Copy any long URL from your browser, an email, or a document and
                paste it into the input field above.
              </p>
            </div>
            <div className="group rounded-2xl border border-[#dbe5de] bg-white p-6 transition-colors hover:border-[#9acaaa]">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[#eaf5ed] transition-colors group-hover:bg-[#dcefe1]">
                <span className="text-lg font-bold text-[#17854b]">2</span>
              </div>
              <h3 className="mb-2 font-semibold">Generate shortlink</h3>
              <p className="text-sm leading-relaxed text-[#657269]">
                Click Shorten and our system instantly creates a compact, unique
                link mapped to your original URL.
              </p>
            </div>
            <div className="group rounded-2xl border border-[#dbe5de] bg-white p-6 transition-colors hover:border-[#9acaaa]">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[#eaf5ed] transition-colors group-hover:bg-[#dcefe1]">
                <span className="text-lg font-bold text-[#17854b]">3</span>
              </div>
              <h3 className="mb-2 font-semibold">Share anywhere</h3>
              <p className="text-sm leading-relaxed text-[#657269]">
                Copy and share your shortlink via social media, messages, or
                print. Visitors are redirected instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-4 text-center md:grid-cols-4">
          {[
            {
              label: "Links created",
              value: "10K+",
              color: "text-[#17854b]",
            },
            {
              label: "Redirects served",
              value: "500K+",
              color: "text-[#17854b]",
            },
            { label: "Uptime", value: "99.9%", color: "text-[#17854b]" },
            {
              label: "Avg. redirect speed",
              value: "<50ms",
              color: "text-[#17854b]",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border border-[#dbe5de] bg-white px-4 py-5"
            >
              <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
              <div className="mt-1 text-xs text-[#657269]">{label}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

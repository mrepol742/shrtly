import { NextResponse } from "next/server";
import { recaptcha } from "@/lib/recaptcha";
import { createHash, randomInt } from "crypto";
import { redis } from "@/lib/redis";

const LOCK_DOMAIN = process.env.LOCK_DOMAIN === "true";
const LOCK_DOMAIN_URL = process.env.LOCK_DOMAIN_URL || "";
const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const WAITLIST_DEDUPE_TTL_SECONDS = Number(
  process.env.WAITLIST_DEDUPE_TTL_SECONDS ?? 31_536_000,
);
const SLUG_LENGTH = Number(process.env.SLUG_LENGTH ?? 8);
const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Generates a random key of the specified length using the alphabet.
 *
 * @returns The generated key.
 */
function generateKey() {
  let key = "";

  for (let i = 0; i < SLUG_LENGTH; i++) {
    key += ALPHABET[randomInt(ALPHABET.length)];
  }

  return key;
}

export async function POST(req: Request) {
  const body = await req.json();

  const { url, token } = body;

  // recaptcha verification
  if (!(await recaptcha(token)))
    return NextResponse.json(
      {
        error: "reCAPTCHA verification failed. Please try again.",
      },
      { status: 400 },
    );

  // Validate URL
  if (!url || !/^https:\/\//.test(url))
    return NextResponse.json(
      { error: "Invalid URL. URL must start in https://" },
      { status: 400 },
    );

  // Check if URL starts with the locked domain
  if (LOCK_DOMAIN && !url.startsWith(LOCK_DOMAIN_URL || ""))
    return NextResponse.json(
      { error: `URL must start with ${LOCK_DOMAIN_URL}` },
      { status: 400 },
    );

  if (url.startsWith(NEXT_PUBLIC_SITE_URL)) {
    return NextResponse.json(
      { error: `URL must not start with ${NEXT_PUBLIC_SITE_URL}` },
      { status: 400 },
    );
  }

  const _redis = redis();
  if (!_redis) {
    console.error("Shrtly is missing Upstash configuration.");
    return Response.json(
      { error: "Shrtly is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const key = generateKey();
  await _redis.set(key, url, {
    ex: WAITLIST_DEDUPE_TTL_SECONDS,
  });

  return NextResponse.json({
    shortUrl: `${NEXT_PUBLIC_SITE_URL}/s/${key}`,
  });
}

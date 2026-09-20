import { redis } from "@/lib/redis";
import { notFound } from "next/navigation";
import RedirectCountdown from "@/components/common/RedirectCountdown";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RedirectPage({ params }: Props) {
  const { slug } = await params;
  const _redis = redis();
  if (!_redis) return notFound();

  const url = await _redis.get(slug);

  if (!url) return notFound();

  return <RedirectCountdown url={url.toString()} />;
}

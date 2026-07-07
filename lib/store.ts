import { readFileSync, writeFileSync, existsSync } from "fs";

// Persistent key-value storage.
// Uses Upstash Redis (via Vercel KV / Upstash integration) when the env vars are present,
// otherwise falls back to the server's /tmp directory so local/dev still works.
//
// Env vars (added automatically by the Vercel Upstash/KV integration):
//   KV_REST_API_URL / KV_REST_API_TOKEN   (Vercel KV)
//   or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (Upstash direct)

type RedisClient = {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<unknown>;
};

let redis: RedisClient | null = null;
let triedInit = false;

async function getRedis(): Promise<RedisClient | null> {
  if (triedInit) return redis;
  triedInit = true;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    redis = null;
    return null;
  }
  try {
    const { Redis } = await import("@upstash/redis");
    redis = new Redis({ url, token }) as unknown as RedisClient;
  } catch {
    redis = null;
  }
  return redis;
}

function tmpPath(key: string) {
  return `/tmp/seehra-${key}.json`;
}

export async function readData<T>(key: string, fallback: T): Promise<T> {
  const client = await getRedis();
  if (client) {
    try {
      const val = await client.get(key);
      if (val === null || val === undefined) return fallback;
      // Upstash auto-parses JSON; if it's a string, parse it.
      return (typeof val === "string" ? JSON.parse(val) : val) as T;
    } catch {
      return fallback;
    }
  }
  // /tmp fallback
  try {
    const p = tmpPath(key);
    if (existsSync(p)) return JSON.parse(readFileSync(p, "utf-8")) as T;
  } catch {}
  return fallback;
}

export async function writeData<T>(key: string, value: T): Promise<void> {
  const client = await getRedis();
  if (client) {
    try {
      await client.set(key, JSON.stringify(value));
      return;
    } catch {
      // fall through to tmp
    }
  }
  try {
    writeFileSync(tmpPath(key), JSON.stringify(value));
  } catch {}
}

export function usingPersistentStore(): boolean {
  return Boolean(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}

const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(input: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const current = store.get(input.key);

  if (!current || current.resetAt < now) {
    store.set(input.key, { count: 1, resetAt: now + input.windowMs });
    return { ok: true, resetAt: now + input.windowMs };
  }

  current.count += 1;

  return {
    ok: current.count <= input.limit,
    resetAt: current.resetAt,
  };
}

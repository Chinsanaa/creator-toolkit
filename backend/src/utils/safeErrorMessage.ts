export function safeErrorMessage(error: unknown, fallback: string): string {
  if (process.env.NODE_ENV === 'production') {
    return fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

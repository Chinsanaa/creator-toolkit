export function logServerError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'test') return;
  console.error(`${context}:`, error);
}

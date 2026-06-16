export function sanitizeNextPath(nextValue: string | null | undefined): string | null {
  if (!nextValue) return null;
  if (!nextValue.startsWith('/')) return null;
  if (nextValue.startsWith('//')) return null;
  if (nextValue.includes('\\')) return null;
  if (nextValue.includes('%5c') || nextValue.includes('%2f%2f')) return null;
  return nextValue;
}

export function appendNextParam(path: string, nextValue: string | null | undefined): string {
  const nextPath = sanitizeNextPath(nextValue);
  if (!nextPath) return path;

  const [basePath, queryString = ''] = path.split('?');
  const params = new URLSearchParams(queryString);
  params.set('next', nextPath);
  const serialized = params.toString();
  return serialized ? `${basePath}?${serialized}` : basePath;
}

export function getNextPathFromWindow(): string | null {
  if (typeof window === 'undefined') return null;
  return sanitizeNextPath(new URLSearchParams(window.location.search).get('next'));
}

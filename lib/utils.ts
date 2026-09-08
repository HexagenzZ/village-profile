/** Decode URL component safely, returning original on failure */
export function decodeURIComponentSafe(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/* filepath: c:\Users\This User\Videos\משימת בית\frontend\src\utils\helpers.ts */
// ...existing code...
export function formatDate(d?: string | Date) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString();
}

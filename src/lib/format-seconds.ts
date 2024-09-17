export function formatSeconds(seconds: number): string {
  if (seconds >= 3600) {
    const hours = Math.round(seconds / 3600);
    return `${hours}h`;
  } else if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

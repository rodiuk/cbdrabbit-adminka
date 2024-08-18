/**
 * Format TTN number to view format
 * @param str - TTN number
 * @returns Formatted TTN number
 * @example formatTTNView("12345678901234") => "12-3456-7890-1234"
 */
export function formatTTNView(str: string): string {
  if (str.length !== 14) return "";

  return (
    str?.slice(0, 2) +
    " " +
    str
      ?.slice(2)
      .replace(/(.{4})/g, "$1 ")
      .slice(0, -1)
  );
}

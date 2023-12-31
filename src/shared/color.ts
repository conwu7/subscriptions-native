export function determineTextColor(hexColor: string) {
  const color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
  const r = parseInt(color.substring(0, 2), 16); // Red
  const g = parseInt(color.substring(2, 4), 16); // Green
  const b = parseInt(color.substring(4, 6), 16); // Blue

  // Calculating the perceptive luminance - a measure of the perceived brightness of a color
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If the color is more towards the darker side, return 'white', else return 'black'
  return luminance > 0.5 ? 'black' : 'white';
}


/**
 * Extracts all color hex codes and returns them in an array
 * 
 * @param colors string with color hex codes
 */
export function parseColors(colors: string): string[] {
    let match = colors.match(/#[0-9A-Fa-f]{6}/g)
    return match ? match.map(m => m.toUpperCase()) : []
}
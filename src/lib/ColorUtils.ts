
/**
 * Extracts all color hex codes and returns them in an array
 * 
 * @param color string with color hex codes
 */
export function colorValid(color: string): boolean {
    return (/^#[0-9A-F]{6}$/g).test(color);
}

/**
 * Gets the contrast color (either black or white) based on a hex color value
 * 
 * @param hexcolor (#XXXXXX)
 */
export function getContrast(hexcolor: string) {
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(5, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
}
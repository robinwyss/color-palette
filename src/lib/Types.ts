export type Color = {
    colorCode: string;
    name?: string;
}

export type ColorPalette = {
    colors: Color[];
    name: string
}

export type ColorScheme = {
    palettes: ColorPalette[];
    name: string;
    id: string;
}


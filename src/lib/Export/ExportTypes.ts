export type ColorET = {
    colorCode: string;
    name?: string;
}

export type ColorPaletteET = {
    colors: ColorET[]
    name?: string
}

export type ColorSchemeET = {
    palettes: ColorPaletteET[]
    name?: string;
}

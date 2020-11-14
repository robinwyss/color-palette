import uuidv4 from 'uuid/v4'

export class Color {
    colorCode: string;
    id: string
    name?: string;

    constructor(colorCode?: string, name?: string) {
        this.colorCode = colorCode || '#FFFFFF';
        this.name = name;
        this.id = uuidv4();
    }
}

export class ColorPalette {
    colors: Color[]
    id: string
    name?: string

    constructor(name?: string) {
        this.name = name;
        this.id = uuidv4();
        this.colors = [];
    }
}

export class ColorScheme {
    palettes: ColorPalette[]
    name?: string;
    id: string;

    constructor(name?: string) {
        this.name = name;
        this.id = uuidv4();
        this.palettes = [];
    }
}


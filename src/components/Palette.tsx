import React from 'react';
import './Palette.css';
import { Color, ColorPalette } from '../lib/Types'

interface PaletteProps {
    palette: ColorPalette
}

const Palette: React.FC<PaletteProps> = ({ palette }) => {
    return (
        <div className="colorPalette">
            {palette.colors.map(c => (
                <div key={c.name} className="color" style={{ backgroundColor: c.colorCode }}>
                    {c.colorCode} - {c.name}
                </div>
            ))}
        </div>
    )
}

export default Palette;
import React from 'react';
import './Palette.css';
import { Color } from '../lib/Types'

interface PaletteProps {
    colors: Color[]
}

const Palette: React.FC<PaletteProps> = ({ colors }) => {
    return (
        <div className="colorPalette">
            {colors.map(c => (
                <div key={c.name} className="color" style={{ backgroundColor: c.colorCode }}>
                    {c.colorCode} - {c.name}
                </div>
            ))}
        </div>
    )
}

export default Palette;
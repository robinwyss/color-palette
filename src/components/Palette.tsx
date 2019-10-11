import React from 'react';
import './Palette.css';

interface PaletteProps {
    colors: string[]
}

const Palette: React.FC<PaletteProps> = ({ colors }) => {
    return (
        <div className="colorPalette">
            {colors.map(c => (
                <div key={c} className="color" style={{ backgroundColor: c }}>
                    {c}
                </div>
            ))}
        </div>
    )
}

export default Palette;
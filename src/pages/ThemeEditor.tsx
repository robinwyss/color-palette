import React from 'react';
import PaletteEditor from '../components/PaletteEditor';
import { ColorPalette, ColorTheme } from '../lib/Types';
import Palette from '../components/Palette';

interface Props {
}

interface State {
    theme: ColorTheme
}

class ThemeEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            theme: { name: '', id: '', palettes: [] }
        }
    }

    saveColorPalette(palette: ColorPalette) {
        var {theme} = this.state;
        theme.palettes.push(palette);
        this.setState({theme});
    }

    updateName(name: string) {
        var { theme } = this.state;
        theme.name = name;
        this.setState({ theme });
    }

    render() {
        var { theme } = this.state;
        return (
            <div>
                <h1>{theme.name}</h1>
                <div><input value={theme.name} onChange={(e) => this.updateName(e.target.value)} type="text" placeholder="Theme name" /></div>
                {theme.palettes.map(palette => (
                    <Palette palette={palette}></Palette>
                ))}
                <PaletteEditor save={(palette) => this.saveColorPalette(palette)}></PaletteEditor>
            </div>
        )
    }
}

export default ThemeEditor;
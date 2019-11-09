import React from 'react';
import { parseColors } from '../lib/ColorUtils'
import './PaletteEditor.css';
import { ColorPalette, Color } from '../lib/Types';
import ColorEditor from './ColorEditor';

interface Props {
    save(colors: ColorPalette): any
    palette?: ColorPalette
}

interface State {
    palette: ColorPalette;
    edit: boolean;
    editColor: boolean;
    colorInput: string;
}

class PaletteEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            palette: props.palette || { name: '', colors: [{ colorCode: "#FFFFFF" }] },
            edit: false,
            editColor: false,
            colorInput: "#1e2223\n#292f31\n#353d3e\n#414a4c"
        }
    }

    edit() {
        this.setState({ edit: !this.state.edit })
    }

    saveColors(colorInput: string) {
        let colors = colorInput.split("\n");
        let validColors = parseColors(colorInput);
        this.props.save({ name: '', colors: validColors.map(colorCode => { return { colorCode } }) });
        this.setState({ edit: false, colorInput: "" })
    }

    handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ colorInput: event.target.value });
    }

    addColor() {
        var { palette } = this.state
        palette.colors.push({ name: '', colorCode: '#FFFFFF' })
        this.setState({ palette })
    }

    setColorName(color: Color, name: string) {
        color.name = name
    }

    saveColor(color: Color) {

    }

    render() {
        var { palette } = this.state;
        if (this.state.edit) {
            return (
                <div >
                    <div className="colorPalette">
                        {palette.colors.map(c => (
                            <div className="colorItem">
                                <div key={c.name} className="color" style={{ backgroundColor: c.colorCode }}>
                                    {c.colorCode}
                                </div>
                                <div className="name">
                                    {this.renderName(c)}
                                </div>
                            </div>
                        ))}
                        <div>
                            {this.renderColorEditor()}

                        </div>
                    </div>

                    <div>
                        <button onClick={() => this.saveColors(this.state.colorInput)}>save</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="colorPaletteInput">
                    <button onClick={() => this.edit()}>+</button>
                </div>
            )
        }
    }

    renderColorEditor() {
        var { editColor } = this.state
        if (editColor) {
            return (
                <ColorEditor saveColor = { this.saveColor } ></ColorEditor >
            )
        }
    }

    renderName(color: Color) {
        let name = color.name || 'name'
        return (
            <input value={name} onChange={(e) => this.setColorName(color, e.target.value)} ></input>
        )
    }
}

export default PaletteEditor;
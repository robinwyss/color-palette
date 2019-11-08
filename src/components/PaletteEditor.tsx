import React from 'react';
import { parseColors } from '../lib/ColorUtils'
import './PaletteEditor.css';
import { ColorPalette } from '../lib/Types';

interface Props {
    save(colors: ColorPalette): any
}

interface State {
    colors: string[];
    edit: boolean;
    colorInput: string;
}

class PaletteEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            colors: [],
            edit: false,
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

    render() {
        if (this.state.edit) {
            return (
                <div>
                    <div>
                        <textarea value={this.state.colorInput} onChange={(e) => this.handleChange(e)}></textarea>
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
}

export default PaletteEditor;
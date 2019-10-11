import React from 'react';
import './PaletteEditor.css';

interface Props {
    save(colors: string[]): any
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

    saveColors() {
        let colors = this.state.colorInput.split("\n");
        let validColors = colors.reduce((acc, c) => {
            let match = c.match(/#[0-9A-Fa-f]{6}/g)
            if (match && match.length === 1) {
                acc.push(match[0])
            }
            return acc
        }, new Array<string>())
        this.props.save(validColors);
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
                        <button onClick={() => this.saveColors()}>save</button>
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
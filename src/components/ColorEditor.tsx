import React from 'react'
import { Color } from '../lib/Types';
import './ColorEditor.css'

interface Props {
    saveColor(color: Color): any
}

interface State {
    name?: string
    colorCode: string
}

class ColorEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = { colorCode: '' }
    }

    updateName(name: string) {
        this.setState({ name });
    }

    updateColor(colorCode: string) {
        this.setState({ colorCode });
    }

    save() {

    }

    render() {
        var { name, colorCode } = this.state
        return (
            <div >
                <div className="background"></div>
                <div className="colorEditor">
                    <div>
                        <label>Color</label>
                        <input type="color" placeholder="color code (#FFFFFFF)" value={colorCode} onChange={(e) => this.updateColor(e.target.value)} />
                    </div>
                    <div>
                        <label>Name</label>
                        <input type="text" placeholder="name (optional" value={name} onChange={(e) => this.updateName(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={() => this.save()} >save</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ColorEditor
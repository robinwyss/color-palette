import React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { loadTheme, saveTheme } from '../lib/Storage'
import { ColorTheme } from '../lib/Types';
import Palette from '../components/Palette'
interface MatchParams {
    themeId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
    theme: ColorTheme | undefined
}

class Theme extends React.Component<Props, State> {
    componentDidMount() {
        const { themeId } = this.props.match.params
        let theme = loadTheme(themeId)
        this.setState({ theme })
    }

    render() {
        var { theme } = this.state
        if (!theme) {
            return (<div>No theme found</div>)
        }
        return (
            <div>
                <div>{theme.name}</div>
                {theme.palettes.map(palette => (
                   
                    <div>
                        <div>{palette.name}</div>
                        <Palette colors={palette.colors}></Palette>
                    </div>
                ))}
            </div >
        )
    }
}

export default Theme
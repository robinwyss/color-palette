import React from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { loadTheme } from "../../lib/LocalStorage";
import { ColorTheme } from "../../lib/Types";
import Palette from "./components/Palette";
import Exporter from "./components/Exporter";
interface MatchParams {
  themeId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  theme: ColorTheme | undefined;
}

class Theme extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      theme: undefined
    };
  }

  componentDidMount() {
    const { themeId } = this.props.match.params;
    let theme = loadTheme(themeId);
    this.setState({ theme });
  }

  render() {
    var { theme } = this.state;
    if (!theme) {
      return <div>No theme found</div>;
    }
    return (
      <div>
        <h1>{theme.name}</h1>
        {theme.palettes.map((palette, index) => (
          <div key={index}>
            <h2>{palette.name}</h2>
            <Palette palette={palette}></Palette>
          </div>
        ))}
        <NavLink to={"/editor/" + theme.id}>Edit</NavLink>
        <Exporter theme={theme}></Exporter>
      </div>
    );
  }
}

export default Theme;

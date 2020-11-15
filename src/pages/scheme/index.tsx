import React from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { loadScheme } from "../../lib/LocalStorage";
import { ColorScheme } from "../../lib/Types";
import Palette from "./components/Palette";
import Exporter from "./components/Exporter";
interface MatchParams {
  schemeId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

interface State {
  scheme: ColorScheme | undefined;
}

class Scheme extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      scheme: undefined
    };
  }

  componentDidMount() {
    const { schemeId } = this.props.match.params;
    let scheme = loadScheme(schemeId);
    this.setState({ scheme: scheme });
  }

  render() {
    var { scheme } = this.state;
    if (!scheme) {
      return <div>No Scheme found</div>;
    }
    return (
      <div>
        <h1>{scheme.name}</h1>
        { scheme.palettes.map((palette, index) => (
          <div key={index}>
            <h2>{palette.name}</h2>
            <Palette palette={palette}></Palette>
          </div>
        ))}
        <NavLink to={"/editor/" + scheme.id}>Edit</NavLink>
        <NavLink to="/">Back</NavLink>
        <Exporter scheme={scheme}></Exporter>
      </div>
    );
  }
}

export default Scheme;

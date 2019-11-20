import React from "react";
import { ColorTheme } from "../../../lib/Types";
import ReactDOMServer from "react-dom/server";

type size = { width: number; height: number };

interface Props {
  theme: ColorTheme;
}

const Exporter: React.SFC<Props> = ({ theme }) => {
  return (
    <div>
      <button onClick={() => downloadThemeAsPng(theme)}>download png</button>
      <button onClick={() => downloadThemeAsSvg(theme)}>download svg</button>
    </div>
  );
};

const downloadThemeAsPng = (theme: ColorTheme) => {
  var size = calculateRequiredSize(theme);
  var themeSvg = createSvg(theme, size);
  exportSvgAsImage(themeSvg, size, `${theme.name}.png`);
};

const downloadThemeAsSvg = (theme: ColorTheme) => {
  var size = calculateRequiredSize(theme);
  var themeSvg = createSvg(theme, size);

  var svgDataUri = "data:image/svg+xml;base64," + btoa(themeSvg);
  download(`${theme.name}.svg`, svgDataUri);
};

const download = (filename: string, dataUri: string) => {
  var pom = document.createElement("a");
  pom.setAttribute("href", dataUri);
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
};

const createSvg = (theme: ColorTheme, size: size) => {
  var svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size.width}
      height={size.height}
      version="1.1"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      <rect width="100%" height="100%" fill="#FFFFFF" />
      <text x="10" y="20">
        {theme.name}
      </text>
      {theme.palettes.map((palette, index) => (
        <g transform={"translate(10," + (index * 160 + 50) + ")"} key={index}>
          <text>{palette.name}</text>
          {palette.colors.map((color, index) => (
            <g transform={"translate(" + index * 100 + ",10)"} key={index}>
              <rect fill={color.colorCode} stroke="#000000" width="100" height="100"></rect>
              <text x="5" y="120" width="100">
                {color.colorCode}
              </text>
              <text x="5" y="140" width="100">
                {color.name}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );

  return ReactDOMServer.renderToString(svg);
};

const calculateRequiredSize = (theme: ColorTheme): size => {
  var maxWidth = theme.palettes
    .map(p => p.colors.length * 100)
    .reduce((previousWidth, width) => (width > previousWidth ? width : previousWidth));
  var height = theme.palettes.length * 160;
  return { width: maxWidth + 20, height: height + 60 };
};

const exportSvgAsImage = (svgXml: string, size: size, name: string) => {
  var canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const ctx = canvas.getContext("2d");
  var img = new Image();
  var svgBlob = new Blob([svgXml], { type: "image/svg+xml;charset=utf-8" });
  var DOMURL = window.URL || window.webkitURL || window;
  var url = DOMURL.createObjectURL(svgBlob);
  img.onload = function() {
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
      var imgURI = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      download(`${name}.png`, imgURI);
    }
  };

  img.src = url;
};

export default Exporter;

import React from "react";
import { ColorScheme } from "../../../lib/Types";
import { calculateRequiredSize, createSvg, Size } from "../../../lib/Export/ImageExport";
import { getJsonDataUri } from "../../../lib/Export/JsonExporter";

interface Props {
  scheme: ColorScheme;
}

const Exporter: React.SFC<Props> = ({ scheme }) => {
  return (
    <div>
      <button onClick={() => downloadSchemeAsPng(scheme)}>download png</button>
      <button onClick={() => downloadSchemeAsSvg(scheme)}>download svg</button>
      <button onClick={() => downloadSchemeToJson(scheme)}>export to JSON</button>
    </div>
  );
};

const downloadSchemeToJson = (scheme: ColorScheme) => {
  const schemeJson = getJsonDataUri(scheme);
  download(`${scheme.name}.json`, schemeJson);
}

const downloadSchemeAsPng = (scheme: ColorScheme) => {
  var size = calculateRequiredSize(scheme);
  var schemeSvg = createSvg(scheme, size);
  exportSvgAsImage(schemeSvg, size, `${scheme.name}.png`);
};

const downloadSchemeAsSvg = (scheme: ColorScheme) => {
  var size = calculateRequiredSize(scheme);
  var schemeSvg = createSvg(scheme, size);

  var svgDataUri = "data:image/svg+xml;base64," + btoa(schemeSvg);
  download(`${scheme.name}.svg`, svgDataUri);
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

const exportSvgAsImage = (svgXml: string, size: Size, name: string) => {
  var canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const ctx = canvas.getContext("2d");
  var img = new Image();
  var svgBlob = new Blob([svgXml], { type: "image/svg+xml;charset=utf-8" });
  var DOMURL = window.URL || window.webkitURL || window;
  var url = DOMURL.createObjectURL(svgBlob);
  img.onload = function () {
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

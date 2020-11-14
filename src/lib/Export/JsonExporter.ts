import { ColorScheme } from "../Types";

const version = "v1";

type JsonExport = {
    version: string
    timestamp: Number
    scheme: ColorScheme
}

export const createJson = (scheme: ColorScheme) => {
    const jsonExport: JsonExport = {
        version: version,
        timestamp: Date.now(),
        scheme: scheme
    }
    return JSON.stringify(jsonExport);
}

export const getJsonDataUri = (scheme: ColorScheme) => {
    const jsonStr = createJson(scheme);
    return 'data:text/json;base64,' + btoa(jsonStr);
}
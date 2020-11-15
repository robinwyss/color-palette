import { ColorScheme } from "../Types";
import { ColorSchemeET } from "./ExportTypes";
import uuidv4 from 'uuid/v4'
const version = "v1";
const exportName = "colorPaletteExport"

type JsonExport = {
    exportType: string
    version: string
    timestamp: Number
    colorScheme: ColorSchemeET
}

export const getJsonDataUri = (scheme: ColorScheme) => {
    const jsonStr = generateJson(scheme);
    return 'data:text/json;base64,' + btoa(jsonStr);
}

export const importFromJson = (json: string) => {
    try {
        const importedData = JSON.parse(json);
        if (importedData.exportType === exportName && importedData.version === version) {
            return convertToTypes(importedData.colorScheme);
        }
    } catch (e) {
        console.log(e);
    }
}

const generateJson = (scheme: ColorScheme) => {
    const schemeExportType = convertToExportTypes(scheme);
    const jsonExport: JsonExport = {
        exportType: exportName,
        version: version,
        timestamp: Date.now(),
        colorScheme: schemeExportType
    }
    return JSON.stringify(jsonExport);
}

const convertToExportTypes = (scheme: ColorScheme): ColorSchemeET => {
    return {
        name: scheme.name,
        palettes: scheme.palettes.map(p => {
            return {
                name: p.name,
                colors: p.colors.map(c => {
                    return {
                        name: c.name,
                        colorCode: c.colorCode
                    }
                })
            }
        })
    }
}

const convertToTypes = (scheme: ColorSchemeET): ColorScheme => {
    return {
        id: uuidv4(),
        name: scheme.name,
        palettes: scheme.palettes.map(p => {
            return {
                id: uuidv4(),
                name: p.name,
                colors: p.colors.map(c => {
                    return {
                        id: uuidv4(),
                        name: c.name,
                        colorCode: c.colorCode
                    }
                })
            }
        })
    }
}
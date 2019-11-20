import { ColorScheme } from './Types'
import uuidv4 from 'uuid/v4'

const name = "colorSchemes";
const version = "v1.1"

type DataStructure = {
    version: string,
    timestamp: number,
    schemes: ColorScheme[]
}
const timestamp = () => Date.now()


function loadData(): DataStructure {
    var dataJson = localStorage.getItem(name)
    if (!dataJson) {
        // if there is no data, set initial data
        dataJson = JSON.stringify({
            timestamp: timestamp(),
            version,
            schemes: []
        })
        localStorage.setItem(name, dataJson)
    }
    return JSON.parse(dataJson);
}

function saveData(data: DataStructure) {
    data.timestamp = timestamp()
    var dataJson = JSON.stringify(data);
    localStorage.setItem(name, dataJson);
}

export function saveScheme(scheme: ColorScheme) {
    var data = loadData();
    var schemes = data.schemes;
    if (scheme.id) {
        var schemeIndex = schemes.findIndex(t => t.id === scheme.id)
        if (schemeIndex >= 0) {
            schemes[schemeIndex] = scheme
        } else {
            throw new Error(`No scheme with id ${scheme.id} found, saving failed`);
        }
    } else {
        scheme.id = uuidv4()
        schemes.push(scheme);
    }
    data.schemes = schemes;
    saveData(data);
}

export function loadSchemes(): ColorScheme[] {
    var data = loadData()
    return data.schemes;
}

export function loadScheme(schemeId: string): ColorScheme | undefined {
    let scheme = loadSchemes()
    return scheme.find(scheme => scheme.id === schemeId)
}
import { ColorTheme } from './Types'
import uuidv4 from 'uuid/v4'

const name = "colorThemes";
const version = "v1.0"

type DataStructure = {
    version: string,
    timestamp: number,
    themes: ColorTheme[]
}
const timestamp = () => Date.now()


function loadData(): DataStructure {
    var dataJson = localStorage.getItem(name)
    if (!dataJson) {
        // if there is no data, set initial data
        dataJson = JSON.stringify({
            timestamp: timestamp(),
            version,
            themes: []
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

export function saveTheme(theme: ColorTheme) {
    var data = loadData();
    var themes = data.themes;
    if (theme.id) {
        var themeIndex = themes.findIndex(t => t.id === theme.id)
        if (themeIndex >= 0) {
            themes[themeIndex] = theme
        } else {
            throw `No theme with id ${theme.id} found, saving failed`;
        }
    } else {
        theme.id = uuidv4()
        themes.push(theme);
    }
    data.themes = themes;
    saveData(data);
}

export function loadThemes(): ColorTheme[] {
    var data = loadData()
    return data.themes;
}

export function loadTheme(themeId: string): ColorTheme | undefined {
    let themes = loadThemes()
    return themes.find(theme => theme.id === themeId)
}
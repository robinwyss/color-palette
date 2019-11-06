import { ColorTheme } from './Types'

export function saveTheme(theme: ColorTheme) {
    var themes = loadThemes()
    var themeIndex = themes.findIndex(t => t.id === theme.id)
    if (themeIndex >= 0) {
        themes[themeIndex] = theme
    } else {
        themes.push(theme);
    }
    localStorage.setItem("colorThemes", JSON.stringify(themes));
}

export function loadThemes(): ColorTheme[] {
    var themesJson = localStorage.getItem("colorThemes")
    return themesJson ? JSON.parse(themesJson) : []
}

export function loadTheme(themeId: string): ColorTheme | undefined {
    let themes = loadThemes()
    return themes.find(theme => theme.id === themeId)
}
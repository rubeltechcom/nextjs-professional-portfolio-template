import fs from 'fs'
import path from 'path'

export function getSectionData(sectionName) {
    const filePath = path.join(process.cwd(), `public/data/sections/${sectionName}.json`)
    if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(fileContents)
    }
    return null
}

export function getSections() {
    const filePath = path.join(process.cwd(), 'public/data/sections.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents).sections
}

export function getSettings() {
    const filePath = path.join(process.cwd(), 'public/data/settings.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
}

export function getProfile() {
    const filePath = path.join(process.cwd(), 'public/data/profile.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
}

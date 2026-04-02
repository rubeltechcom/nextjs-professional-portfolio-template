"use client"

import { useEffect, useState } from 'react'
import { useApi } from "@/hooks/api.js"
import { useConstants } from "@/hooks/constants.js"
import { useUtils } from "@/hooks/utils.js"
import Preloader from "@/components/loaders/Preloader.jsx"
import DataProvider, { useData } from "@/providers/DataProvider.jsx"
import LanguageProvider from "@/providers/LanguageProvider.jsx"
import ViewportProvider from "@/providers/ViewportProvider.jsx"
import ThemeProvider from "@/providers/ThemeProvider.jsx"
import LocationProvider from "@/providers/LocationProvider.jsx"
import FeedbacksProvider from "@/providers/FeedbacksProvider.jsx"
import InputProvider from "@/providers/InputProvider.jsx"
import NavigationProvider from "@/providers/NavigationProvider.jsx"

export const AppEssentialsWrapper = ({ children }) => {
    const api = useApi()
    const utils = useUtils()
    const constants = useConstants()

    const [settings, setSettings] = useState()

    useEffect(() => {
        utils.file.loadJSON("/data/settings.json").then(response => {
            _applyDeveloperSettings(response)
            setSettings(response)

            api.analytics.init(response["templateSettings"]?.googleAnalyticsId)

            const defaultThemeId = response["templateSettings"]?.defaultThemeId
            const preferredThemeId = utils.storage.getPreferredTheme()
            const themeId = preferredThemeId || defaultThemeId
            if (themeId) {
                document.documentElement.setAttribute('data-theme', themeId)
            }

            const consoleMessageForDevelopers = response?.consoleMessageForDevelopers
            if(consoleMessageForDevelopers) {
                const primaryColor = utils.css.getRootSCSSVariable('--bs-primary')
                utils.log.info(consoleMessageForDevelopers.title, consoleMessageForDevelopers.items, primaryColor)
            }
        })

        api.analytics.reportVisit().then(() => {})
    }, [])

    const _applyDeveloperSettings = (settings) => {
        const developerSettings = settings?.developerSettings
        const debugMode = developerSettings?.debugMode
        const fakeEmailRequests = developerSettings?.fakeEmailRequests
        const stayOnThePreloaderScreen = developerSettings?.stayOnThePreloaderScreen

        if(constants.PRODUCTION_MODE)
            return settings

        if(debugMode) {
            settings.preloaderSettings.enabled = stayOnThePreloaderScreen
            settings.templateSettings.backgroundStyle = "plain"
            utils.storage.setWindowVariable("suspendAnimations", true)
            utils.log.warn("DataProvider", "Debug Mode is enabled, so transitions and animated content—such as the preloader screen, background animations, and role text typing—will be skipped. You can disable it manually on settings.json or by running the app on PROD_MODE, which disables it by default.")
        }

        if(fakeEmailRequests) {
            utils.storage.setWindowVariable("fakeEmailRequests", true)
            utils.log.warn("DataProvider", "Fake email requests are enabled. This is only for development purposes and will be disabled automatically in production.")
        }

        if(stayOnThePreloaderScreen) {
            utils.storage.setWindowVariable("stayOnThePreloaderScreen", true)
            utils.log.warn("DataProvider", "Preloader screen will be displayed indefinitely because the developer flag 'stayOnThePreloaderScreen' is on. This is only for development purposes and will be disabled automatically in production.")
        }
    }

    return (
        <>
            {settings && (
                <Preloader preloaderSettings={settings["preloaderSettings"]}>
                    <DataProvider settings={settings}>
                        {children}
                    </DataProvider>
                </Preloader>
            )}
        </>
    )
}

export const AppCapabilitiesWrapper = ({ children }) => {
    const data = useData()
    const [selectedThemeId, setSelectedThemeId] = useState(null)

    const appSettings = data.getSettings()
    const appStrings = data.getStrings()
    const appSections = data.getSections()
    const appCategories = data.getCategories()

    const supportedLanguages = appSettings["supportedLanguages"]
    const supportedThemes = appSettings["supportedThemes"]
    const defaultLanguageId = appSettings["templateSettings"].defaultLanguageId
    const defaultThemeId = appSettings["templateSettings"].defaultThemeId
    const animatedCursorEnabled = appSettings["templateSettings"].animatedCursorEnabled
    const showSpinnerOnThemeChange = appSettings["templateSettings"].showSpinnerOnThemeChange

    return (
        <LanguageProvider supportedLanguages={supportedLanguages}
                          defaultLanguageId={defaultLanguageId}
                          appStrings={appStrings}
                          selectedThemeId={selectedThemeId}>
            <ViewportProvider>
                <InputProvider>
                    <FeedbacksProvider canHaveAnimatedCursor={animatedCursorEnabled}>
                        <ThemeProvider supportedThemes={supportedThemes}
                                       defaultThemeId={defaultThemeId}
                                       showSpinnerOnThemeChange={showSpinnerOnThemeChange}
                                       onThemeChanged={setSelectedThemeId}>
                            <LocationProvider sections={appSections}
                                              categories={appCategories}>
                                <NavigationProvider sections={appSections}
                                                    categories={appCategories}>
                                    {children}
                                </NavigationProvider>
                            </LocationProvider>
                        </ThemeProvider>
                    </FeedbacksProvider>
                </InputProvider>
            </ViewportProvider>
        </LanguageProvider>
    )
}

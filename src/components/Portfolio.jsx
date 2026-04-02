"use client"

import React, {useEffect, useState} from 'react'
import Layout from "@/components/layout/Layout.jsx"
import {useData} from "@/providers/DataProvider.jsx"
import {useLanguage} from "@/providers/LanguageProvider.jsx"
import {useLocation} from "@/providers/LocationProvider.jsx"
import {useNavigation} from "@/providers/NavigationProvider.jsx"
import LayoutNavigation from "@/components/layout/LayoutNavigation.jsx"
import LayoutImageCache from "@/components/layout/LayoutImageCache.jsx"
import LayoutSlideshow from "@/components/layout/LayoutSlideshow.jsx"

function Portfolio() {
    const data = useData()
    const language = useLanguage()
    const location = useLocation()
    const navigation = useNavigation()

    if(!data || !language || !location || !navigation) {
        return null
    }

    const profile = data.getProfile()
    const settings = data.getSettings()
    const sections = data.getSections()

    const backgroundStyle = settings.templateSettings.backgroundStyle

    const currentSection = navigation.targetSection
    const previousSection = navigation.previousSection
    const sectionLinks = navigation.sectionLinks
    const categoryLinks = navigation.categoryLinks

    return (
        <Layout id={"react-portfolio"}
                backgroundStyle={backgroundStyle}>
            <LayoutImageCache profile={profile}
                              settings={settings}
                              sections={sections}/>

            <LayoutNavigation profile={profile}
                              sectionLinks={sectionLinks}
                              categoryLinks={categoryLinks}>
                <LayoutSlideshow sections={sections}
                                 currentSection={currentSection}
                                 previousSection={previousSection}/>
            </LayoutNavigation>
        </Layout>
    )
}

export default Portfolio
"use client"

import { AppEssentialsWrapper, AppCapabilitiesWrapper } from "@/components/AppWrappers.jsx"
import Portfolio from "@/components/Portfolio.jsx"

export default function ClientLayout({ children }) {
    return (
        <AppEssentialsWrapper>
            <AppCapabilitiesWrapper>
                <Portfolio />
                {children}
            </AppCapabilitiesWrapper>
        </AppEssentialsWrapper>
    )
}

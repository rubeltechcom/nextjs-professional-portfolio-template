"use client"

import "./Scrollable.scss"
import React, {useEffect, useState} from 'react'
import {useViewport} from "@/providers/ViewportProvider.jsx"
import {useUtils} from "@/hooks/utils.js"
import {useConstants} from "@/hooks/constants.js"
import Scrollbar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'

if (typeof window !== 'undefined') {
    Scrollbar.use(OverscrollPlugin)
}

function Scrollable({ children, id, pluginEnabled, shouldResetScroll, setShouldResetScroll, className = "" }) {
    const constants = useConstants()
    const viewport = useViewport()
    const utils = useUtils()

    const [plugin, setPlugin] = useState(null)

    const pluginEnabledClass = plugin ?
        `scrollable-with-plugin` :
        ``

    /** @constructs **/
    useEffect(() => {
        const supportsPlugin = !viewport.isMobileLayout() && !utils.device.isTouchDevice()
        const shouldCreatePlugin = supportsPlugin && pluginEnabled

        if(shouldCreatePlugin) _createPlugin()
        else _deactivatePlugin()
    }, [pluginEnabled, viewport.isMobileLayout()])

    useEffect(() => {
        if(!shouldResetScroll)
            return

        if(!plugin) {
            const div = document.getElementById(id)
            setTimeout(() => {
                if (div) div.scrollTop = 0
            }, 50)
        }
        else {
            plugin.scrollTo(0, 0)
        }

        setShouldResetScroll(false)
    }, [shouldResetScroll])

    const _createPlugin = () => {
        if(plugin)
            return

        const target = document.getElementById(id)
        if (!target) return

        const scrollbar = Scrollbar.init(target, {
            damping: 0.2,
            renderByPixels: true,
            alwaysShowTracks: true,
            continuousScrolling: true,
            plugins: {
                overscroll: {
                    effect: 'glow',
                    glowColor: utils.css.getRootSCSSVariable("--theme-secondary")
                }
            }
        })

        setPlugin(scrollbar)
    }

    const _deactivatePlugin = () => {
        if(!plugin)
            return

        const target = document.getElementById(id)
        if (target) {
            Scrollbar.destroy(target)
        }
        setPlugin(null)
    }

    return (
        <div className={`scrollable-wrapper ${constants.HTML_CLASSES.scrollbarDecorator} ${className}`}>
            <div className={`scrollable ${pluginEnabledClass}`}
                 id={id}>
                <div className={`scrollable-content`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Scrollable
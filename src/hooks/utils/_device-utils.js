/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _deviceUtils = {
    /**
     * @return {boolean}
     */
    isAndroid: () => {
        if (typeof window === 'undefined') return false
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /android/.test(userAgent);
    },

    /**
     * @return {boolean}
     */
    isChrome: () => {
        if (typeof navigator === 'undefined') return false
        const userAgent = navigator.userAgent || navigator.vendor || (typeof window !== 'undefined' && window.opera)
        return /CriOS/.test(userAgent) || /Chrome/.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isChromeAndroid: () => {
        if (typeof navigator === 'undefined') return false
        const userAgent = navigator.userAgent
        return /Chrome\/[.0-9]* Mobile/i.test(userAgent) && !/OPR|Edg|SamsungBrowser|UCBrowser|CriOS/i.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isChromeOS: () => {
        if (typeof window === 'undefined') return false
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /cros/.test(userAgent);
    },

    /**
     * @return {boolean}
     **/
    isFirefox: () => {
        if (typeof navigator === 'undefined') return false
        const userAgent = navigator.userAgent || navigator.vendor || (typeof window !== 'undefined' && window.opera);
        return /Firefox/.test(userAgent);
    },

    /**
     * @return {boolean}
     */
    isIOS: () => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
            || /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    },

    /**
     * @return {boolean}
     */
    isIPad: () => {
        if (typeof window === 'undefined') return false
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /ipad/.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isSafari: () => {
        if (typeof navigator === 'undefined') return false
        const userAgent = navigator.userAgent
        return /^((?!chrome|android).)*safari/i.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isTouchDevice: () => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0))
    }
}
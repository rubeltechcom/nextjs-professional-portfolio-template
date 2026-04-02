/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _urlUtils = {
    /**
     * @return {string}
     */
    getAbsoluteLocation: () => {
        if (typeof window === 'undefined') return ""
        const { protocol, host, pathname, search, hash } = window.location
        return `${protocol}//${host}${pathname}${search}${hash}`
    },

    /**
     * @return {string}
     */
    getRootLocation: () => {
        if (typeof window === 'undefined') return ""
        const { protocol, host } = window.location
        const basePath = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_URL) || '/'
        const path = `${protocol}//${host}${basePath}`
        return path.endsWith('/') ? path : `${path}/`
    },

    /**
     * @param {String} url
     */
    open: (url) => {
        if (typeof window === 'undefined') return
        window.open(url, "_blank")
    },

    /**
     * @param {String} youtubeRawUrl
     * @return {String}
     */
    toYoutubeEmbed: (youtubeRawUrl) => {
        const urlObj = new URL(youtubeRawUrl)
        const videoId = urlObj.searchParams.get('v')
        return `https://www.youtube.com/embed/${videoId}`
    }
}
/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _fileUtils = {
    /**
     * @string
     */
    BASE_URL: (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_URL) || "",

    /**
     * @param {String} url
     */
    download: (url) => {
        if (typeof window === 'undefined') return
        window.open(_fileUtils.resolvePath(url), "_blank")
    },

    /**
     * @param {String} path
     * @return {Promise<any>}
     */
    loadJSON: async (path) => {
        const resolvedPath = _fileUtils.resolvePath(path)

        try {
            const response = await fetch(resolvedPath)
            const contentType = response.headers.get("content-type") || ""

            if (!response.ok || !contentType.includes("application/json")) {
                return null
            }

            return await response.json()
        }
        catch (error) {
            console.error(`Failed to load JSON from ${resolvedPath}:`, error)
            return null
        }
    },

    /**
     * @param {String} path
     * @return {String}
     */
    resolvePath: (path) => {
        if(!path) return path
        if(path.startsWith("http") || path.startsWith("data:") || path.startsWith("blob:")) return path

        // Normalize path to start with /
        let normalizedPath = path.startsWith("/") ? path : `/${path}`
        
        // If BASE_URL is set, prepend it
        if (_fileUtils.BASE_URL && _fileUtils.BASE_URL !== "/") {
            const baseUrl = _fileUtils.BASE_URL.endsWith("/") ? _fileUtils.BASE_URL.slice(0, -1) : _fileUtils.BASE_URL
            const fullPath = `${baseUrl}${normalizedPath}`
            // Remove double slashes except after protocol
            return fullPath.replace(/([^:])\/\//g, "$1/")
        }
        
        return normalizedPath
    },
}
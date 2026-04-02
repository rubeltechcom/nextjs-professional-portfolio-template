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

        const baseUrl = _fileUtils.BASE_URL || ""
        const cleanPath = path.startsWith("/") ? path.slice(1) : path
        let fullPath = baseUrl ? `${baseUrl}/${cleanPath}` : `/${cleanPath}`
        
        // Replace double slashes but preserve protocol (e.g., https://)
        if (fullPath.includes("://")) {
            const [protocol, rest] = fullPath.split("://")
            return protocol + "://" + rest.replace(/\/+/g, "/")
        }
        
        return fullPath.replace(/\/+/g, "/")
    },
}
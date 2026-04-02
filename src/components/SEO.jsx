import { Helmet } from 'react-helmet-async'
import { useLocation } from '@/providers/LocationProvider.jsx'

const SEO = () => {
    const { getActiveSection } = useLocation()
    const activeSection = getActiveSection()

    const baseTitle = "Rubel Mondol | SEO Specialist Portfolio"
    const sectionTitle = activeSection ? activeSection.id.charAt(0).toUpperCase() + activeSection.id.slice(1) : ""
    const fullTitle = sectionTitle ? `${sectionTitle} | ${baseTitle}` : baseTitle

    const description = "Rubel Mondol is a professional SEO specialist helping businesses rank higher on Google with proven on-page, technical, and content SEO strategies."

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            
            {/* Twitter */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}

export default SEO

import Portfolio from "@/components/Portfolio.jsx"
import { getSectionData } from "@/utils/data"

export async function generateMetadata() {
    const data = getSectionData('cover')
    const name = data?.locales?.name || 'Rubel Mondol'
    const title = `${name} | SEO Specialist Portfolio`
    const description = data?.locales?.text || 'Professional SEO specialist helping businesses grow with data-driven SEO, technical optimization, and content strategy.'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
        twitter: {
            title,
            description,
        }
    }
}

export default function Home() {
    return <Portfolio />
}

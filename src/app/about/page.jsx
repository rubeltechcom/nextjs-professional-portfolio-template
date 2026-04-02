import { getSectionData } from "@/utils/data"
import Portfolio from "@/components/Portfolio.jsx"

export async function generateMetadata() {
  const data = getSectionData('cover')
  const title = data?.title?.locales?.en?.title_short_nav || 'About Me'
  const description = data?.articles?.find(a => a.id === 2)?.items?.[0]?.locales?.en?.text?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Learn more about Rubel Mondol.'
  
  return {
    title: `${title} | Rubel Mondol`,
    description: description,
  }
}

export default function AboutPage() {
    return <Portfolio />
}

import { getSectionData } from "@/utils/data"
import Portfolio from "@/components/Portfolio.jsx"

export async function generateMetadata() {
  const data = getSectionData('contact')
  const title = data?.title?.locales?.en?.title_short_nav || 'Contact'
  const description = data?.articles?.[0]?.items?.[0]?.locales?.en?.text?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Get in touch with Rubel Mondol.'
  
  return {
    title: `${title} | Rubel Mondol`,
    description: description,
  }
}

export default function ContactPage() {
    return <Portfolio />
}

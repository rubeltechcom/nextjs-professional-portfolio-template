import { getSectionData } from "@/utils/data"
import Portfolio from "@/components/Portfolio.jsx"

export async function generateMetadata() {
  const data = getSectionData('achievements')
  const title = data?.title?.locales?.en?.title_short_nav || 'Achievements'
  const description = data?.articles?.[0]?.items?.[0]?.locales?.en?.text?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Awards and achievements of Rubel Mondol.'
  
  return {
    title: `${title} | Rubel Mondol`,
    description: description,
  }
}

export default function AchievementsPage() {
    return <Portfolio />
}

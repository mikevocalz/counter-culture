import nextDynamic from 'next/dynamic'

const SearchClient = nextDynamic(() => import('./search-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function SearchPage() {
  return <SearchClient />
}

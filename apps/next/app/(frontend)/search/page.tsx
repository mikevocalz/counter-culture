import dynamic from 'next/dynamic'

const SearchClient = dynamic(() => import('./search-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function SearchPage() {
  return <SearchClient />
}

'use client'

import nextDynamic from 'next/dynamic'

const SearchScreen = nextDynamic(
  () => import('app/features/search/screen').then((m) => m.SearchScreen),
  { ssr: false }
)

export default function SearchClient() {
  return <SearchScreen />
}

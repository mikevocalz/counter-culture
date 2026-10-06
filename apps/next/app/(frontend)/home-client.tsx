'use client'

import nextDynamic from 'next/dynamic'

const HomeScreen = nextDynamic(
  () => import('app/features/home/screen.web').then((m) => m.HomeScreen),
  { ssr: false }
)

export default function HomeClient() {
  return <HomeScreen />
}

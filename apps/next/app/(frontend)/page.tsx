import nextDynamic from 'next/dynamic'

const HomeClient = nextDynamic(() => import('./home-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function Page() {
  return <HomeClient />
}

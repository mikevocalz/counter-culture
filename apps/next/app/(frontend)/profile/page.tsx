import nextDynamic from 'next/dynamic'

const ProfileClient = nextDynamic(() => import('./profile-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function Profile() {
  return <ProfileClient />
}

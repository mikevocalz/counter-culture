import dynamic from 'next/dynamic'

const ProfileClient = dynamic(() => import('./profile-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function Profile() {
  return <ProfileClient />
}

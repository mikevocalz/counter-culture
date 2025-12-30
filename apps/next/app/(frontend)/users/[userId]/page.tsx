import nextDynamic from 'next/dynamic'

const UserDetailsClient = nextDynamic(
  () => import('./user-details-client'),
  { ssr: false }
)

export const dynamic = 'force-dynamic'

export default function UserDetails() {
  return <UserDetailsClient />
}

import dynamic from 'next/dynamic'

const UserDetailsClient = dynamic(
  () => import('./user-details-client'),
  { ssr: false }
)

export const dynamic = 'force-dynamic'

export default function UserDetails() {
  return <UserDetailsClient />
}

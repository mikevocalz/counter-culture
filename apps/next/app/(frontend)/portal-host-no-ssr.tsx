'use client'

import dynamic from 'next/dynamic'

const PortalHostNoSSR = dynamic(
  () => import('@rn-primitives/portal').then((m) => m.PortalHost),
  { ssr: false },
)

export function PortalHostClientOnly() {
  return <PortalHostNoSSR />
}


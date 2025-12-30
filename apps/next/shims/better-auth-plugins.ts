const unavailableExport = (name: string) => () => {
  if (typeof window !== 'undefined') {
    console.warn(`${name} is not available in this version of better-auth.`)
  }
  return null
}

export const adminClient = unavailableExport('adminClient')
export const twoFactorClient = unavailableExport('twoFactorClient')
export const passkeyClient = unavailableExport('passkeyClient')

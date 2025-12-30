const unavailableExport = (name: string) => () => {
  throw new Error(`${name} is not available in this version of better-auth.`)
}

export const adminClient = unavailableExport('adminClient')
export const twoFactorClient = unavailableExport('twoFactorClient')
export const passkeyClient = unavailableExport('passkeyClient')

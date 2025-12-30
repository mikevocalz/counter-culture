import * as plugins from 'better-auth/client/plugins/index.js'

export * from 'better-auth/client/plugins/index.js'

export const passkeyClient =
  plugins.passkeyClient ??
  (() => {
    throw new Error('passkeyClient is not available in this version of better-auth.')
  })

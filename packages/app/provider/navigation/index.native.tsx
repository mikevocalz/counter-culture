export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Expo Router provides its own NavigationContainer
  // so we just pass through the children
  return <>{children}</>
}

import { SearchScreen } from 'app/features/search/screen.native'
import { Stack } from 'expo-router'

export default function SearchPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <SearchScreen />
    </>
  )
}

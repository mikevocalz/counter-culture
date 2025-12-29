'use client'

import { Header } from '@expo/html-elements'
import { View, Text, Pressable, Platform } from 'react-native'
import { MessageCircle, Search } from 'lucide-react-native'
import Logo from '@components/logo'
import { useRouter } from 'solito/navigation'
import { cn } from 'app/lib/utils'

export function AppHeader() {
  const router = useRouter()
  const searchRoute = Platform.OS === 'web' ? '/search' : '/search'
  const chatRoute = Platform.OS === 'web' ? '/chat' : '/chat'
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-2xl' : 'w-full'

  return (
    <Header className="border-b border-stone-800 bg-stone-950/90">
      <View
        className={cn(
          containerClass,
          'flex-row items-center justify-between px-4 pt-4 pb-3'
        )}
      >
        <View className="flex-row items-center gap-3">
          <Logo width={72} height={24} />
          {Platform.OS === 'web' ? (
            <Text className="text-sm font-semibold text-stone-100 tracking-widest">DVNT</Text>
          ) : null}
        </View>
        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={() => router.push(searchRoute)}
            className="h-9 w-9 items-center justify-center rounded-full bg-stone-900/60"
          >
            <Search size={18} color="#e7e5e4" />
          </Pressable>
          <Pressable
            onPress={() => router.push(chatRoute)}
            className="relative h-9 w-9 items-center justify-center rounded-full bg-stone-900/60"
          >
            <MessageCircle size={18} color="#e7e5e4" />
            <View className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-rose-500">
              <Text className="text-[10px] font-semibold text-white">3</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Header>
  )
}

'use client'

import { Nav } from '@expo/html-elements'
import { Platform, Pressable, View } from 'react-native'
import { Calendar, Heart, Home, Plus, User } from 'lucide-react-native'
import { cn } from 'app/lib/utils'
import { useRouter } from 'solito/navigation'

const navItems = [
  { key: 'home', label: 'Home', href: '/', icon: Home },
  { key: 'events', label: 'Events', href: '/events', icon: Calendar },
  { key: 'create', label: 'Create', icon: Plus, isCreate: true },
  { key: 'notifications', label: 'Notifications', href: '/notifications', icon: Heart },
  { key: 'profile', label: 'Profile', href: '/profile', icon: User },
]

export function BottomNav() {
  return (
    <Nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-800 bg-stone-950/90"
      style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1000, pointerEvents: 'auto' }}
    >
      <View className="mx-auto w-full max-w-2xl flex-row items-center justify-between gap-2 px-4 py-3">
        {navItems.map((item) => (
          <BottomNavItem key={item.key} item={item} />
        ))}
      </View>
    </Nav>
  )
}

function BottomNavItem({ item }: { item: (typeof navItems)[number] }) {
  const router = useRouter()
  const Icon = item.icon
  const buttonClassName = cn(
    'flex h-11 w-11 items-center justify-center rounded-2xl',
    item.isCreate && 'bg-emerald-500',
    !item.href && !item.isCreate && 'opacity-50'
  )
  const linkProps =
    Platform.OS === 'web' && item.href
      ? {
          href: item.href,
        }
      : undefined

  return (
    <Pressable
      {...linkProps}
      disabled={!item.href}
      onPress={() => item.href && router.push(item.href)}
      className={buttonClassName}
      accessibilityLabel={item.label}
      accessibilityRole="link"
    >
      <Icon size={22} color={item.isCreate ? '#0c0a09' : '#e7e5e4'} />
    </Pressable>
  )
}

'use client'

import { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { ArrowLeft, Play, Search, X } from 'lucide-react-native'
import { SolitoImage } from 'solito/image'
import ScreenScrollView from '@components/ScreenScrollView'
import { BottomNav } from '@components/BottomNav'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { useRouter } from 'solito/navigation'
import { cn } from 'app/lib/utils'

const categories = ['For You', 'Accounts', 'Tags', 'Places']

const trendingPosts = [
  {
    id: 't1',
    thumbnail: 'https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'video',
  },
  {
    id: 't2',
    thumbnail: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'image',
  },
  {
    id: 't3',
    thumbnail: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'video',
  },
  {
    id: 't4',
    thumbnail: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'image',
  },
  {
    id: 't5',
    thumbnail: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'video',
  },
  {
    id: 't6',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'image',
  },
  {
    id: 't7',
    thumbnail: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'image',
  },
  {
    id: 't8',
    thumbnail: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'video',
  },
  {
    id: 't9',
    thumbnail: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'image',
  },
]

const suggestedAccounts = [
  {
    username: 'photography_daily',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    followers: '2.4M',
    category: 'Photography',
  },
  {
    username: 'fitness_goals',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    followers: '1.8M',
    category: 'Fitness',
  },
  {
    username: 'food_network',
    avatar: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=200',
    followers: '5.2M',
    category: 'Food & Drink',
  },
  {
    username: 'travel_explore',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    followers: '890K',
    category: 'Travel',
  },
]

export function SearchScreen() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('For You')
  const [isFocused, setIsFocused] = useState(false)

  const showResults = searchQuery.length > 0 || isFocused
  const columns = width >= 768 ? 4 : 3
  const gutter = 4
  const safeWidth = width || 360
  const maxWidth = Math.min(safeWidth, 600)
  const tileWidth = Math.floor((maxWidth - gutter * (columns + 1)) / columns)

  const getTileHeight = useMemo(
    () => (index: number) => {
      const pattern = index % 6
      if (pattern === 0) return Math.round(tileWidth * 1.5)
      if (pattern === 2) return Math.round(tileWidth * 1.3)
      if (pattern === 4) return Math.round(tileWidth * 1.2)
      return tileWidth
    },
    [tileWidth]
  )

  const masonryColumns = useMemo(() => {
    const cols: Array<Array<typeof trendingPosts[number] & { height: number }>> = Array.from({ length: columns }, () => [])
    const colHeights = Array(columns).fill(0)
    
    trendingPosts.forEach((post, index) => {
      const height = getTileHeight(index)
      const shortestColIndex = colHeights.indexOf(Math.min(...colHeights))
      cols[shortestColIndex].push({ ...post, height })
      colHeights[shortestColIndex] += height + gutter
    })
    
    return cols
  }, [columns, getTileHeight])

  return (
    <View className="flex-1 bg-stone-950">
      <View className="border-b border-stone-800 px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-stone-900/60"
          >
            <ArrowLeft size={18} color="#e7e5e4" />
          </Pressable>
          <View className="flex-1 flex-row items-center rounded-xl bg-stone-900/70 px-3">
            <Search size={16} color="#a8a29e" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search"
              placeholderTextColor="#78716c"
              className="flex-1 px-2 py-2 text-sm text-stone-100"
            />
            {searchQuery.length > 0 ? (
              <Pressable onPress={() => setSearchQuery('')}>
                <X size={16} color="#a8a29e" />
              </Pressable>
            ) : null}
          </View>
        </View>

        {showResults ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 12 }}>
            <View className="flex-row gap-2">
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  className={cn(
                    'rounded-full px-4 py-1.5',
                    activeCategory === category ? 'bg-stone-100' : 'bg-stone-900/70'
                  )}
                >
                  <Text className={cn('text-sm font-medium', activeCategory === category ? 'text-stone-950' : 'text-stone-300')}>
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        ) : null}
      </View>

      {showResults ? (
        <ScreenScrollView className="flex-1 pb-24">
          <View className="px-4 py-4">
            {(activeCategory === 'Accounts' || activeCategory === 'For You') && (
              <View className="gap-4">
                <Text className="text-sm font-semibold text-stone-500">Suggested for you</Text>
                {suggestedAccounts.map((account) => (
                  <View key={account.username} className="flex-row items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={account.avatar} />
                      <AvatarFallback>{account.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-stone-100">{account.username}</Text>
                      <Text className="text-xs text-stone-500">
                        {account.followers} followers · {account.category}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScreenScrollView>
      ) : (
        <ScreenScrollView 
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: 120,
            paddingTop: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View 
            className="flex-row items-start"
            style={{ 
              width: maxWidth, 
              alignSelf: 'center',
              paddingHorizontal: gutter,
              gap: gutter,
            }}
          >
            {masonryColumns.map((column, colIndex) => (
              <View 
                key={colIndex} 
                style={{ 
                  flex: 1,
                  gap: gutter,
                }}
              >
                {column.map((item) => (
                  <Pressable
                    key={item.id}
                    className="relative overflow-hidden rounded-lg bg-stone-900"
                    style={{
                      width: '100%',
                      height: item.height,
                    }}
                  >
                    <SolitoImage 
                      src={item.thumbnail} 
                      alt="Trending post" 
                      contentFit="cover"
                      fill
                      style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />
                    {item.type === 'video' ? (
                      <View className="absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full bg-black/50">
                        <Play size={12} color="#f5f5f4" fill="#f5f5f4" />
                      </View>
                    ) : null}
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </ScreenScrollView>
      )}

      <BottomNav />
    </View>
  )
}

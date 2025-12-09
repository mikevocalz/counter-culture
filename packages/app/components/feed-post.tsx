'use client'

import { View, Pressable, Text } from 'react-native'
import { Article, Header, Section, P, Footer, Nav, Time } from '@expo/html-elements'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Heart, MessageCircle } from 'lucide-react'
import { SolitoImage } from 'solito/image'
import { useState } from 'react'

interface Post {
  id: string
  user: {
    name: string
    avatar: string
    username: string
  }
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  location?: string
  commentPreviews?: Array<{
    user: string
    avatar: string
    text: string
  }>
}

export function FeedPost({ post }: { post: Post }) {
  const [showAllComments, setShowAllComments] = useState(false)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const COMMENT_THRESHOLD = 5
  const shouldUseBottomSheet = post.comments > COMMENT_THRESHOLD

  const handleCommentClick = () => {
    if (shouldUseBottomSheet) {
      setIsBottomSheetOpen(true)
    } else {
      setShowAllComments(!showAllComments)
    }
  }

  return (
    <Article className="relative overflow-visible bg-stone-900/20 rounded-2xl border w-full max-w-3xl px-4 py-5 mb-2 shadow-sm shadow-white/5">
      <View className="absolute !-inset-2 rounded-2xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-75 blur-sm z-0 pointer-events-none" aria-hidden />
      <View className="relative !z-10">
        {/* User Info */}
        <Header className="flex-row items-center mb-3">
          <Avatar
            alt={post.user.name}
            className="h-10 w-10 ring-2 ring-gray-700 mr-3"
          >
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>
              <Text className="text-white font-bold">{post.user.name[0]}</Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text className="text-white text-base font-semibold">
              {post.user.name}
            </Text>
            <Time dateTime={post.timestamp}>
              <Text className="text-gray-400 text-xs">{post.timestamp}</Text>
            </Time>
          </View>
        </Header>

        {/* Content */}
        <Section className="mb-3">
          <P className="text-white text-[15px] leading-[22px] m-0">
            {post.content}
          </P>
        </Section>

        {/* Image */}
        {post.image && (
          <Section className="relative w-full aspect-video rounded-xl overflow-hidden mb-2.5 bg-gray-700">
            <SolitoImage
              src={post.image}
              alt="Post image"
              fill
              contentFit="cover"
            />
          </Section>
        )}

        {/* Engagement Bar */}
        <Footer className="flex-row items-center gap-5 pt-3 border-t border-gray-800">
          <Nav className="flex-row items-center gap-5" aria-label="Post actions">
            {/* Like */}
            <Pressable
              className="flex-row items-center gap-1.5"
              aria-label={`Like post, ${post.likes} likes`}
            >
              <Heart size={20} color="#D1D5DB" />
              <Text className="text-sm text-gray-300">{post.likes}</Text>
            </Pressable>

            {/* Comments */}
            <Pressable
              onPress={handleCommentClick}
              className="flex-row items-center gap-1.5"
              aria-label={`View comments, ${post.comments} comments`}
            >
              <MessageCircle size={20} color="#D1D5DB" />
              <Text className="text-sm text-gray-300">{post.comments}</Text>
            </Pressable>
          </Nav>
        </Footer>
      </View>
    </Article>
  )
}

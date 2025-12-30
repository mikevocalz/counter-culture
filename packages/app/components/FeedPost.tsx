'use client'

import { useCallback, useRef, useState } from 'react'
import { Platform, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useRouter } from 'solito/navigation'
import { SolitoImage } from 'solito/image'
import {
  BadgeCheck,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  Send,
} from 'lucide-react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { VideoMedia } from '@components/VideoMedia'
import { useBookmark, useCarousel, useDoubleTap, useLike } from 'app/hooks'
import { CommentsDialog } from '@components/CommentsDialog'
import { countThreadComments, type Post } from 'app/lib/data'
import { cn } from 'app/lib/utils'
import { useCommentsSheetStore } from 'app/store'

type FeedPostProps = {
  post: Post
  onOpen?: () => void
  enableMediaPress?: boolean
  onControlPress?: () => void
  enablePlayToggle?: boolean
  isScreenFocused?: boolean
}

export function FeedPost({
  post,
  onOpen,
  enableMediaPress = true,
  onControlPress,
  enablePlayToggle = true,
  isScreenFocused = true,
}: FeedPostProps) {
  const router = useRouter()
  const { isLiked, likeCount, toggleLike, like } = useLike({ initialCount: post.likes })
  const { isSaved, toggleSave } = useBookmark()
  const { currentSlide, goToSlide } = useCarousel({ totalSlides: post.media.length || 1 })
  const [showComments, setShowComments] = useState(false)
  const [carouselWidth, setCarouselWidth] = useState(1)
  const scrollRef = useRef<ScrollView>(null)
  const { openForPost } = useCommentsSheetStore()
  const commentCount = countThreadComments(post.comments)
  const postHref = `/username/${post.id}?username=${encodeURIComponent(post.author.username)}`
  const handleOpen = onOpen ?? (() => router.push(postHref))

  const { onTap } = useDoubleTap({
    onDoubleTap: like,
    onSingleTap: handleOpen,
  })

  const likedColor = isLiked ? '#f43f5e' : '#e7e5e4'
  const savedColor = isSaved ? '#e7e5e4' : '#a8a29e'

  if (!post.media.length) return null

  const handleLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number } } }) => {
      const width = Math.round(event.nativeEvent.layout.width)
      if (width > 0 && width !== carouselWidth) {
        setCarouselWidth(width)
      }
    },
    [carouselWidth]
  )

  const handleDotPress = useCallback(
    (index: number) => {
      goToSlide(index)
      if (carouselWidth > 1) {
        scrollRef.current?.scrollTo({ x: index * carouselWidth, animated: true })
      }
    },
    [carouselWidth, goToSlide]
  )

  const handleScrollEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      if (carouselWidth < 2) return
      const offsetX = event.nativeEvent.contentOffset.x
      const nextIndex = Math.round(offsetX / carouselWidth)
      goToSlide(nextIndex)
    },
    [carouselWidth, goToSlide]
  )

  const handleOpenComments = useCallback(() => {
    if (Platform.OS === 'web') {
      setShowComments(true)
      return
    }
    openForPost(post.id, post.comments)
  }, [openForPost, post.comments, post.id])

  return (
    <>
      <View className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60">
        <View className="flex-row items-center justify-between px-4 pt-4">
          <View className="flex-row items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <View>
              <View className="flex-row items-center gap-1">
                <Text className="text-sm font-semibold text-stone-100">{post.author.username}</Text>
                {post.author.verified ? <BadgeCheck size={14} color="#38bdf8" /> : null}
              </View>
              {post.location ? <Text className="text-xs text-stone-400">{post.location}</Text> : null}
            </View>
          </View>
          <Pressable className="h-8 w-8 items-center justify-center rounded-full">
            <MoreHorizontal size={18} color="#a8a29e" />
          </Pressable>
        </View>

        <View className="mt-3">
          <View
            onLayout={handleLayout}
            className="relative w-full overflow-hidden bg-stone-900"
            style={{ aspectRatio: 1 }}
          >
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
              scrollEnabled={post.media.length > 1}
            >
              {post.media.map((media, index) => {
                const Wrapper = enableMediaPress ? Pressable : View
                return (
                  <Wrapper
                    key={`${post.id}-media-${index}`}
                    {...(enableMediaPress ? { onPress: onTap } : {})}
                    style={{ width: carouselWidth, aspectRatio: 1 }}
                  >
                    <View style={StyleSheet.absoluteFillObject}>
                      {media.type === 'video' ? (
                      <VideoMedia
                        source={media.url}
                        postId={post.id}
                        isActive={index === currentSlide && isScreenFocused}
                        enableTapToMute={false}
                        enablePlayToggle={enablePlayToggle}
                        onControlPress={onControlPress}
                        videoPointerEvents={enableMediaPress ? 'auto' : 'none'}
                        showMuteButton={enableMediaPress}
                      />
                      ) : (
                        <SolitoImage
                          src={media.url}
                          alt={`Post by ${post.author.username}`}
                          fill
                          contentFit="cover"
                        />
                      )}
                    </View>
                    {media.type === 'video' && !enablePlayToggle ? (
                      <View className="absolute inset-0 items-center justify-center">
                        <View className="h-16 w-16 items-center justify-center rounded-full bg-black/40">
                          <Play size={28} color="#f5f5f4" fill="#f5f5f4" />
                        </View>
                      </View>
                    ) : null}
                  </Wrapper>
                )
              })}
            </ScrollView>

            {post.media.length > 1 ? (
              <View className="absolute bottom-4 left-0 right-0 items-center">
                <View className="flex-row gap-2">
                  {post.media.map((_, index) => (
                    <Pressable
                      key={`${post.id}-dot-${index}`}
                      onPress={() => handleDotPress(index)}
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        index === currentSlide ? 'w-4 bg-emerald-400' : 'bg-stone-400'
                      )}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        </View>

        <View className="flex-row items-center justify-between px-4 pt-3">
          <View className="flex-row items-center gap-4">
            <Pressable onPress={toggleLike}>
              <Heart size={22} color={likedColor} fill={isLiked ? likedColor : 'transparent'} />
            </Pressable>
            <Pressable onPress={handleOpenComments}>
              <MessageCircle size={22} color="#e7e5e4" />
            </Pressable>
            <Pressable>
              <Send size={20} color="#e7e5e4" />
            </Pressable>
          </View>
          <Pressable onPress={toggleSave}>
            <Bookmark size={22} color={savedColor} fill={isSaved ? savedColor : 'transparent'} />
          </Pressable>
        </View>

        <View className="px-4 pb-4 pt-2">
          <Text className="text-sm font-semibold text-stone-100">{likeCount.toLocaleString()} likes</Text>
          {post.caption ? (
            <Text className="mt-1 text-sm text-stone-200">
              <Text className="font-semibold text-stone-100">{post.author.username} </Text>
              {post.caption}
            </Text>
          ) : null}
          {commentCount > 0 ? (
            <Pressable onPress={handleOpenComments}>
              <Text className="mt-1 text-sm text-stone-500">View all {commentCount} comments</Text>
            </Pressable>
          ) : null}
          <Text className="mt-1 text-xs uppercase text-stone-500">{post.timeAgo}</Text>
        </View>
      </View>

      {Platform.OS === 'web' ? (
        <CommentsDialog
          open={showComments}
          onOpenChange={setShowComments}
          comments={post.comments}
          commentCount={commentCount}
        />
      ) : null}
    </>
  )
}

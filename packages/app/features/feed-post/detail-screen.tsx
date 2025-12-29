'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Header } from '@expo/html-elements'
import { Platform, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useParams, useRouter } from 'solito/navigation'
import { SolitoImage } from 'solito/image'
import ScreenScrollView from '@components/ScreenScrollView'
import { BottomNav } from '@components/BottomNav'
import { VideoMedia } from '@components/VideoMedia'
import { useCarousel } from 'app/hooks'
import { countThreadComments, feedPosts } from 'app/lib/data'
import {
  PROFILE_POSTS,
  PROFILE_SAVED_POSTS,
  PROFILE_TAGGED_POSTS,
  PROFILE_USERNAME,
} from 'app/lib/profile-posts'
import type { Post as ProfilePost } from 'app/components/types/Post'
import type { Comment as FeedComment } from 'app/lib/data'
import { cn } from 'app/lib/utils'

type MediaItem = {
  type: 'image' | 'video'
  url: string
}

function buildProfileMedia(post: ProfilePost): MediaItem[] {
  if (post.type === 'video' && post.videoUrl) {
    return [{ type: 'video', url: post.videoUrl }]
  }
  if (post.type === 'carousel' && post.images?.length) {
    return post.images.map((url) => ({ type: 'image', url }))
  }
  return [{ type: 'image', url: post.image }]
}

type CommentView = {
  id: string
  username: string
  text: string
  timeAgo: string
  likes: number
  depth: number
}

function flattenFeedComments(comments: FeedComment[], depth = 0): CommentView[] {
  return comments.flatMap((comment) => [
    {
      id: comment.id,
      username: comment.username,
      text: comment.text,
      timeAgo: comment.timeAgo,
      likes: comment.likes,
      depth,
    },
    ...(comment.replies ? flattenFeedComments(comment.replies, depth + 1) : []),
  ])
}

type ProfileComment = NonNullable<ProfilePost['commentList']>[number]

function flattenProfileComments(comments: ProfileComment[], depth = 0): CommentView[] {
  return comments.flatMap((comment) => [
    {
      id: comment.id,
      username: comment.username,
      text: comment.text,
      timeAgo: comment.timeAgo,
      likes: comment.likes,
      depth,
    },
    ...(comment.replies ? flattenProfileComments(comment.replies, depth + 1) : []),
  ])
}

export function FeedDetailsScreen() {
  const router = useRouter()
  const params = useParams<Record<string, string>>()
  const postId = params?.postId ?? params?.feedid
  const username = params?.username
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-2xl' : 'w-full'
  const feedPost = feedPosts.find((item) => item.id === postId)
  const feedMatchesUser = feedPost && (!username || feedPost.author.username === username)
  const [carouselWidth, setCarouselWidth] = useState(1)
  const scrollRef = useRef<ScrollView>(null)
  const profileCandidates = useMemo(
    () => [...PROFILE_POSTS, ...PROFILE_SAVED_POSTS, ...PROFILE_TAGGED_POSTS],
    []
  )
  const profilePost =
    username === PROFILE_USERNAME
      ? profileCandidates.find((item) => item.id.toString() === postId)
      : undefined

  const profileMedia = profilePost ? buildProfileMedia(profilePost) : []
  const feedMedia = feedPost
    ? feedPost.media.map((media) => ({ type: media.type, url: media.url }))
    : []
  const media = feedPost ? feedMedia : profileMedia
  const { currentSlide, goToSlide } = useCarousel({ totalSlides: media.length || 1 })
  const hasPost = Boolean(feedMatchesUser && feedPost) || Boolean(profilePost)
  const hasMedia = media.length > 0
  const feedCommentList = feedPost ? flattenFeedComments(feedPost.comments) : []
  const profileCommentList = profilePost?.commentList
    ? flattenProfileComments(profilePost.commentList)
    : []
  const commentList = feedPost ? feedCommentList : profileCommentList ?? []

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

  useEffect(() => {
    if (Platform.OS !== 'web' || media.length < 2) return
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable) {
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleDotPress((currentSlide + 1) % media.length)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handleDotPress((currentSlide - 1 + media.length) % media.length)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentSlide, handleDotPress, media.length])

  return (
    <View className="flex-1 bg-stone-950">
      <ScreenScrollView className="flex-1 pb-24">
        <View className={cn(containerClass, 'px-4 py-6')}>
          {hasPost && hasMedia ? (
            <View className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60">
              <View
                onLayout={handleLayout}
                className="relative w-full overflow-hidden bg-stone-950"
                style={{ aspectRatio: 1 }}
              >
                <ScrollView
                  ref={scrollRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={handleScrollEnd}
                  scrollEnabled={media.length > 1}
                >
                  {media.map((item, index) => (
                    <View key={`media-${index}`} style={{ width: carouselWidth, aspectRatio: 1 }}>
                      <View style={StyleSheet.absoluteFillObject}>
                        {item.type === 'video' ? (
                          <VideoMedia source={item.url} isActive={index === currentSlide} />
                        ) : (
                          <SolitoImage src={item.url} alt="Post media" fill contentFit="cover" />
                        )}
                      </View>
                    </View>
                  ))}
                </ScrollView>

                {media.length > 1 ? (
                  <View className="absolute bottom-4 left-0 right-0 items-center">
                    <View className="flex-row gap-2">
                      {media.map((_, index) => (
                        <Pressable
                          key={`dot-${index}`}
                          onPress={() => handleDotPress(index)}
                          className={
                            index === currentSlide
                              ? 'h-1.5 w-4 rounded-full bg-emerald-400'
                              : 'h-1.5 w-1.5 rounded-full bg-stone-400'
                          }
                        />
                      ))}
                    </View>
                  </View>
                ) : null}
              </View>

              <View className="px-4 pb-4 pt-3">
                <Text className="text-sm font-semibold text-stone-100">
                  {(feedPost?.likes ?? profilePost?.likes ?? 0).toLocaleString()} likes
                </Text>
                {(feedPost?.caption ?? profilePost?.caption) ? (
                  <Text className="mt-1 text-sm text-stone-200">
                    <Text className="font-semibold text-stone-100">
                      {feedPost?.author.username ?? PROFILE_USERNAME}{' '}
                    </Text>
                    {feedPost?.caption ?? profilePost?.caption}
                  </Text>
                ) : null}
                {commentList.length ? (
                  <View className="mt-4 gap-3 border-t border-stone-800/70 pt-4">
                    {commentList.map((comment) => (
                      <View
                        key={comment.id}
                        className="flex-row gap-3"
                        style={{ marginLeft: comment.depth * 12 }}
                      >
                        <View className="h-7 w-7 items-center justify-center rounded-full bg-stone-800/80">
                          <Text className="text-xs font-semibold text-stone-200">
                            {comment.username.slice(0, 2).toUpperCase()}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm text-stone-200">
                            <Text className="font-semibold text-stone-100">
                              {comment.username}{' '}
                            </Text>
                            {comment.text}
                          </Text>
                          <Text className="mt-1 text-xs text-stone-500">
                            {comment.timeAgo} · {comment.likes} likes
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                <Text className="mt-1 text-xs uppercase text-stone-500">
                  {feedPost?.timeAgo ?? profilePost?.timestamp}
                </Text>
              </View>
            </View>
          ) : (
            <View className="items-center gap-3 rounded-2xl border border-stone-800 bg-stone-900/40 p-6">
              <Text className="text-base font-semibold text-stone-100">Post not found</Text>
              <Text className="text-sm text-stone-400">We could not find that feed item.</Text>
            </View>
          )}
        </View>
      </ScreenScrollView>

      <BottomNav />
    </View>
  )
}

import { useState, useCallback } from 'react'
import { ScrollView, View, Text, Pressable, BackHandler } from 'react-native'
import { Album, Film, Bookmark, Tag } from 'lucide-react-native'
import { Motion, AnimatePresence } from '@legendapp/motion'
import { useRouter } from 'solito/navigation'
import { useEffect } from 'react'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs'
import { PostGrid } from '@components/PostGrid'
import { UserProfileHeader } from '../../components/ui/UserProfileHeader/UserProfileHeader.native'
import { ScreenScrollView } from 'app/components'
import {
  PROFILE_POSTS,
  PROFILE_SAVED_POSTS,
  PROFILE_TAGGED_POSTS,
  PROFILE_USERNAME,
} from 'app/lib/profile-posts'

export function ProfileScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(false)
  const videoPosts = PROFILE_POSTS.filter((post) => post.type === 'video')

  const handleCloseScreen = useCallback(() => {
    // Handle screen closing - try to go back first, then navigate home
    try {
      router.back()
    } catch (error) {
      router.replace('/')
    }
  }, [router])

  useEffect(() => {
    const backAction = () => {
      handleCloseScreen()
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [handleCloseScreen])

  return (
    <View className="flex-1 bg-stone-950">
      <ScreenScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior="always"
        className="flex-1"
      >
        <View className="w-full px-4 pt-4 pb-24">
          <UserProfileHeader
            username={PROFILE_USERNAME}
            following={following}
            onToggleFollow={() => setFollowing((f) => !f)}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full !flex !flex-row">
            <TabsList style={{width: 'auto', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(28, 28, 28, 0.6)', borderColor: 'rgba(68, 68, 68, 0.8)', borderWidth: 1}} className="!flex !flex-row !flex-nowrap my-4 gap-4 px-4 py-2 self-center">
              <TabsTrigger value="posts" style={{flexDirection: 'row'}} className="mx-1">
                <View style={{ flexDirection: 'row'}} className="!flex-row items-center gap-3">
                  <Album
                    size={16}
                    style={{ marginRight: 8 }}
                    color={activeTab === 'posts' ? '#f5f5f4' : '#737373'}
                  />
                  <Text
                    style={{
                      color: activeTab === 'posts' ? '#f5f5f4' : '#a3a3a3',
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Posts
                  </Text>
                </View>
              </TabsTrigger>
              <TabsTrigger value="video" style={{flexDirection: 'row'}} className="mx-1">
                <View style={{ flexDirection: 'row'}} className="!flex-row items-center gap-3">
                  <Film
                    size={16}
                    style={{ marginRight: 8 }}
                    color={activeTab === 'video' ? '#f5f5f4' : '#737373'}
                  />
                  <Text
                    style={{
                      color: activeTab === 'video' ? '#f5f5f4' : '#a3a3a3',
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Video
                  </Text>
                </View>
              </TabsTrigger>
              <TabsTrigger value="saved" style={{flexDirection: 'row'}} className="mx-1">
                <View style={{ flexDirection: 'row'}} className="!flex-row items-center gap-3">
                  <Bookmark
                    size={16}
                    style={{ marginRight: 8 }}
                    color={activeTab === 'saved' ? '#f5f5f4' : '#737373'}
                  />
                  <Text
                    style={{
                      color: activeTab === 'saved' ? '#f5f5f4' : '#a3a3a3',
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Saved
                  </Text>
                </View>
              </TabsTrigger>
              <TabsTrigger value="tagged" style={{flexDirection: 'row'}} className="mx-1">
                <View style={{ flexDirection: 'row'}} className="!flex-row items-center gap-3">
                  <Tag
                    size={16}
                    style={{ marginRight: 8 }}
                    color={activeTab === 'tagged' ? '#f5f5f4' : '#737373'}
                  />
                  <Text
                    style={{
                      color: activeTab === 'tagged' ? '#f5f5f4' : '#a3a3a3',
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Tagged
                  </Text>
                </View>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="posts">
            <PostGrid initialPosts={PROFILE_POSTS} username={PROFILE_USERNAME} />
          </TabsContent>
          <TabsContent value="video">
            <PostGrid initialPosts={videoPosts} username={PROFILE_USERNAME} />
          </TabsContent>
          <TabsContent value="saved">
            <PostGrid initialPosts={PROFILE_SAVED_POSTS} username={PROFILE_USERNAME} />
          </TabsContent>
          <TabsContent value="tagged">
            <PostGrid initialPosts={PROFILE_TAGGED_POSTS} username={PROFILE_USERNAME} />
          </TabsContent>
        </Tabs>
        </View>
      </ScreenScrollView>
    </View>
  )
}

export default ProfileScreen

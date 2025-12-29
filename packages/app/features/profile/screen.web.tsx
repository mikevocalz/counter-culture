import { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Album, Film, Bookmark, Tag } from 'lucide-react'
import { Motion, AnimatePresence } from '@legendapp/motion'

import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { PostGrid } from '../../components/PostGrid'
import { UserProfileHeader } from '../../components/ui/UserProfileHeader/UserProfileHeader.web'
import { ScreenScrollView } from 'app/components'
import {
  PROFILE_POSTS,
  PROFILE_SAVED_POSTS,
  PROFILE_TAGGED_POSTS,
  PROFILE_USERNAME,
} from 'app/lib/profile-posts'

export function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(false)
  const videoPosts = PROFILE_POSTS.filter((post) => post.type === 'video')

  return (
   <ScreenScrollView
   showsVerticalScrollIndicator={false}
   nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      contentInsetAdjustmentBehavior="always"
      className="flex-1 w-full !pt-[20px] md:!pb-[400px] h-full !bg-stone-950 !self-center max-w-7xl min-w-screen flex-grow px-2"
    >

      
      <UserProfileHeader
        username={PROFILE_USERNAME}
        following={following}
        onToggleFollow={() => setFollowing((f) => !f)}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row' }}>
        <TabsList className="flex flex-row flex-nowrap my-4 bg-stone-900/60 border border-stone-800/80 max-w-5xl w-auto gap-2 px-4 py-2 self-center">
          <TabsTrigger value="posts" className="mx-1">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Album
                size={16}
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
          <TabsTrigger value="video" className="mx-1">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Film
                size={16}
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
          <TabsTrigger value="saved" className="mx-1">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Bookmark
                size={16}
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
          <TabsTrigger value="tagged" className="mx-1">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Tag
                size={16}
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
      </ScrollView>
      </Tabs> 

      <AnimatePresence>
        <Motion.View key={activeTab} style={{ flex: 1 }}>
          <View className="mx-auto w-full max-w-5xl rounded-2xl border border-stone-900/70 bg-stone-950/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            {activeTab === 'posts' && <PostGrid initialPosts={PROFILE_POSTS} username={PROFILE_USERNAME} />}

            {activeTab === 'video' && <PostGrid initialPosts={videoPosts} username={PROFILE_USERNAME} />}

            {activeTab === 'saved' && <PostGrid initialPosts={PROFILE_SAVED_POSTS} username={PROFILE_USERNAME} />}

            {activeTab === 'tagged' && <PostGrid initialPosts={PROFILE_TAGGED_POSTS} username={PROFILE_USERNAME} />}
          </View>
        </Motion.View>
      </AnimatePresence>
    </ScreenScrollView>
  )
}

export default ProfileScreen

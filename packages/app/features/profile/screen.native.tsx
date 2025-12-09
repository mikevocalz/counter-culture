import { useState } from 'react'
import { View, Text } from 'react-native'
import { Album, Film, Bookmark, Tag } from 'lucide-react-native'
import { Motion, AnimatePresence } from '@legendapp/motion'

import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { PostGrid } from '@components/PostGrid'
import { UserProfileHeader } from '@components/UserProfileHeader'
import { Post } from '@components/types/Post'
import { ScreenScrollView } from 'app/components'


const POSTS: Post[] = [
  {
    id: 1,
    image: 'https://picsum.photos/600/600?1',
    caption: 'New perspectives on design',
    likes: 2847,
    comments: 89,
    timestamp: '2h ago',
  },
  {
    id: 2,
    image: 'https://picsum.photos/600/600?2',
    caption: 'Minimalist architecture',
    likes: 1923,
    comments: 54,
    timestamp: '1d ago',
  },
  {
    id: 3,
    image: 'https://picsum.photos/600/600?3',
    caption: 'Studio late-night session',
    likes: 1580,
    comments: 32,
    timestamp: '3h ago',
  },
  {
    id: 4,
    image: 'https://picsum.photos/600/600?4',
    caption: 'Textures and tones',
    likes: 980,
    comments: 21,
    timestamp: '5h ago',
  },
  {
    id: 5,
    image: 'https://picsum.photos/600/600?5',
    caption: 'Concrete poetry',
    likes: 2140,
    comments: 64,
    timestamp: '8h ago',
  },
  {
    id: 6,
    image: 'https://picsum.photos/600/600?6',
    caption: 'Light and shadow study',
    likes: 1340,
    comments: 27,
    timestamp: '12h ago',
  },
  {
    id: 7,
    image: 'https://picsum.photos/600/600?7',
    caption: 'Analog noise',
    likes: 890,
    comments: 18,
    timestamp: '1d ago',
  },
  {
    id: 8,
    image: 'https://picsum.photos/600/600?8',
    caption: 'City fragments',
    likes: 1760,
    comments: 39,
    timestamp: '2d ago',
  },
  {
    id: 9,
    image: 'https://picsum.photos/600/600?9',
    caption: 'Infrared skyline',
    likes: 2043,
    comments: 51,
    timestamp: '3d ago',
  },
  {
    id: 10,
    image: 'https://picsum.photos/600/600?10',
    caption: 'Broken symmetry',
    likes: 1120,
    comments: 24,
    timestamp: '4d ago',
  },
  {
    id: 11,
    image: 'https://picsum.photos/600/600?11',
    caption: 'Night drive reflections',
    likes: 1870,
    comments: 42,
    timestamp: '5d ago',
  },
  {
    id: 12,
    image: 'https://picsum.photos/600/600?12',
    caption: 'Monolith study',
    likes: 920,
    comments: 17,
    timestamp: '6d ago',
  },
  {
    id: 13,
    image: 'https://picsum.photos/600/600?13',
    caption: 'Chrome memories',
    likes: 2430,
    comments: 73,
    timestamp: '1w ago',
  },
]

export function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(false)

  return (
   <ScreenScrollView
   showsVerticalScrollIndicator={false}
   nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      contentInsetAdjustmentBehavior="always"
      className="flex-1 w-full !pt-[20px] md:!pb-[400px] h-full !bg-stone-950 !self-center max-w-7xl min-w-screen flex-grow px-2"
    >
      <UserProfileHeader
        username="alexrivera"
        following={following}
        onToggleFollow={() => setFollowing((f) => !f)}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-row my-3 bg-stone-900/60 border border-stone-800/80 h-[40px] w-full max-w-3xl self-center  gap-2">
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
      </Tabs>

      <AnimatePresence>
        <Motion.View key={activeTab} style={{ flex: 1 }}>
          {activeTab === 'posts' && <PostGrid initialPosts={POSTS} />}

          {activeTab !== 'posts' && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {activeTab === 'video' && <Film size={48} color="#a3a3a3" />}
              {activeTab === 'saved' && <Bookmark size={48} color="#a3a3a3" />}
              {activeTab === 'tagged' && <Tag size={48} color="#a3a3a3" />}

              <Text style={{ fontSize: 18, fontWeight: '700', color: '#f5f5f4' }}>
                {activeTab === 'video'
                  ? 'No videos yet'
                  : activeTab === 'saved'
                  ? 'No saved posts yet'
                  : 'No tagged posts yet'}
              </Text>

              <Text style={{ opacity: 0.7, color: '#d4d4d4' }}>
                {activeTab === 'video'
                  ? 'When you share videos, they will appear here.'
                  : activeTab === 'saved'
                  ? 'Posts you save will show up here.'
                  : 'Posts you are tagged in will show up here.'}
              </Text>
            </View>
          )}
        </Motion.View>
      </AnimatePresence>
    </ScreenScrollView>
  )
}

export default ProfileScreen

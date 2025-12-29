import { useState } from 'react'
import { View, Text } from 'react-native'
import { Album } from 'lucide-react'
import { Motion, AnimatePresence } from '@legendapp/motion'

import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { PostGrid } from './PostGrid'
import { UserProfileHeader } from './ui/UserProfileHeader'
import { Post } from './types/Post'

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
]

export default function UserProfileScreen() {
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(false)

  return (
    <View style={{ flex: 1 }}>
      <UserProfileHeader
        username="alexrivera"
        following={following}
        avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        onToggleFollow={() => setFollowing((f) => !f)}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="posts">
            <Text>Posts</Text>
          </TabsTrigger>
          <TabsTrigger value="video">
            <Text>Video</Text>
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Text>Saved</Text>
          </TabsTrigger>
          <TabsTrigger value="tagged">
            <Text>Tagged</Text>
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
              <Album size={48} color="#a3a3a3" />
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#f5f5f4' }}>
                No content yet
              </Text>
              <Text style={{ opacity: 0.7, color: '#d4d4d4' }}>Content will appear here</Text>
            </View>
          )}
        </Motion.View>
      </AnimatePresence>
    </View>
  )
}

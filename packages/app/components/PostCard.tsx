import { View, Text, StyleSheet } from 'react-native'
import { Motion } from '@legendapp/motion'
import { SolitoImage } from 'solito/image'
import { Eye, Layers, Play } from 'lucide-react-native'

import { Post } from './types/Post'

export function PostCard({ post, onPress }: { post: Post; onPress?: () => void }) {
  const showVideo = post.type === 'video'
  const showCarousel = post.type === 'carousel'

  return (
    <Motion.Pressable onPress={onPress} style={styles.card}>
      <Motion.View
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 1.1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
      >
        <SolitoImage
        contentFit='contain'
          src={post.image}
          width={200}
          height={140}
          style={styles.image}
          alt="Post image"
        />
        {showVideo || showCarousel ? (
          <View style={styles.badge}>
            {showVideo ? (
              <Play size={14} color="#f5f5f4" fill="#f5f5f4" />
            ) : (
              <Layers size={14} color="#f5f5f4" />
            )}
          </View>
        ) : null}

        <View style={styles.body}>
          <View style={styles.viewsRow}>
            <Eye size={14} color="#f5f5f4" />
            <Text style={styles.text}>{post.likes} views</Text>
          </View>
        </View>
      </Motion.View>
    </Motion.Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#1c1917',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    flexShrink: 1,
    width: '100%',
    aspectRatio: 4/4,
  },
  body: {
    padding: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    gap: 4,
  },
  text: {
    fontSize: 12,
    color: '#f5f5f4',
    textAlign: 'center',
  },
  viewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontSize: 12,
    color: '#f5f5f4',
  },
  bold: {
    fontWeight: '700',
    color: '#f5f5f4',
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.6,
    color: '#e5e5e5',
    marginTop: 4,
  },
})

import { View, Text, StyleSheet } from 'react-native'
import { Motion } from '@legendapp/motion'
import { SolitoImage } from 'solito/image'
import { Eye } from 'lucide-react'

import { Post } from './types/Post'

export function PostCard({ post }: { post: Post }) {
  return (
    <Motion.Pressable onPress={()=> console.log('pressed')} style={styles.card}>
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

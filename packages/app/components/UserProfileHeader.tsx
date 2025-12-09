import { View, Text, Pressable, StyleSheet } from 'react-native'
import { MessageCircleMore, Settings } from 'lucide-react'
import { SolitoImage } from 'solito/image'

export function UserProfileHeader({
  username,
  following,
  onToggleFollow,
  avatarUrl,
}: {
  username: string
  following: boolean
  onToggleFollow: () => void
  avatarUrl?: string 
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <SolitoImage
          contentFit="cover"
          priority
          src={
            avatarUrl ||
            'https://images.pexels.com/photos/6626882/pexels-photo-6626882.jpeg'
          }
          width={90}
          height={90}
          style={styles.avatar}
          alt={`${username}'s avatar`}
        />

        <View style={styles.info}>
          <Text style={styles.username}>{username}</Text>

          <View style={styles.actions}>
            <Pressable
              onPress={onToggleFollow}
              style={[styles.followBtn, following && styles.following]}
            >
              <Text style={styles.followText}>
                {following ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <MessageCircleMore size={22} style={styles.icon} color="#f5f5f4" />
            <Settings size={22} style={styles.icon} color="#f5f5f4" />
          </View>
        </View>
      </View>

      <View>
        <View style={styles.stats}>
          <Text style={styles.statText}>
            <Text style={styles.bold}>247</Text> posts
          </Text>
          <Text style={styles.statText}>
            <Text style={styles.bold}>12.4k</Text> followers
          </Text>
          <Text style={styles.statText}>
            <Text style={styles.bold}>834</Text> following
          </Text>
        </View>

        <Text style={styles.bio}>
          Product Designer & Creative Developer Crafting digital experiences
          with code & pixels 📍 San Francisco
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  avatar: {
    aspectRatio: 1,
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    //backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f5f5f4',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  followBtn: {
    backgroundColor: '#a032d6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  following: {
    backgroundColor: '#444',
  },
  followText: {
    color: '#fff',
    fontWeight: '600',
  },
  icon: {
    marginHorizontal: 6,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 8,
  },
  statText: {
    color: '#e5e5e5',
  },
  bold: {
    fontWeight: '700',
    color: '#f5f5f4',
  },
  bio: {
    fontSize: 13,
    opacity: 0.9,
    color: '#e5e5e5',
  },
})

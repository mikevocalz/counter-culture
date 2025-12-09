import { View, StyleSheet } from 'react-native'
import { Motion } from '@legendapp/motion'

export function PostSkeleton() {
  return (
    <View style={styles.card}>
      <Motion.View
        style={styles.image}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{
          loop: true,
          duration: 0.8,
          yoyo: true,
        }}
      />
      <View style={styles.body}>
        <Motion.View style={styles.line} />
        <Motion.View style={[styles.line, { width: '60%' }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
  },
  body: {
    padding: 10,
    gap: 6,
  },
  line: {
    height: 10,
    borderRadius: 6,
    backgroundColor: '#ddd',
    width: '100%',
  },
})

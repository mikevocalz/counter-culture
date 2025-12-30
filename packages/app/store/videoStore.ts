import { create } from 'zustand'

interface VideoPosition {
  postId: string
  currentTime: number
  lastUpdated: number
}

interface VideoStore {
  positions: Record<string, VideoPosition>
  muted: boolean
  activePostId?: string
  setPosition: (postId: string, currentTime: number) => void
  getPosition: (postId: string) => number | undefined
  clearPosition: (postId: string) => void
  clearOldPositions: () => void
  setMuted: (muted: boolean) => void
  toggleMuted: () => void
  setActivePostId: (postId: string) => void
  clearActivePostId: () => void
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  positions: {},
  muted: true,
  activePostId: undefined,
  
  setPosition: (postId: string, currentTime: number) => {
    set((state) => ({
      positions: {
        ...state.positions,
        [postId]: {
          postId,
          currentTime,
          lastUpdated: Date.now(),
        },
      },
    }))
  },
  
  getPosition: (postId: string) => {
    const position = get().positions[postId]
    return position?.currentTime
  },
  
  clearPosition: (postId: string) => {
    set((state) => {
      const { [postId]: _, ...rest } = state.positions
      return { positions: rest }
    })
  },
  
  clearOldPositions: () => {
    const now = Date.now()
    const maxAge = 30 * 60 * 1000 // 30 minutes
    
    set((state) => {
      const positions = Object.entries(state.positions).reduce((acc, [key, value]) => {
        if (now - value.lastUpdated < maxAge) {
          acc[key] = value
        }
        return acc
      }, {} as Record<string, VideoPosition>)
      
      return { positions }
    })
  },

  setMuted: (muted: boolean) => {
    set({ muted })
  },

  toggleMuted: () => {
    set((state) => ({ muted: !state.muted }))
  },

  setActivePostId: (postId: string) => {
    set({ activePostId: postId })
  },

  clearActivePostId: () => {
    set({ activePostId: undefined })
  },
}))

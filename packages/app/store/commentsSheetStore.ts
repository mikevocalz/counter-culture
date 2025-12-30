import { create } from 'zustand'
import { countThreadComments, type Comment } from 'app/lib/data'

type CommentsSheetState = {
  isOpen: boolean
  postId?: string
  comments: Comment[]
  commentCount: number
  openKey: number
  openForPost: (postId: string, comments: Comment[]) => void
  close: () => void
}

export const useCommentsSheetStore = create<CommentsSheetState>((set) => ({
  isOpen: false,
  postId: undefined,
  comments: [],
  commentCount: 0,
  openKey: 0,
  openForPost: (postId, comments) =>
    set({
      isOpen: true,
      postId,
      comments,
      commentCount: countThreadComments(comments),
      openKey: Date.now(),
    }),
  close: () =>
    set({
      isOpen: false,
      postId: undefined,
      comments: [],
      commentCount: 0,
    }),
}))

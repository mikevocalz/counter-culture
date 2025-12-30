'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  CommonActions,
  NavigationContainer,
  NavigationIndependentTree,
  createNavigationContainerRef,
} from '@react-navigation/native'
import { View } from 'react-native'
import { createTrueSheetNavigator } from '@lodev09/react-native-true-sheet/navigation'
import { useCommentsSheetStore } from 'app/store'
import { CommentsSheetScreen } from './CommentsSheetScreen'
import { CommentThreadScreen } from './CommentThreadScreen'

export type CommentsSheetParamList = {
  Root: undefined
  Comments: undefined
  Thread: { commentId: string }
}

const Sheet = createTrueSheetNavigator<CommentsSheetParamList>()
const navigationRef = createNavigationContainerRef<CommentsSheetParamList>()

function SheetRootScreen() {
  return null
}

export function CommentsSheetNavigator() {
  const { isOpen, openKey, close } = useCommentsSheetStore()
  const closeRef = useRef(close)

  useEffect(() => {
    closeRef.current = close
  }, [close])

  const syncToStore = useCallback(() => {
    const nav = navigationRef.current
    if (!nav) return
    const state = nav.getRootState()
    if (state.routes.length <= 1) {
      closeRef.current()
    }
  }, [])

  useEffect(() => {
    const nav = navigationRef.current
    if (!nav) return
    const state = nav.getRootState()
    const hasSheet = state.routes.length > 1

    if (isOpen) {
      nav.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Root' }, { name: 'Comments' }],
        })
      )
      return
    }

    if (hasSheet) {
      nav.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Root' }],
        })
      )
    }
  }, [isOpen, openKey])

  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', inset: 0 }}>
      <NavigationIndependentTree>
        <NavigationContainer ref={navigationRef}>
          <Sheet.Navigator
            initialRouteName="Root"
            screenListeners={{
              sheetDidDismiss: syncToStore,
            }}
          >
            <Sheet.Screen name="Root" component={SheetRootScreen} />
            <Sheet.Screen
              name="Comments"
              component={CommentsSheetScreen}
              options={{
                detents: ['auto', 1],
                cornerRadius: 24,
                backgroundColor: '#0c0a09',
                dimmed: true,
                grabber: true,
              }}
            />
            <Sheet.Screen
              name="Thread"
              component={CommentThreadScreen}
              options={{
                detents: ['auto', 1],
                cornerRadius: 24,
                backgroundColor: '#0c0a09',
                dimmed: true,
                grabber: true,
              }}
            />
          </Sheet.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </View>
  )
}

import { ComponentProps } from 'react'
import { View, ScrollView, Platform } from 'react-native'

type Props = ComponentProps<typeof ScrollView> & {
  useWindowScrolling?: boolean
}

function ScreenScrollView({
  useWindowScrolling = true, // defaults to true
  ...props
}: Props) {
  if (Platform.OS === 'web' && useWindowScrolling) {
    return <View {...props} />
  }
  
  return <ScrollView {...props} />
}

export default ScreenScrollView

import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, View, Text } from 'react-native'
import { Container } from '../components/Container'
import { H1 } from '@expo/html-elements'

export default function NotificationsScreen() {
  return (
    <Container className="flex-1 w-full items-center ">
      <H1 className="text-2xl text-white font-bold text-center">
        Camera Screen
      </H1>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})

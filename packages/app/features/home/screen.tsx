'use client'

import { TextLink } from 'solito/link'
import { Text, View } from 'react-native'
import { H1,H2,P } from '@expo/html-elements'
import Logo from '@components/logo'
export function HomeScreen() {
  return (
    <View
    className="flex-1 items-center bg-amber-500"
    >
      <H1 className="text-3xl text-red-900 font-bold">Welcome to Solito.</H1>
      <View style={{ maxWidth: 600, gap: 16 }}>
        <Text className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Solito is made by{' '}
          <TextLink
            href="https://twitter.com/fernandotherojo"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'blue' }}
          >
            Fernando Rojo
          </TextLink>
          .
        </Text>
      </View>
      <View className="items-center my-8">
        <TextLink
          href="/users/fernando?search=hello"
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'blue',
          }}
        >
          Link
        </TextLink>
      </View>

      <Logo width={800} height={400} />
    </View>
  )
}


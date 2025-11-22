import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native'

export default function TabTwoScreen() {
  return (
    <View className='bg-yellow-600 w-full items-center min-h-full justify-center'>
       <Text style={styles.title}>Tab One Here</Text>
       
     </View>
  );
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
});

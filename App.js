import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNaigation';

export default function App() {
  // return (
  //   <View style={styles.container}>
  //     <Text>Hello world Nguyễn Hoàng dang cap cap oke chot don!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
  return <AppNavigation />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

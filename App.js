import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import AppNavigation from './navigation/appNaigation';
import {Provider} from "react-redux"
import {store} from "./redux/store"
export default function App() {
  // return (
  //   <View style={styles.container}>
  //     <Text>Hello world Nguyễn Hoàng dang cap cap oke chot don!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
  return <Provider store={store} ><ThemeProvider><AppNavigation /></ThemeProvider></Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import AppNavigation from './navigation/appNaigation';
import {Provider} from "react-redux"
import {store} from "./redux/store"
import { AppContext, socket } from './context/appContext';
import Toast from 'react-native-toast-message';
export default function App() {

  return <Provider store={store} >
             <ThemeProvider>
               {/* <AlertProvider> */}
               <AppContext.Provider value={{socket}}>
                 <AppNavigation />
               </AppContext.Provider>
               {/* </AlertProvider> */}
               {/* <Toast /> */}
             </ThemeProvider>
          </Provider>
}

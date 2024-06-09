import { ToastAndroid, Platform } from "react-native";

function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.TOP)
    } 
  }

export default notifyMessage
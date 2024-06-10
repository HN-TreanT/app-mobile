import { Alert } from "react-native";

const AsyncAlert = async (message, type) => new Promise((resolve) => {
    Alert.alert(
        type,
        message,
        [
          {
            text: "Xác nhận",
            onPress: () => {
              resolve('YES');
            },
          },
        ],
        { cancelable: false },
      );
})

export default AsyncAlert
import axios from "axios"
import { serverConfig } from "../constants/serverConfig"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Auth {
    static saveToken(token) {
       AsyncStorage.setItem('access_token', token)
    }

    static removeToken() {
        AsyncStorage.removeItem('access_token')
    }

    static async refreshToken() {
        // this.removeToken()
        const refreshToken = await AsyncStorage.getItem('refresh_token')
        try {
            const refreshRes = await axios.post(`${serverConfig.server}api/auth/refresh`, {refreshToken})
            const newToken = refreshRes?.data?.access_token
            if (!newToken) {
                return false
            }
            this.saveToken(newToken)
            return true
        } catch (e) {
            // this.removeToken()
            window.location.href = '/login'
           AsyncStorage.clear()
        }
    }
}
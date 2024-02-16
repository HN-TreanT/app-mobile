import axios from "axios"
import { serverConfig } from "../constants/serverConfig"
export default class Auth {
    static saveToken(token) {
        window.localStorage.setItem('access_token', token)
    }

    static removeToken() {
        window.localStorage.removeItem('access_token')
    }

    static async refreshToken() {
        // this.removeToken()
        const refreshToken = window.localStorage.getItem('refresh_token')
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
            window.localStorage.clear();
        }
    }
}
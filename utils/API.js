import axios from "axios"
// import queryString from "querystring"
import { serverConfig } from "../constants/serverConfig"
import Auth from "./auth"
import AsyncStorage from '@react-native-async-storage/async-storage';
async function getAuthToken () {
    // return window.localStorage.getItem("access_token") ?? ""
    // return "fhef"
    return await AsyncStorage.getItem("access_token")
}

const API = axios.create({
    baseURL: serverConfig.server,
    headers: {
        // 'content-type':'multipart/form-data'
        'content-type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Cache-Control': 'no-cache'
    },
    // paramsSerializer: params => queryString.stringify(params)
    // paramsSerializer: params => JSON.stringify(params)

})

API.interceptors.request.use(async (config) => {
    console.log("check", config)
    //hanlde tooken...
    config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${await getAuthToken()}`
    }
    return { ...config }
})

API.interceptors.response.use(async (response) => {
    if (response.status === 304) {
        // Handle 304 Not Modified as needed
        console.log("Resource not modified since last request");
        return Promise.resolve(null);
    }
    if (response && response.data) {
        return response.data
    }
    return response
},
 async (error) => {
    const status = error.response ? error.response.status : null
    const originalConfig = error.config
    console.log(status)
    console.log("check error", error)
    // Access Token was expired
    if (status === 401) {
        return  Auth.refreshToken().then(async res => {
            error.config.headers['Authorization'] = `Bearer ${await getAuthToken()}`
            return API(error.config)
        })
    }
    if (status === 408) {
        // window.localStorage.clear()
        await AsyncStorage.clear()
        window.location.href = '/login'
    }
    return Promise.reject(error)
}

)


export default API
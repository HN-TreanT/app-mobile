import axios from "axios"
import { serverConfig } from "../constants/serverConfig"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from "./auth";
var {server} = serverConfig

const _makeRequest = (instantAxios) => async (args) => {
    const _headers =  args.headers ? args.headers : {};
    const body = args.body ? args.body : {};
    const defaultHeaders = {};
    args = {
        ...args,
        headers: {
          ...defaultHeaders,
          ..._headers,
        },
        body,
      };
    
      const request = instantAxios(args)

      return request
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data ? error.response.data : error.response;
      });
  
}

const _makeAuthRequest = (instantAxios) => async (args) =>{
    const requestHeaders = args.headers ? args.headers : {};
    let token = await AsyncStorage.getItem("access_token");
    let refreshToken = await AsyncStorage.getItem("refresh_token");
    // let client_id = await AsyncStorage.getItem("client_id");

    let headers = {
        Authorization: `Bearer ${token}`,
        // ClientID: client_id,
    };

    let isRefreshing = false;
//   let failedQueue: {
//     resolve: (value: unknown) => void;
//     reject: (reason?: any) => void;
//   }[] = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  instantAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const originalRequest = err.config;

      if (err.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          // axios
          //     .post(`${serverConfig.server}/api/v1/auth/refresh`,
          //     { headers: {Authorization : `Bearer ${refreshToken}`} }
          //     )

          axios({
            method: "POST",
            url: `${serverConfig.server}/api/v1/auth/refresh`,
            headers: {
              Authorization: "Bearer " + refreshToken,
            },
          })
            .then(({ data }) => {
              if (data.status) {
                Auth.saveToken(data.data);
                axios.defaults.headers.common["Authorization"] =
                  "Bearer " + data.data;
                originalRequest.headers["Authorization"] =
                  "Bearer " + data.data;
                processQueue(null, data.data);
                resolve(axios(originalRequest));
              }
            })
            .catch((err) => {
              processQueue(err, null);
              Auth.removeToken();
              window.location.href = "/login";
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(err);
    }
  );

  
  args = {
    ...args,
    headers: {
      ...requestHeaders,
      ...headers,
    },
  };

  const request = instantAxios(args);

  return request
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
      //throw error.response.data ? error.response.data : error.response;
    });

}


const makeRequest = (options = {}) => {
    let BaseURL = server;
  
    if (options.BaseURL) BaseURL = options.BaseURL;
  
    //const baseUrlValidated = options.baseUrl || getEnv('baseAPIUrl')
    const instance = axios.create({
      // httpsAgent: new https.Agent({
      //   rejectUnauthorized: false,
      // }),
      baseURL: BaseURL,
      timeout: 1000000, //30000,
    });
  
    return {
      makeRequest: _makeRequest(instance),
      makeAuthRequest: _makeAuthRequest(instance),
    };
  };

  export default makeRequest
  
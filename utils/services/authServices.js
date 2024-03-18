import API from "../API";

import createApiService from "../createApiServices"
const api = createApiService()

const login = (data) => {
    return api.makeRequest({
        url: `/api/v1/auth/login`,
        method: "POST",
        data: data
    })
}


const register = (data) => {
    return api.makeRequest({
      url: `/api/v1/auth/register`,
      method: "POST",
      data: data
    });
  };

  const changepassword = (data) => {
    return api.makeRequest({
      url: "/api/v1/auth/change-password",
      method: "POST",
      data: data,
    });
  };
  


export default authServices = {
    login, register, changepassword
}

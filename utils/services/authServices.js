import API from "../API";


const login = async (data) => {
    const uri = "/api/v1/auth/login"
    const res = await API.post(uri, data)
    return res
}


const register = async (data) => {
    const uri = "/api/v1/auth/register"
    const res = await API.post(uri, data)
    return res
}

const changePassword = async (data) => {
    const uri = "/api/v1/auth/change-password"
    const res = await API.post(uri, data)
    return res
}


export default authServices = {
    login, register, changePassword
}

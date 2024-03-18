import createApiServices from "../createApiServices";
const api = createApiServices();


const listAll = async (data) => {
    return api.makeAuthRequest({
        url: `/api/v1/product`,
        method: "GET",
        params: params
    
      });
}

const detail = async (id) => {
    const uri = `/api/v1/product/${id}`
    const res = await API.get(uri)
    return res
}

const update = async (id,data) => {
    return api.makeAuthRequest({
        url: `/api/v1/product/${id}`,
        method: "PUT",
        data,
      });
}

const create = async (data) => {
    return api.makeAuthRequest({
        url: "/api/v1/product",
        method: "POST",
        data,
      });
}


const deleteProduct = async (id) => {
    return api.makeAuthRequest({
        url: `/api/v1/product/${id}`,
        method: "DELETE",
      });
}

// const checkValidMaterial  =  async (data) => {
//     return api.makeAuthRequest({
//         url: `/api/v1/product`,
//         method: "POST",
//         data: data
//       });
   
// }
export const productServices = {
    listAll, deleteProduct, detail, update, create, 
    // checkValidMaterial
}
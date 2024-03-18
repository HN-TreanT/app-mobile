import createApiServices from "../createApiServices";

const api = createApiServices()

const listAll = async (params) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice-detail`,
        method: "GET",
        params: params
    
      });
}

// const detail = async (id) => {
//     const uri = `/api/v1/invoice-detail/${id}`
//     const res = await API.get(uri)
//     return res
// }

const update = async (id,data) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice-detail/${id}`,
        method: "PUT",
        data,
      });
}

const create = async (data) => {
    return api.makeAuthRequest({
        url: "/api/v1/invoice-detail",
        method: "POST",
        data,
      });
}


const deleteinvoiceDetail = async (id) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice-detail/${Id}`,
        method: "DELETE",
      });
}

export const invioceDetailServices = {
    listAll, deleteinvoiceDetail, update, create
}
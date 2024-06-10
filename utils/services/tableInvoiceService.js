import createApiServices from "../createApiServices";

const api = createApiServices()

const listAll = async (params) => {
    return api.makeAuthRequest({
        url: `/api/v1/tablefood-invoice`,
        method: "GET",
        params: params
    
      });
}


const update = async (id,data) => {
    return api.makeAuthRequest({
        url: `/api/v1/tablefood-invoice/${id}`,
        method: "PUT",
        data,
      });
}

const create = async (data) => {
    return api.makeAuthRequest({
        url: "/api/v1/tablefood-invoice",
        method: "POST",
        data,
      });
}


const deleteinvoiceDetail = async (id) => {
    return api.makeAuthRequest({
        url: `/api/v1/tablefood-invoice/${id}`,
        method: "DELETE",
      });
}

export const tableInvoiceService = {
    listAll, deleteinvoiceDetail, update, create
}
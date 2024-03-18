import API from "../API";
import createApiService from "../createApiServices"
const api = createApiService()

const listAll = async (params) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice`,
        method: "GET",
        params
      });
}
const detail = async (id) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice/${id}`,
        method: "GET",
      });
}

const update = async (id,data) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice/${id}`,
        method: "PUT",
        data: data,
      });
}

const create = async (data) => {
    return api.makeAuthRequest({
        url: "/api/v1/invoice",
        method: "POST",
        data: data,
      });
}


const getInvoiceByIdTable = (id_table) => {
    return api.makeAuthRequest({
      url: `/api/v1/invoice/detail-by-id-table/${id_table}`,
      method: "GET",
     
    });
  }


const deleteInvoice = async (id) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice/${id}`,
        method: "DELETE",
      });
}


const combineInvoice = async (data) => {
    return api.makeAuthRequest({
        url: "/api/v1/invoice/combine-inovice",
        method: "POST",
        data: data,
      });
}

const splitInvoice = async (data) => {
    return api.makeAuthRequest({
        url: "/api/v1/invoice/split-order",
        method: "POST",
        data: data,
      });

}

const payments = async (id, data) => {
    return api.makeAuthRequest({
        url: `/api/v1/invoice/payment/${id}`,
        method: "POST",
        data: data,
      });
}

const completeInvoice = async (id) => {
    const uri = `/api/v1/invoice/complete-invoice/${id}`
    const res = await API.get(uri)
    return res
}



export const orderService = {
    listAll, payments, completeInvoice, 
    deleteInvoice, detail, update, combineInvoice, splitInvoice, create, getInvoiceByIdTable
}
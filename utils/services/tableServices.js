import CreateApiService from "../createApiServices";
const api = CreateApiService();



const listAll = async (params) => {
    return api.makeAuthRequest({
        url: `/api/v1/table-food`,
        method: "GET",
        params: params
      });
}

const detail = async (id) => {
    return api.makeAuthRequest({
        url: `/api/v1/table-food/${id}`,
        method: "GET",
      });
}

const update = async (id,data) => {
    return api.makeAuthRequest({
        url: `/api/v1/table-food/${id}`,
        method: "PUT",
        data: data,
      });
}

const create = async (data) => {
    return api.makeAuthRequest({
        url: "/api/v1/table-food",
        method: "POST",
        data: data,
      });
}


const deleteTable = async (id) => {
    return api.makeAuthRequest({
        url: `/api/v1/table-food/${id}`,
        method: "DELETE",
      });
}

export const tableSerivces = {
    listAll, deleteTable, detail, update, create
}
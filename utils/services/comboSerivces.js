import CreateApiService from "../createApiServices";

const api = CreateApiService();

const get = (params) => {
  return api.makeAuthRequest({
    url: `/api/v1/combo`,
    method: "GET",
    params: params
  });
};

const getById = (id) => {
  return api.makeAuthRequest({
    url: `/api/v1/combo/${id}`,
    method: "GET",
  });
};

const create = (data) => {
  return api.makeAuthRequest({
    url: "/api/v1/combo",
    method: "POST",
    data: data,
  });
};

const update = (id, data) => {
  return api.makeAuthRequest({
    url: `/api/v1/combo/${id}`,
    method: "PUT",
    data: data,
  });
};

const deleteById = (id) => {
  return api.makeAuthRequest({
    url: `/api/v1/combo/${id}`,
    method: "DELETE",
  });
};

export const comboServices = {
  get,
  getById,
  create,
  update,
  deleteById,
};

import createApiServices from "../createApiServices";
const api = createApiServices();

const getCustomer = (params) => {
  return api.makeAuthRequest({
    url: `/api/v1/customer`,
    method: "GET",
    params: params
  });
};

const createCustomer = (data) => {
    return api.makeAuthRequest({
      url: "/api/v1/customer",
      method: "POST",
      data,
    });
  };

  const deleteCustomer = (Id) => {
    return api.makeAuthRequest({
      url: `/api/v1/customer/${Id}`,
      method: "DELETE",
    });
  };
  
  const updateCustomer = (Id, data) => {
    return api.makeAuthRequest({
      url: `/api/v1/customer/${Id}`,
      method: "PUT",
      data,
    });
  };
  

export { getCustomer };
export { createCustomer };
export { deleteCustomer };
export { updateCustomer };

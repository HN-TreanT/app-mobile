import API from "../API";


const listAll = async (data) => {
    const uri = "/api/v1/invoice"
    const res = await API.post(uri, data)
    return res
}

const detail = async (data) => {
    const uri = "/api/v1/invoice"
    const res = await API.post(uri, data)
    return res
}

const update = async (data) => {
    const uri = "/api/v1/invoice"
    const res = await API.post(uri, data)
    return res
}


const deleteInvoice = async (data) => {
    const uri = "/api/v1/invoice"
    const res = await API.post(uri, data)
    return res
}


const combineInvoice = (data) => {

}

const splitInvoice =  (data) => {

}



export default orderService = {
    listAll,
    deleteInvoice, detail, update,  "" : fmdf, combineInvoice, splitInvoice
}
import axios from "axios";

export const getListProducts = async (page, search, productTypeId) => {
    try {
        let result;
        if (productTypeId) {
            result = await axios.get(`http://localhost:8080/api/product?page=${page}&searchName=${search}&productTypeId=${productTypeId}`);
            console.log(result);
        } else {
            result = await axios.get(`http://localhost:8080/api/product?page=${page}&searchName=${search}`);
            console.log(2);
            console.log(result);


        }
      return result;
    } catch (e) {
        console.log(e);
    }
}
export const editProduct = async (product) => {
    try {
        const result = await axios.put(`http://localhost:8080/api/edit`, product);
        return result.data;
    } catch (e) {
        console.log(e);
    }
}
export const getById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/${id}`);
        console.log(result.data)
        return result.data;
    } catch (e) {
        console.log(e);
    }
}
export const deleteProduct = async (id) => {
    try {
        const result = await axios.delete(`http://localhost:8080/api/delete/${id}`);
        return result.data
    } catch (e) {
        console.log(e);
    }
}
export const addProduct = async (product) => {
    try {
        const result = await axios.post(`http://localhost:8080/api/create`, product);
        return result.data;
    } catch (e) {
        console.log(e);
    }
}
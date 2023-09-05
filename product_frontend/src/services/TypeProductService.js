import axios from "axios";

export const getListTypeProduct = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/type/list`);
        return result.data;
    }catch (e){
        console.log(e)
    }
}
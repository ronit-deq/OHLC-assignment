import axios from "axios"
import { BASE_URL } from "./constants"

export const apiCall = async(endpoint:string,method:string,params?:object) => {
    //body for post
    const response = await axios({
        baseURL: `${BASE_URL}${endpoint}`,
        method,
        params
    })
    if (response.status === 200) {
        return {data:response.data,error:false}
    }
    return {data:null,error:true}
}
